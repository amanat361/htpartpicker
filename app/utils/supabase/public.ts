"use server";

import { createClient } from "@supabase/supabase-js";
import { Database, Tables, TablesInsert } from "@/database.types";
import { revalidatePath } from "next/cache";
import type { Product as ScrapedProduct } from "@/app/api/scrape/route";
import { createGetter, createSetter } from "./server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type ProductSource = Tables<"product_sources">;
type Product = Tables<"products">;
type Source = Tables<"sources">;
type Category = Tables<"categories">;
type Tag = Tables<"tags">;
type DetailedProduct = Product & { tags: string[] } & {
  sources: ProductSource[];
};

const getProducts = createGetter("products", {
  order: { by: "created_at", ascending: false },
});

const getSources = createGetter("sources", {
  order: { by: "id", ascending: true },
});

const getCategories = createGetter("categories");
const insertTags = createSetter("tags");
export const insertProductSources = createSetter("product_sources");
const insertProducts = createSetter("products");
const insertProductTags = createSetter("product_tags");

async function getTags(category: Tables<"categories">["name"]) {
  const { data: tags, result } = await createGetter("tags", {
    eq: { key: "category", value: category },
  })();
  if (result.hasError) return [];
  return tags;
}

async function getProductTags(product_id: string) {
  const { data: tags, result } = await createGetter("product_tags", {
    eq: { key: "product_id", value: product_id },
  })();
  if (result.hasError) return [];
  return tags;
}

async function getProductSources(product_id: string) {
  const { data: sources, result } = await createGetter("product_sources", {
    eq: { key: "product_id", value: product_id },
  })();
  if (result.hasError) return [];
  return sources;
}

async function addTag(tag: TablesInsert<"tags">) {
  const { data: tags, result } = await createGetter("tags")();
  if (result.hasError) return [];
  if (tags.some((t) => t.name === tag.name)) return [];
  if (tags.some((t) => t.category === tag.category)) return [];
  const { data: newTags, result: newResult } = await insertTags([tag]);
  if (newResult.hasError) return [];
  revalidatePath("/");
  return newTags;
}

async function addProduct(
  prevState: { message: string; hasError: boolean },
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());

  if (rawFormData.admin_code !== process.env.ADMIN_CODE)
    return { message: "Invalid admin code", hasError: true };

  const product = {
    name: rawFormData.product_name,
    brand: rawFormData.product_brand,
    category: rawFormData.product_category,
    image_url: rawFormData.image_url,
  } as Product;

  const tags = Object.keys(rawFormData).filter(
    (key) => rawFormData[key] === "on"
  );

  if (!validateImageURL(product.image_url as string)) {
    return {
      message: "Invalid image URL",
      hasError: true,
    };
  }

  const { data: insertedProducts, result: insertResult } = await insertProducts(
    [product]
  );
  if (insertResult.hasError) return insertResult;

  const { data: products, result: result } = await getProducts();
  if (result.hasError) return result;
  const product_id = products.find((p) => p.name === product.name)?.id;
  if (!product_id)
    return {
      message: "Product was added but could not be found",
      hasError: true,
    };

  const { data: insertedProductTags, result: productTagResult } =
    await insertProductTags(tags.map((tag) => ({ product_id, tag_id: tag })));
  if (productTagResult.hasError) return productTagResult;

  revalidatePath("/");
  return { message: "Product added successfully", hasError: false };
}

async function getTagName(tag_id: string) {
  const { data: tags, result } = await createGetter("tags", {
    eq: { key: "id", value: tag_id },
  })();
  if (result.hasError) return "";
  return tags[0].name;
}

function validateImageURL(url: string) {
  return url.match(/^(https:\/\/).*(jpeg|jpg|gif|png)$/) != null;
}