"use client";

import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@components/fieldset";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@components/dialog";
import { Input } from "@components/input";
import { Text } from "@components/text";
import { Badge } from "@components/badge";
import {
  Listbox,
  ListboxDescription,
  ListboxLabel,
  ListboxOption,
} from "@components/listbox";
import { Checkbox, CheckboxField, CheckboxGroup } from "@components/checkbox";
import { useFormState, useFormStatus } from "react-dom";
import { getTags, addTag, addProduct } from "@utils/supabaseServer";
4;
import { Button } from "@components/button";
import { useEffect, useState } from "react";

import type { Tag, Source, Category } from "@utils/supabaseServer";

function CreateTagButton({
  category,
  setAddedTag,
}: {
  category: string;
  setAddedTag: React.Dispatch<React.SetStateAction<Tag | null>>;
}) {
  const { pending } = useFormStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        disabled={pending}
        outline
      >
        Create Tag
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add a tag</DialogTitle>
        <DialogDescription>
          Please enter a tag that does not already exist in the database. Once
          you create a tag, you still need to select it from the list.
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>Name</Label>
            <Input
              name="tag_name"
              placeholder="Dolby Vision&hellip;"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              autoFocus
            />
          </Field>
          <Text className="mt-4">
            You are currently adding a tag to the{" "}
            <Badge color="red">{category}</Badge> category.
          </Text>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              addTag(tagName, category);
              setAddedTag({ id: "new", category: category, name: tagName });
              setTagName("");
              setIsOpen(false);
            }}
          >
            Create Tag
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function clearForm() {
  const form = document.querySelector("form");
  if (form) {
    form.reset();
  }
  const adminCode = document.querySelector("#admin_code") as HTMLInputElement;
  if (adminCode) {
    adminCode.focus();
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button color="blue" type="submit" disabled={pending}>
      Add Product
    </Button>
  );
}

const initialState = {
  message: "",
  hasError: false,
};

export default function ProductForm({
  sources,
  categories,
}: {
  sources: Source[];
  categories: Category[];
}) {
  const [state, formAction] = useFormState(addProduct, initialState);
  const [category, setCategory] = useState(categories[0].name);
  const [source, setSource] = useState(sources[0].name);
  const [tags, setTags] = useState<Tag[]>([]);
  const [addedTag, setAddedTag] = useState<Tag | null>(null);

  useEffect(() => {
    async function loadTags() {
      const tags = await getTags(category);
      setTags(tags);
    }
    loadTags();
  }, [addedTag, category]);

  return (
    <form action={formAction} autoComplete="off">
      <Fieldset>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-6 sm:gap-4">
            <Field className="col-span-2">
              <Label>Name</Label>
              <Description>
                Official name for this product without branding.
              </Description>
              <Input
                name="product_name"
                placeholder="Q350 Bookshelf Speakers&hellip;"
              />
            </Field>
            <Field className="col-span-2">
              <Label>Brand</Label>
              <Description>Who manufactures this product?</Description>
              <Input name="product_brand" placeholder="KEF&hellip;" />
            </Field>
            <Field className="col-span-2">
              <Label>Price</Label>
              <Description>How much does this product cost?</Description>
              <Input
                name="product_price"
                type="number"
                placeholder="1000&hellip;"
              />
            </Field>
            <Field className="col-span-3">
              <Label>Category</Label>
              <Description>What best describes this product?</Description>
              <Listbox
                name="product_category"
                value={category}
                onChange={setCategory}
                placeholder="Select category&hellip;"
              >
                {categories.map((category) => (
                  <ListboxOption value={category.name} key={category.name}>
                    <ListboxLabel>{category.name}</ListboxLabel>
                    <ListboxDescription>
                      {category.description}
                    </ListboxDescription>
                  </ListboxOption>
                ))}
              </Listbox>
            </Field>
            <Field className="col-span-3">
              <Label>Source</Label>
              <Description>Where did you find this product?</Description>
              <Listbox
                name="product_source"
                value={source}
                onChange={setSource}
                placeholder="Select source&hellip;"
              >
                {sources.map((source) => (
                  <ListboxOption value={source.name} key={source.name}>
                    <ListboxLabel>{source.name}</ListboxLabel>
                    <ListboxDescription>{source.link}</ListboxDescription>
                  </ListboxOption>
                ))}
              </Listbox>
            </Field>
            <Field className="col-span-3">
              <Label>Image URL</Label>
              <Description>Link to an image of this product.</Description>
              <Input
                name="image_url"
                placeholder="https://example.com/image.jpg&hellip;"
              />
            </Field>
            <Field className="col-span-3">
              <Label>Product URL</Label>
              <Description>
                Link to the product page for this product.
              </Description>
              <Input
                name="product_url"
                placeholder="https://example.com/product&hellip;"
              />
            </Field>
            <div className="col-span-3">
              <Legend>Product Specs</Legend>
              <Text>Select all tags that apply to this product.</Text>
              <CheckboxGroup className="flex flex-wrap gap-4 items-end">
                {tags.map((tag) => (
                  <CheckboxField key={tag.id}>
                    <Checkbox name={tag.id} />
                    <Label>
                      <Badge color="blue">{tag.name}</Badge>
                    </Label>
                  </CheckboxField>
                ))}
              </CheckboxGroup>
            </div>
            <Field className="col-span-3">
              <Label>Admin Code</Label>
              <Description>
                You are required to use an admin password to submit to the
                database
              </Description>
              <Input
                id="admin_code"
                name="admin_code"
                placeholder="Super secret code&hellip;"
              />
            </Field>
            <div className="flex gap-4 h-min items-center justify-center col-span-full mt-8">
              <CreateTagButton category={category} setAddedTag={setAddedTag} />
              <SubmitButton />
              <Button type="button" color="red" onClick={clearForm}>
                Clear Form
              </Button>
              {state.message && (
                <div className="mt-4">
                  <p
                    className={`font-normal ${
                      state.hasError ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {state.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </FieldGroup>
        <input type="hidden" name="product_category" value={category} />
      </Fieldset>
    </form>
  );
}
