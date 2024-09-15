"use server";

import { decodeHash } from "@/utils/hash";
import { supabase } from "@/database/server";

export async function getProductsFromHash(hash: string) {
  const productIds = decodeHash(hash);
  const { data: products, error } = await supabase
    .from("crutchfield")
    .select("*")
    .in("id", productIds)
    .order("id");

  if (!products || error) {
    return [];
  }

  return products;
}