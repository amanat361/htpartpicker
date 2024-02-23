import { Database, Tables, TablesInsert } from "@/database.types";

export type Result = { message: string; hasError: boolean };

export type Table = keyof Database["public"]["Tables"];
export type ProductTag = Tables<"product_tags">;
export type ProductSource =Tables<"product_sources">;
export type Product = Tables<"products">;
export type Source = Tables<"sources">;
export type Category = Tables<"categories">;
export type Tag = Tables<"tags">;

export type ProductWithTagsAndSources = Product & {
  tags: Tag[];
  sources: ProductSource[];
};

export type ScrapedProduct = TablesInsert<"products"> & {
  highlights: string[],
  url: string,
  description: string,
  price: string,
};