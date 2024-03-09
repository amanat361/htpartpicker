"use client";

import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from "@/components/primitives/fieldset";
import { Input } from "@/components/primitives/input";
import { Button } from "@/components/primitives/button";
import { addProduct } from "./actions";
import { toast } from "sonner";
import { useClientPromise } from "@/hooks/useClientPromise";

export default function TagForm({ category }: { category: string }) {
  const handleAddProduct = useClientPromise(addProduct);

  async function handleSubmit(formData: FormData) {
    toast.promise(handleAddProduct(formData), {
      loading: "Adding product...",
      success: (data) => `${data.product_name} added successfully!`,
      error: (error: string) => error,
    });
  }

  return (
    <form action={handleSubmit}>
      <Fieldset>
        <FieldGroup className="grid grid-cols-3 gap-4 items-end">
          {/* name field */}
          <Field>
            <Label>Name</Label>
            <Description>
              Official name for this product without branding.
            </Description>
            <Input
              name="product_name"
              placeholder="Q350 Bookshelf Speakers&hellip;"
            />
          </Field>
          {/* image field */}
          <Field>
            <Label>Image URL</Label>
            <Description>Link to an image of this product.</Description>
            <Input
              name="image_url"
              placeholder="https://example.com/image.jpg&hellip;"
            />
          </Field>
          {/* brand field */}
          <Field>
            <Label>Brand</Label>
            <Description>Who manufactures this product?</Description>
            <Input
              name="product_brand"
              placeholder="KEF&hellip;"
            />
          </Field>
          <Button type="submit">Add Product</Button>
        </FieldGroup>
      </Fieldset>
    </form>
  );
}
