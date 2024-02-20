/* eslint-disable @next/next/no-img-element */
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
import { insertProductFromForm, insertTagWithValidation } from "@/app/database/actions";
4;
import { Button } from "@components/button";
import { useEffect, useState } from "react";

import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";

import Failure from "./components/Failure";
import Success from "./components/Success";
import type { Tag, Category } from "@database/types";
import ImagePreview from "./components/ImagePreview";

function CreateTagButton({
  category,
}: {
  category: string;
}) {
  const { pending } = useFormStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");

  return (
    <>
      <Button
        type="button"
        outline
        onClick={() => {
          setIsOpen(true);
        }}
        disabled={pending}
      >
        <PlusCircleIcon />
        <span className="hidden sm:block">Add Tag</span>
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
              insertTagWithValidation({ name: tagName, category });
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button color="blue" type="submit" disabled={pending}>
      <PlusCircleIcon />
      <span className="hidden sm:block">Create Product</span>
    </Button>
  );
}

const initialState = {
  message: "",
  hasError: false,
};

export default function ProductForm({
  tags: initialTags,
  categories,
}: {
  tags: Tag[];
  categories: Category[];
}) {
  const [state, formAction] = useFormState(insertProductFromForm, initialState);
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState(categories[0].name);
  const [image_url, setImageURL] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    setTags(initialTags.filter((tag) => tag.category === category));
  }, [initialTags, category]);

  function clearForm() {
    const form = document.querySelector("form");
    if (form) {
      form.reset();
      setName("");
      setBrand("");
      setCategory(categories[0].name);
      setImageURL("");
      setTags([]);
    }
    const adminCode = document.querySelector(
      "#product_name"
    ) as HTMLInputElement;
    if (adminCode) {
      adminCode.focus();
    }
  }

  return (
    <form action={formAction} autoComplete="off">
      <Fieldset>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-6 sm:gap-4 items-start">
            {/* name field */}
            <Field className="sm:col-span-2">
              <Label>Name</Label>
              <Description>
                Official name for this product without branding.
              </Description>
              <Input
                name="product_name"
                id="product_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Q350 Bookshelf Speakers&hellip;"
              />
            </Field>
            {/* image field */}
            <Field className="sm:col-span-4">
              <Label>Image URL</Label>
              <Description>Link to an image of this product.</Description>
              <Input
                name="image_url"
                value={image_url}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="https://example.com/image.jpg&hellip;"
              />
            </Field>
            <div className="sm:col-span-4 sm:grid sm:grid-cols-2 flex flex-col gap-4">
              {/* category field */}
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
              {/* brand field */}
              <Field>
                <Label>Brand</Label>
                <Description>Who manufactures this product?</Description>
                <Input
                  name="product_brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="KEF&hellip;"
                />
              </Field>
              {/* product tags */}
              <div className="flex flex-col">
                <Legend>Product Specs</Legend>
                <Text>Select all tags that apply to this product.</Text>
                {!tags.length && (
                  <p className="text-red-500">
                    No tags found for this category. Please add a tag.
                  </p>
                )}
                <CheckboxGroup className="flex flex-wrap gap-4 items-end mt-4">
                  {tags.map((tag) => (
                    <CheckboxField key={tag.id}>
                      <Checkbox name={tag.id} />
                      <Label>
                        <Badge color="blue">{tag.name}</Badge>
                      </Label>
                    </CheckboxField>
                  ))}
                  {/* create tag button */}
                  <CreateTagButton
                    category={category}
                  />
                </CheckboxGroup>
              </div>
              {/* admin code field */}
              <Field>
                <Label>Admin Code</Label>
                <Description>
                  You are required to use an admin password
                </Description>
                <Input
                  id="admin_code"
                  name="admin_code"
                  placeholder="Super secret code&hellip;"
                />
              </Field>
              {/* button field */}
              <div className="flex gap-4 sm:items-center justify-center [&>*]:w-full col-span-full">
                {/* submit product button */}
                <SubmitButton />
                {/* clear form button */}
                <Button type="button" color="yellow" onClick={clearForm}>
                  <XCircleIcon />
                  <span className="hidden sm:block">Clear Form</span>
                </Button>
              </div>
            </div>
            {/* image preview */}
            <ImagePreview image_url={image_url} span="sm:col-span-2" />
          </div>

          {
            <div className="mt-4 sm:col-start-3 sm:col-end-5">
              {state.message &&
                (state.hasError ? (
                  <Failure errorMessage={state.message} />
                ) : (
                  <Success />
                ))}
            </div>
          }
        </FieldGroup>
        <input type="hidden" name="product_category" value={category} />
      </Fieldset>
    </form>
  );
}
