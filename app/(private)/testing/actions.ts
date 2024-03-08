"use server"

import { z } from "zod";
import { parseForm } from "react-zorm"

const TagSchema = z.object({
  tag_name: z.string(),
});

export async function insertTag(formData: FormData) {
  const data = parseForm(TagSchema, formData);
}