import { createGetter, createSetter } from "./server";

export const getProducts = createGetter("products", {
  order: { by: "created_at", ascending: false },
});
const getSources = createGetter("sources", {
  order: { by: "id", ascending: true },
});
const getCategories = createGetter("categories");
export const getTags = createGetter("tags");
export const getProductTags = createGetter("product_tags");
export const getProductSources = createGetter("product_sources");
export const insertProducts = createSetter("products");
export const insertTags = createSetter("tags");
export const insertProductTags = createSetter("product_tags");
export const insertProductSources = createSetter("product_sources");