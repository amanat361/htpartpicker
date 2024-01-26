/* eslint-disable @next/next/no-img-element */
"use client";

import { addSourceToProduct } from "@utils/supabaseServer";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@components/dialog";
import { Description, Field, Label } from "@components/fieldset";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import {
  Listbox,
  ListboxDescription,
  ListboxLabel,
  ListboxOption,
} from "@components/listbox";
import type { Source, ProductSource } from "@utils/supabaseServer";
import Failure from "./Failure";
import Success from "./Success";

type Response = {
  message: string;
  hasError: boolean;
};

export default function AddSourceToProductComponent({
  sources,
  product_id,
}: {
  sources: Source[];
  product_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState(sources[0]);
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState<Response | null>(null);

  return (
    <>
      <Button type="button" color="indigo" onClick={() => setIsOpen(true)}>
        <PlusCircleIcon />
        New
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Where can this product be purchased</DialogTitle>
        <DialogDescription>
          This form will allow you to add a source to this product. This will be
          one of the places where this product is sold.
        </DialogDescription>
        <DialogBody className="space-y-4">
          {/* source field */}
          <Field>
            <Label>Select Retailer</Label>
            <Description>Where did you find this product?</Description>
            <Listbox
              name="product_source"
              value={source}
              onChange={setSource}
              placeholder="Select source&hellip;"
            >
              {sources.map((source) => (
                <ListboxOption value={source} key={source.id}>
                  <img
                    src={source.logo as string}
                    alt={source.name as string}
                    className="w-16 h-6 rounded-lg object-cover"
                  />
                  <ListboxLabel>{source.name}</ListboxLabel>
                  <ListboxDescription>{source.link}</ListboxDescription>
                </ListboxOption>
              ))}
            </Listbox>
          </Field>
          {/* url field */}
          <Field>
            <Label>URL</Label>
            <Description>
              The URL of the product page on the store website.
            </Description>
            <Input
              name="product_url"
              id="product_url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.amazon.com/&hellip;"
            />
          </Field>
          {/* price field */}
          <Field className="sm:col-span-2">
            <Label>Price</Label>
            <Description>
              Current full price of the product not including discounts.
            </Description>
            <Input
              name="product_price"
              id="product_price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
              min={0}
              step={0.01}
              placeholder="99.99&hellip;"
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            type="submit"
            color="indigo"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const result = await addSourceToProduct({
                product_id,
                source_id: source.id,
                url,
                price,
              } as ProductSource);
              setStatus(result);
              setIsLoading(false);
            }}
          >
            <CheckCircleIcon />
            Add Source to Product
          </Button>
        </DialogActions>
        <div className="mt-8">
          {status &&
            (status.hasError ? (
              <Failure errorMessage={status.message} />
            ) : (
              <Success />
            ))}
        </div>
      </Dialog>
    </>
  );
}
