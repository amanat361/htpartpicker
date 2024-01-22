"use client";

import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@components/fieldset";
import { Input } from "@components/input";
import { Text } from "@components/text";
import { Listbox, ListboxLabel, ListboxOption } from "@components/listbox";
import { Checkbox, CheckboxField, CheckboxGroup } from "@components/checkbox";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct } from "@utils/supabaseServer";
4;
import { Button } from "@components/button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Add Product
    </Button>
  );
}

const initialState = {
  message: "",
  hasError: false,
};

export default function AddPage() {
  const [state, formAction] = useFormState(addProduct, initialState);

  return (
    <div className="max-w-6xl w-full space-y-12">
      <form action={formAction}>
        <Fieldset>
          <Legend>Product Details</Legend>
          <Text>
            This form enters a product directly into the database. Please be
            careful.
          </Text>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
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
              <Field>
                <Label>Brand</Label>
                <Description>Who manufactures this product?</Description>
                <Input name="product_brand" placeholder="KEF&hellip;" />
              </Field>
              <Field>
                <Label>Category</Label>
                <Description>What best describes this product?</Description>
                <Listbox
                  name="product_category"
                  placeholder="Select category&hellip;"
                >
                  <ListboxOption value="displays">
                    <ListboxLabel>Displays</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="recievers">
                    <ListboxLabel>Recievers</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="speakers">
                    <ListboxLabel>Speakers</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="accessories">
                    <ListboxLabel>Accessories</ListboxLabel>
                  </ListboxOption>
                </Listbox>
              </Field>
              <Field>
                <Label>Image URL</Label>
                <Description>Link to an image of this product.</Description>
                <Input
                  name="image_url"
                  placeholder="https://example.com/image.jpg&hellip;"
                />
              </Field>
            </div>
          </FieldGroup>
          {/* <Legend className="mt-8">Product Specs</Legend>
          <Text>Select all tags that apply to this product.</Text> */}
          {/* <CheckboxGroup className="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <CheckboxField>
              <Checkbox name="4k" />
              <Label>4K Ready</Label>
              <Description>
                This product is capable of displaying 4k content.
              </Description>
            </CheckboxField>
            <CheckboxField>
              <Checkbox name="Dolby Vision" />
              <Label>Dolby Vision</Label>
              <Description>
                This product is capable of displaying Dolby Vision content.
              </Description>
            </CheckboxField>
            <CheckboxField>
              <Checkbox name="HDR10" />
              <Label>HDR10</Label>
              <Description>
                This product is capable of displaying HDR10 content.
              </Description>
            </CheckboxField>
            <CheckboxField>
              <Checkbox name="HDR10+" />
              <Label>HDR10+</Label>
              <Description>
                This product is capable of displaying HDR10+ content.
              </Description>
            </CheckboxField>
            <CheckboxField>
              <Checkbox name="Dolby Atmos" />
              <Label>Dolby Atmos</Label>
              <Description>
                This product is capable of playing Dolby Atmos content.
              </Description>
            </CheckboxField>
            <CheckboxField>
              <Checkbox name="DTS:X" />
              <Label>DTS:X</Label>
              <Description>
                This product is capable of playing DTS:X content.
              </Description>
            </CheckboxField>
          </CheckboxGroup> */}
          <div className="mt-8">
            <SubmitButton />
            {state.message && (
              <div className="mt-4">
                <p
                  className={`font-normal ${state.hasError ? "text-red-600" : "text-green-600"}`}
                >
                  {state.message}
                </p>
              </div>
            )}
          </div>
        </Fieldset>
      </form>
    </div>
  );
}
