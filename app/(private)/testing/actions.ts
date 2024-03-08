"use server";

import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

const ProductSchema = z.object({
  product_name: z.string().min(1),
  image_url: z.string().url(),
  product_brand: z.string().min(1),
});

export async function addProduct(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const data = ProductSchema.parse(Object.fromEntries(formData.entries()));
    return data;
  } catch (error) {
    throw fromZodError(error as ZodError);
  }
}