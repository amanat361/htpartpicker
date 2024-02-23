import { createDeleter, createGetter, createSetter } from "./server";
import {
  Product,
  Tag,
  ProductTag,
  ProductWithTagsAndSources,
  Result,
} from "./types";

export const getProducts = createGetter("products", {
  order: { by: "created_at", ascending: false },
});

export const getSources = createGetter("sources", {
  order: { by: "id", ascending: true },
});

async function getTagsForProduct(product: Product) {
  const { data: tags, result } = await getProductTags();
  if (result.hasError) return [];
  return tags.filter((tag) => tag.product_id === product.id);
}

async function getSourcesForProduct(product: Product) {
  const { data: sources, result } = await getProductSources();
  if (result.hasError) return [];
  return sources.filter((source) => source.product_id === product.id);
}

async function getTagsFromProductTags(
  product_tags: ProductTag[]
): Promise<Tag[]> {
  const { data: tags, result } = await getTags();
  if (result.hasError) return [];
  return tags.filter((tag) => product_tags.some((pt) => pt.tag_id === tag.id));
}

export async function getProductsWithTagsAndSources() {
  const { data: products, result } = (await getProducts()) as {
    data: ProductWithTagsAndSources[];
    result: Result;
  };
  if (result.hasError) return [];
  const productsWithTagsAndSources = await Promise.all(
    products.map(async (product) => {
      const tags = await getTagsForProduct(product);
      product.tags = await getTagsFromProductTags(tags);
      product.sources = await getSourcesForProduct(product);
      return product;
    })
  );
  return productsWithTagsAndSources;
}

export const getCategories = createGetter("categories");
export const getTags = createGetter("tags");
export const getProductTags = createGetter("product_tags");
export const getProductSources = createGetter("product_sources");
export const insertProducts = createSetter("products");
export const insertTags = createSetter("tags");
export const insertProductTags = createSetter("product_tags");
export const insertProductSources = createSetter("product_sources");
export const deleteProduct = createDeleter("products");
