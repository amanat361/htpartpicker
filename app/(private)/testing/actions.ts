"use server";

import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

const ProductSchema = z.object({
  product_name: z.string().min(1),
  image_url: z.string().url(),
  product_brand: z.string().min(1),
});

type Product = z.infer<typeof ProductSchema>;

export async function addProduct(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // try {
  //   const data = ProductSchema.parse(Object.fromEntries(formData.entries()));
  //   return data;
  // } catch (error) {
  //   return fromZodError(error as ZodError);
  // }

  // same thing as above but return a promise that resolves with the data or rejects with the error
  return new Promise(
    (
      resolve: (data: Product) => void,
      reject: (reason: string) => void
    ) => {
      const data = ProductSchema.safeParse(
        Object.fromEntries(formData.entries())
      );
      if (!data.success)
        reject(fromZodError(data.error).toString() + " (from promise)");
      if (data.success) resolve(data.data);
    }
  );
}
