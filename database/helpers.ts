import { Product } from "./types";

export function parseFormData(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export function verifyAdminCode(formData: FormData) {
  const rawFormData = parseFormData(formData);
  const admin_code = rawFormData.admin_code as string;
  if (admin_code !== process.env.ADMIN_CODE)
    return {
      message: "Invalid admin code",
      hasError: true,
    } as const;
  return {
    message: "Admin code verified",
    hasError: false,
  } as const;
}

export function validateObject(obj: Record<string, string | number>) {
  for (const key in obj) {
    if (!obj[key])
      return {
        message: `Invalid ${key}`,
        hasError: true,
      };
  }
  return {
    message: "Valid object",
    hasError: false,
  };
}

export function convertFormDataToProduct(formData: FormData) {
  const rawFormData = parseFormData(formData);
  const newProduct = {
    name: rawFormData.product_name,
    brand: rawFormData.product_brand,
    category: rawFormData.product_category,
    image_url: rawFormData.image_url,
  } as Product;
  return newProduct;
}

export function validateImageURL(url: string) {
  const valid = url.match(/^(https:\/\/).*(jpeg|jpg|gif|png)$/) != null;
  if (!valid)
    return {
      message: "Invalid image URL",
      hasError: true,
    } as const;
  return {
    message: "Valid image URL",
    hasError: false,
  } as const;
}

export function getCheckedFieldsFromForm(formData: FormData) {
  const rawFormData = parseFormData(formData);
  return Object.keys(rawFormData).filter((key) => rawFormData[key] === "on");
}
