import { createGetter } from "./server";

export const getProducts = createGetter("products", (products) => {
  return products.map((product) => {
    return {
      ...product,
      name: "Product Name",
    };
  });
});