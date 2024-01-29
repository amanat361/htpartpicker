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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import { Button } from "@components/button";
import { Input } from "@components/input";
import { startScraping } from "@utils/productScraper";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { Text, TextLink } from "@components/text";
import { FormState } from "@utils/productScraper";

const initialState = {
  products: [],
  message: "",
  hasError: false,
} as FormState;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
    >
      {pending ? "Loading..." : "Scrape"}
    </Button>
  );
}

export default function ScrapePage() {
  const [state, formAction] = useFormState(startScraping, initialState);

  return (
    <div className="max-w-6xl space-y-8">
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
            <SubmitButton />
          </FieldGroup>
        </Fieldset>
      </form>
      {state.hasError && <Text>{state.message}</Text>}
      {state.products.length > 0 && (
        <Table
          dense
          bleed
          className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
        >
          <TableHead>
            <TableRow>
              <TableHeader>Image</TableHeader>
              <TableHeader>Title</TableHeader>
              <TableHeader>Brand</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>URL</TableHeader>
              <TableHeader>Description</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.products.map((product) => (
              <TableRow key={product.url}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <TextLink href={product.url}>View on Crutchfield</TextLink>
                </TableCell>
                <TableCell>{product.description.length > 30 ? product.description.slice(0, 30) + "..." : product.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
