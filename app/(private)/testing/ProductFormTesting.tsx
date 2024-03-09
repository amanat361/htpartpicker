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
import { ValidationError } from "zod-validation-error";

export default function TagForm({ category }: { category: string }) {
  async function handleSubmit(formData: FormData) {
    // toast.promise(addProduct(formData), {
    //   loading: "Adding product...",
    //   success: (data) => `${data.product_name} added successfully!`,
    //   error: (error: ValidationError) => error.message,
    // });

    // same as above but pass a new promise to toast.promise that resolves with the data or rejects with the error based on if the success property is true or false
    // toast.promise(
    //   new Promise((resolve, reject) => {
    //     addProduct(formData)
    //       .then((data) => {
    //         if (data.success) resolve(data.data);
    //         if (!data.success) reject(data.error);
    //       })
    //       .catch((error) => reject(error));
    //   }),
    //   {
    //     loading: "Adding product...",
    //     success: (data) => `${data.product_name} added successfully!`,
    //     error: (error: ValidationError) => error.message,
    //   }
    // );
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
