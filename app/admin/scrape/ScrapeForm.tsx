"use client";

import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@components/fieldset";
import { Button } from "@components/button";
import { Input } from "@components/input";
import { startScraping } from "@utils/productScraper";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { Text, TextLink } from "@components/text";
import { FormState } from "@utils/productScraper";
import type { Category } from "@utils/supabaseServer";

import ScrapedProducts from "./ScrapedProducts";
import { Listbox, ListboxLabel, ListboxOption } from "@components/listbox";
import { useState } from "react";

const initialState = {
  urls: [],
  products: [],
  message: "",
  hasError: false,
} as FormState;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      <Button type="submit" disabled={pending}>
        {pending ? "Loading..." : "Scrape"}
      </Button>
      {pending && <Text>This process could take up to a minute.</Text>}
    </>
  );
}

export default function ScrapeForm({ categories }: { categories: Category[] }) {
  const [state, formAction] = useFormState(startScraping, initialState);
  const [category, setCategory] = useState(categories[0].name);

  return (
    <>
      <form action={formAction} className="space-y-4">
        <Fieldset>
          <Legend>Scrape a URL</Legend>
          <Text>
            This form will allow you to scrape a URL and return the data. This
            will be one of the places where this product is sold.
          </Text>
          <FieldGroup>
            <Field>
              <Label>URL</Label>
              <Input name="url" />
            </Field>
            {/* category field */}
            <Field>
              <Label>Category</Label>
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
            <SubmitButton />
          </FieldGroup>
        </Fieldset>
      </form>
      {state.hasError && <Text>{state.message}</Text>}
      {state.urls.length > 0 && (
        <div>
          <Text>Scraped URLs</Text>
          <ul>
            {state.urls.map((url) => (
              <li key={url}>
                <TextLink href={url}>{url}</TextLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ScrapedProducts category={category} products={state.products} />
    </>
  );
}
