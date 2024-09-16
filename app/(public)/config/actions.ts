"use server";

import { decodeHash } from "@/utils/hash";
import { supabase } from "@/database/server";
import { Tables } from "@/database.types";

export async function getProductsFromHash(hash: string): Promise<Tables<"crutchfield">[] | null> {
  try {
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
  } catch (error) {
    return null;
  }
}
