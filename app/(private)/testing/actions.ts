"use server"

import { z } from "zod";

const TagSchema = z.object({
  tag_name: z.string(),
});

export async function insertTag(formData: FormData) {
  const result = TagSchema.parse(Object.fromEntries(formData));
}