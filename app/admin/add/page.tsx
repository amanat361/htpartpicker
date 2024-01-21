import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@components/fieldset";
import { Input } from "@components/input";
import { Select } from "@components/select";
import { Text } from "@components/text";
import { Textarea } from "@components/textarea";
import { Listbox, ListboxLabel, ListboxOption } from "@components/listbox";
import { Checkbox, CheckboxField, CheckboxGroup } from "@components/checkbox";

export default function AddPage() {
  return (
    <div className="max-w-6xl w-full space-y-12">
      <form action="/orders" method="POST">
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
          <Legend className="mt-8">Product Specs</Legend>
          <Text>Select all tags that apply to this product.</Text>
          <CheckboxGroup className="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
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
          </CheckboxGroup>
        </Fieldset>
      </form>
    </div>
  );
}
