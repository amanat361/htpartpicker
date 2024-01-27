"use client";

import {
  Description,
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
import { Text } from "@components/text";

export default function ScrapePage() {
  const { pending } = useFormStatus();
  return (
    <form action={startScraping} className="space-y-4">
      <Fieldset>
        <Legend>Scrape a URL</Legend>
        <Text>
          This form will allow you to scrape a URL and return the data. This
          will be one of the places where this product is sold.
        </Text>
        <FieldGroup>
          <Field>
            <Label>URL</Label>
            <Input name="url"/>
          </Field>
          <Button type="submit" disabled={pending}>
            Scrape
          </Button>
        </FieldGroup>
      </Fieldset>
    </form>
  );
}
