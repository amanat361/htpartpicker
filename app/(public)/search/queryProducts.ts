"use server";

import { supabase } from "@/database/server";
import type { QueryParams } from "./types";

export async function queryProducts(params: QueryParams) {
  let query = supabase.from("crutchfield").select("*");

  if (params.category) {
    query = query.ilike("category", `%${params.category}%`);
  }
  if (params.minPrice) query = query.gte("price", params.minPrice);
  if (params.maxPrice) query = query.lte("price", params.maxPrice);
  if (params.minRating) query = query.gte("average_rating", params.minRating);
  if (params.maxRating) query = query.lte("average_rating", params.maxRating);
  if (params.minNumberOfReviews)
    query = query.gte("rating_count", params.minNumberOfReviews);
  if (params.maxNumberOfReviews)
    query = query.lte("rating_count", params.maxNumberOfReviews);
  if (params.brand) {
    query = query.ilike("brand", `%${params.brand}%`);
  }

  const { data, error } = await query.limit(params.limit || 10);

  if (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }

  return data;
}
