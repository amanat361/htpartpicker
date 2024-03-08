"use client";

import { Field, Label } from "@/components/primitives/fieldset";
import { Input } from "@/components/primitives/input";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { insertTag } from "./actions";

export default function TagForm({ category }: { category: string }) {
  return (
    <form action={insertTag}>
      <Field>
        <Label>Name</Label>
        <Input name="tag_name" placeholder="Dolby Vision&hellip;" autoFocus />
      </Field>
      <Text className="mt-4">
        You are currently adding a tag to the{" "}
        <Badge color="red">{category}</Badge> category.
      </Text>
      <Button type="submit">Add Tag</Button>
    </form>
  );
}
