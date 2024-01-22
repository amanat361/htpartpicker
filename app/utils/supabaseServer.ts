"use server";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type Product = Database["public"]["Tables"]["products"]["Row"];

async function getTags() {
  const { data: tags, error } = await supabase.from("tags").select("*");
  if (error) return [];
  return tags;
}

async function addTag(name: string) {
  const { data: tags, error } = await supabase.from("tags").insert({ name });
  if (error) return [];
  return tags;
}

async function addProduct(
  prevState: { message: string; hasError: boolean },
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());
  const product = {
    name: rawFormData.product_name,
    brand: rawFormData.product_brand,
    image_url: rawFormData.image_url,
    category: "Testing",
  } as Product;
  for (const key in product) {
    if (!product[key as keyof Product]) {
      return {
        message: `Product must contain a ${key}`,
        hasError: true,
      };
    }
  }
  const { data: products, error } = await supabase.from("products").insert(product);
  if (error) return { message: `Error adding product. Supabase says: ${error.message}`, hasError: true };
  revalidatePath("/");
  return { message: "Product added successfully", hasError: false };
}

export { getTags, addTag, addProduct };
