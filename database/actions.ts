"use server";

import { revalidatePath } from "next/cache";

import { TablesInsert } from "@/database.types";

import {
  validateImageURL,
  convertFormDataToProduct,
  getCheckedFieldsFromForm,
  validateObject,
  verifyAdminCode,
} from "./helpers";

import { Product, Result, ScrapedProduct, ProductSource, Category, Table } from "./types";

import {
  getTags,
  insertTags,
  insertProductSources,
  insertProducts,
  insertProductTags,
  deleteProduct,
  getProducts,
} from "./methods";
import { ConsoleMessage } from "puppeteer-core";

export async function insertTagWithValidation(tag: TablesInsert<"tags">) {
  const { data: tags, result } = await getTags();
  if (result.hasError) return [];
  if (tags.some((t) => t.name === tag.name && t.category === tag.category))
    return [];
  const { data: newTags, result: newResult } = await insertTags([tag]);
  if (newResult.hasError) return [];
  revalidatePath("/");
  return newTags;
}

export async function insertSourceForProduct(
  productSource: TablesInsert<"product_sources">
) {
  const validProductSource = validateObject(productSource);
  if (validProductSource.hasError) return validProductSource;
  const { data, result } = await insertProductSources([productSource]);
  if (result.hasError) return result;
  revalidatePath("/");
  return {
    message: "Product source added successfully",
    hasError: false,
  };
}

export async function insertProductFromForm(
  prevState: Result,
  formData: FormData
): Promise<Result> {
  const adminCodeResult = verifyAdminCode(formData);
  if (adminCodeResult.hasError) return adminCodeResult;

  const product = convertFormDataToProduct(formData);
  const productValidationResult = validateObject(product as Record<string, string>);
  if (productValidationResult.hasError) return productValidationResult;

  const imageURLResult = validateImageURL(product.image_url);
  if (imageURLResult.hasError) return imageURLResult;

  const { data: addedProduct, result } = await insertProducts([product]);
  if (result.hasError) return result;

  const product_id = addedProduct[0].id;

  const tags = getCheckedFieldsFromForm(formData);

  const { data: addedTags, result: tagResult } = await insertProductTags(
    tags.map((tag) => ({ product_id, tag_id: tag }))
  );
  if (tagResult.hasError) return tagResult;

  revalidatePath("/");
  return { message: "Product added successfully", hasError: false };
}

export async function insertScrapedProducts(products: ScrapedProduct[]) {
  console.clear();
  const productsToInsert = products.map(
    (product) =>
      ({
        name: product.name,
        brand: product.brand,
        image_url: product.image_url,
        category: "Testing",
        description: product.description,
      } as Product)
  );

  const { result } = await insertProducts(productsToInsert);
  if (result.hasError) return result;

  const {data: addedProducts, result: productResult } = await getProducts();
  if (productResult.hasError) return productResult;

  const productSources = addedProducts.map((product, i) => ({
    product_id: product.id,
    source_id: 2, // crutchfield
    url: products[i].url,
    price: parseInt(products[i].price.slice(1)),
  } as ProductSource));

  const { data, result: sourceResult } = await insertProductSources(productSources);
  if (sourceResult.hasError) return sourceResult;

  console.log("Bulk product insert finished.");
  return {
    message: "Products added successfully",
    hasError: false,
  } as Result;
}

export async function deleteProductAndRevalidate(product_id: string) {
  const result = await deleteProduct(product_id);
  if (result.hasError) return result;
  revalidatePath("/");
  return result;
}
