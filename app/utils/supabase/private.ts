import { createGetter, createSetter } from "./server";

export const getProducts = createGetter("products", {
  order: { by: "created_at", ascending: false },
});

export const getSources = createGetter("sources", {
  order: { by: "id", ascending: true },
});

export const getProductSources = createGetter("product_sources");
export const getProductTags = createGetter("product_tags");
export const getCategories = createGetter("categories");
export const getTags = createGetter("tags");

const addTag = createSetter("tags");
const addProduct = createSetter("products");
const addProductSource = createSetter("product_sources");