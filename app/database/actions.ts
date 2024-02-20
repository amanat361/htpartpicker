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

import {
  Result,
  ScrapedProduct,
} from "./types";

import {
  getTags,
  insertTags,
  insertProductSources,
  insertProducts,
  insertProductTags,
  deleteProduct,
} from "./methods";

export async function insertTagWithValidation(tag: TablesInsert<"tags">) {
  const { data: tags, result } = await getTags();
  if (result.hasError) return [];
  if (tags.some((t) => t.name === tag.name && t.category === tag.category)) return [];
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

export async function deleteProductAndRevalidate(product_id: string) {
  const result = await deleteProduct(product_id);
  if (result.hasError) return result;
  revalidatePath("/");
  return result;
}