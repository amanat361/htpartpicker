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

import {
  EyeIcon,
  PlusCircleIcon,
  XCircleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/16/solid";

import Failure from "./components/Failure";
import Success from "./components/Success";

import type {
  ProductSource,
  Product,
  Tag,
  Source,
  Category,
} from "@utils/supabaseServer";
import ImagePreview from "./components/ImagePreview";

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
        color="sky"
        onClick={() => {
          setIsOpen(true);
        }}
        disabled={pending}
      >
        <PlusCircleIcon />
        Add Tag
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

function PreviewProduct({
  product,
  product_source,
}: {
  product: Product;
  product_source: ProductSource;
}) {
  const { pending } = useFormStatus();
  const [isOpen, setIsOpen] = useState(false);

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
        <EyeIcon />
        Preview Product
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>{product.name}</DialogTitle>
        <DialogDescription>
          You are adding the product &quot;{product.name}&quot; from{" "}
          {product.brand} for ${product_source.price}.
        </DialogDescription>
        <DialogBody>
          <Text className="my-4">Preview of the product image:</Text>
          <img
            className="rounded-lg aspect-2 object-cover"
            alt={product.name}
            src={product.image_url}
          />
          <Text className="mt-4">Preview of the product page:</Text>
          <a href={product_source.url} target="_blank">
            {product.name}
          </a>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Close
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
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState(categories[0].name);
  const [source, setSource] = useState(sources[0].name);
  const [image_url, setImageURL] = useState<string>("");
  const [productURL, setProductURL] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [addedTag, setAddedTag] = useState<Tag | null>(null);

  useEffect(() => {
    async function loadTags() {
      const tags = await getTags(category);
      setTags(tags);
    }
    loadTags();
  }, [addedTag, category]);

  function clearForm() {
    const form = document.querySelector("form");
    if (form) {
      form.reset();
      setName("");
      setBrand("");
      setPrice(0);
      setCategory(categories[0].name);
      setSource(sources[0].name);
      setImageURL("");
      setProductURL("");
      setTags([]);
      setAddedTag(null);
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
            {/* admin code field */}
            <Field className="sm:col-span-2">
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
            {/* brand field */}
            <Field className="sm:col-span-2">
              <Label>Brand</Label>
              <Description>Who manufactures this product?</Description>
              <Input
                name="product_brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="KEF&hellip;"
              />
            </Field>
            {/* image field */}
            <Field className="sm:col-span-2">
              <Label>Image URL</Label>
              <Description>Link to an image of this product.</Description>
              <Input
                name="image_url"
                value={image_url}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="https://example.com/image.jpg&hellip;"
              />
            </Field>
            {/* product url field */}
            <Field className="sm:col-span-2">
              <Label>Product URL</Label>
              <Description>
                Link to the product page for this product.
              </Description>
              <Input
                name="product_url"
                value={productURL}
                onChange={(e) => setProductURL(e.target.value)}
                placeholder="https://example.com/product&hellip;"
              />
            </Field>
            {/* price field */}
            <Field className="sm:col-span-2">
              <Label>Price</Label>
              <Description>How much is this?</Description>
              <Input
                name="product_price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="number"
                step="0.01"
                min="0.00"
                placeholder="100.00&hellip;"
              />
            </Field>
            {/* image preview */}
            <ImagePreview image_url={image_url} span="sm:col-span-2" />
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
                      <ListboxDescription className="hidden sm:flex">
                        {category.description}
                      </ListboxDescription>
                    </ListboxOption>
                  ))}
                </Listbox>
              </Field>
              {/* source field */}
              <Field>
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
                      <ListboxDescription className="hidden sm:flex">
                        {source.link}
                      </ListboxDescription>
                    </ListboxOption>
                  ))}
                </Listbox>
              </Field>
              {/* product tags */}
              <div>
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
              {/* button field */}
              <div className="flex flex-col gap-4 sm:items-center justify-center [&>*]:w-full">
                <CreateTagButton
                  category={category}
                  setAddedTag={setAddedTag}
                />
                {/* add source */}
                <Button type="button" color="indigo" onClick={() => {}}>
                  <PlusCircleIcon />
                  Add Source
                </Button>
                <SubmitButton />
                <Button type="button" color="yellow" onClick={() => {}}>
                  <ArrowUturnLeftIcon />
                  Undo Changes
                </Button>
                <Button type="button" color="red" onClick={clearForm}>
                  <XCircleIcon />
                  Clear Form
                </Button>
              </div>
            </div>
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
