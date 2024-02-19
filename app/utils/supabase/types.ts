import { Database } from "@/database.types";

export type Table = keyof Database["public"]["Tables"];
export type ProductSource = Database["public"]["Tables"]["product_sources"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Source = Database["public"]["Tables"]["sources"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type DetailedProduct = Product & { tags: string[] } & {
  sources: ProductSource[];
};
