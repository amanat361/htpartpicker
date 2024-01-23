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
import { Listbox, ListboxLabel, ListboxOption } from "@components/listbox";
import { Checkbox, CheckboxField, CheckboxGroup } from "@components/checkbox";
import { useFormState, useFormStatus } from "react-dom";
import { getTags, addTag, addProduct } from "@utils/supabaseServer";
4;
import { Button } from "@components/button";
import { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";

type Tag = {
  id: string;
  name: string | null;
};

type Category = {
  name: string;
  description: string | null;
};

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
          <Text className="mt-4">You are currently adding a tag to the{" "}
          <Badge color="red">{category}</Badge> category.</Text>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              addTag(tagName, category);
              setAddedTag({ id: "new", name: tagName });
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
  categories,
}: {
  categories: Category[];
}) {
  const [state, formAction] = useFormState(addProduct, initialState);
  const [category, setCategory] = useState("Testing");
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
    <form action={formAction}>
      <Fieldset>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <Field className="col-span-full">
              <Label>Admin Code</Label>
              <Description>
                You are required to use an admin password to submit to the
                database
              </Description>
              <Input
                id="admin_code"
                name="admin_code"
                type="password"
                placeholder="Super secret code&hellip;"
              />
            </Field>
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
                value={category}
                onChange={setCategory}
                placeholder="Select category&hellip;"
              >
                {categories.map((category) => (
                  <ListboxOption value={category.name} key={category.name}>
                    <ListboxLabel>{category.name}</ListboxLabel>
                  </ListboxOption>
                ))}
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
        <div className="mt-8 flex gap-4">
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
        <input type="hidden" name="product_category" value={category} />
      </Fieldset>
    </form>
  );
}
