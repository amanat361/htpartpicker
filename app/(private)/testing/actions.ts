"use server";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const ProductSchema = z.object({
  product_name: z.string().min(1),
  image_url: z.string().url(),
  product_brand: z.string().min(1),
});

export async function addProduct(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const validation = ProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validation.success)
    return { ...validation, error: fromZodError(validation.error).toString() };
  return { ...validation };
}
