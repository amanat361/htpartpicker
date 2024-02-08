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
import { startScraping, FormState } from "./productScraper";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { Text, TextLink } from "@components/text";
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
  const { pending, data } = useFormStatus();
  return (
    <>
      <Button type="submit" disabled={pending}>
        {pending ? "Loading..." : "Scrape"}
      </Button>
      {pending && (
        <Text>
          Currently scraping for the provided url: {data?.get('url')?.toString() || ''}
          This process could take up to a minute.
        </Text>
      )}
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
      <ScrapedProducts category={category} products={state.products} />
    </>
  );
}
