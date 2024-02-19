"use server";

import { revalidatePath } from "next/cache";

import { Tables, TablesInsert } from "@/database.types";

import {
  validateImageURL,
  convertFormDataToProduct,
  getCheckedFieldsFromForm,
  validateObject,
  verifyAdminCode,
} from "./helpers";

import {
  ProductTag,
  ProductWithTagsAndSources,
  Product,
  Tag,
  Result,
  ScrapedProduct,
} from "./types";

import {
  getTags,
  getProductTags,
  getProductSources,
  getProducts,
  insertTags,
  insertProductSources,
  insertProducts,
  insertProductTags,
} from "./methods";

export async function getTagsByCategory(
  category: Tables<"categories">["name"]
) {
  const { data: tags, result } = await getTags();
  if (result.hasError) return [];
  return tags.filter((tag) => tag.category === category);
}

export async function getTagsForProduct(product: Product) {
  const { data: tags, result } = await getProductTags();
  if (result.hasError) return [];
  return tags.filter((tag) => tag.product_id === product.id);
}

export async function getSourcesForProduct(product: Product) {
  const { data: sources, result } = await getProductSources();
  if (result.hasError) return [];
  return sources.filter((source) => source.product_id === product.id);
}

export async function getTagsFromProductTags(
  product_tags: ProductTag[]
): Promise<Tag[]> {
  const { data: tags, result } = await getTags();
  if (result.hasError) return [];
  return tags.filter((tag) => product_tags.some((pt) => pt.tag_id === tag.id));
}

export async function getProductsWithTagsAndSources() {
  const { data: products, result } = (await getProducts()) as {
    data: ProductWithTagsAndSources[];
    result: Result;
  };
  if (result.hasError) return [];
  const productsWithTagsAndSources = await Promise.all(
    products.map(async (product) => {
      const tags = await getTagsForProduct(product);
      product.tags = await getTagsFromProductTags(tags);
      product.sources = await getSourcesForProduct(product);
      return product;
    })
  );
  return productsWithTagsAndSources;
}

export async function insertTagWithValidation(tag: TablesInsert<"tags">) {
  const { data: tags, result } = await getTags();
  if (result.hasError) return [];
  if (tags.some((t) => t.name === tag.name)) return [];
  if (tags.some((t) => t.category === tag.category)) return [];
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
  const productValidationResult = validateObject(product);
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
  console.log("Bulk product insert started...");
  console.log(products);
  return false;
}
