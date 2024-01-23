"use server";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type Product = Database["public"]["Tables"]["products"]["Row"];
type Source = Database["public"]["Tables"]["sources"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Tag = Database["public"]["Tables"]["tags"]["Row"];

async function getSources() {
  const { data: sources, error } = await supabase.from("sources").select("*");
  if (error) return [];
  return sources;
}

async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  if (error) return [];
  return categories;
}

async function getTags(category: string) {
  const { data: tags, error } = await supabase
    .from("tags")
    .select("*")
    .eq("category", category);
  if (error) return [];
  return tags;
}

async function addTag(name: string, category: string) {
  const { data: existingTags, error: existingTagsError } = await supabase
    .from("tags")
    .select("*")
    .eq("name", name)
    .eq("category", category);
  if (existingTagsError) return [];
  if (existingTags?.length) return [];
  const { data: tags, error } = await supabase
    .from("tags")
    .insert({ name, category });
  if (error) return [];
  revalidatePath("/");
  return tags;
}

async function addProduct(
  prevState: { message: string; hasError: boolean },
  formData: FormData
) {
  // first we get the product data from the form
  const rawFormData = Object.fromEntries(formData.entries());

  // validate the admin code
  if (rawFormData.admin_code !== process.env.ADMIN_CODE)
    return { message: "Invalid admin code", hasError: true };

  // create the product object
  const product = {
    name: rawFormData.product_name,
    brand: rawFormData.product_brand,
    category: rawFormData.product_category,
    image_url: rawFormData.image_url,
  } as Product;

  // if any of the product fields are empty, return an error
  for (const key in product) {
    if (!product[key as keyof Product]) {
      return {
        message: `Product must contain a ${key}`,
        hasError: true,
      };
    }
  }

  // validate the image URL
  if (!validateImageURL(product.image_url as string)) {
    return {
      message: "Invalid image URL",
      hasError: true,
    };
  }

  // insert the product into the products table
  const { error } = await supabase.from("products").insert(product);

  // if there was an error with supabase, return an error
  if (error)
    return {
      message: `Error adding product. Supabase says: ${error.message}`,
      hasError: true,
    };

  // try to get the product from the products table that we just inserted
  const { data: products, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("name", product.name as string);

  // if there was an error with supabase, return an error
  if (productError) {
    return {
      message: `Error adding product. Supabase says: ${productError.message}`,
      hasError: true,
    };
  }

  // get the id of the product we just inserted that supabase returned
  const product_id = products?.[0].id;

  // get all of the checked tags from the form
  const tags = Object.keys(rawFormData).filter(
    (key) => rawFormData[key] === "on"
  );

  // add the pairs of product_id and tag_id to the product_tags table
  const { error: tagError } = await supabase
    .from("product_tags")
    .insert(tags.map((tag) => ({ product_id, tag_id: tag })));

  // if there was an error with supabase, return an error
  if (tagError) {
    return {
      message: `Error adding tags. Supabase says: ${tagError.message}`,
      hasError: true,
    };
  }

  // revalidate the page so that the new product shows up
  revalidatePath("/");
  return { message: "Product added successfully", hasError: false };
}

function validateImageURL(url: string) {
  return url.match(/^(https:\/\/).*(jpeg|jpg|gif|png)$/) != null;
}

export type { Product, Source, Category, Tag };
export { getTags, getCategories, getSources, addTag, addProduct };
