/* eslint-disable @next/next/no-img-element */
"use client";
import type { Product } from "@/app/admin/scrape/productScraper";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import { Button } from "@components/button";
import { TextLink } from "@components/text";
import { Badge } from "@components/badge";
import { useState, useEffect, useRef } from "react";
import { Input } from "@components/input";
import { CheckBadgeIcon, StopCircleIcon, TrashIcon } from "@heroicons/react/16/solid";
import { bulkProductInsert } from "@utils/supabaseServer";

export default function ScrapedProducts({ category, products }: { category: String, products: Product[] }) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Product[]>([]);
  const addedProductsCount = useRef(0);

  useEffect(() => {
    if (products.length > addedProductsCount.current) {
      const newProducts = products.slice(addedProductsCount.current);
      setState((state) => [...state, ...newProducts]);
      addedProductsCount.current = products.length;
    }
  }, [products]);

  return (
    <>
      <Table
        dense
        bleed
        className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>Category</TableHeader>
            <TableHeader>Image</TableHeader>
            <TableHeader>Title</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>URL</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Delete</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((product, index) => (
            <TableRow key={product.url}>
              {/* category */}
              <TableCell>
                <Badge color="blue">{category}</Badge>
              </TableCell>
              {/* image */}
              <TableCell>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </TableCell>
              {/* title */}
              <TableCell>
                <Input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={(e) => {
                    const newState = [...state];
                    newState[index].title = e.target.value;
                    setState(newState);
                  }}
                />
              </TableCell>
              {/* brand */}
              <TableCell>
                <Input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={(e) => {
                    const newState = [...state];
                    newState[index].brand = e.target.value;
                    setState(newState);
                  }}
                />
              </TableCell>
              {/* price */}
              <TableCell>
                <Input
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={(e) => {
                    const newState = [...state];
                    newState[index].price = e.target.value;
                    setState(newState);
                  }}
                />
              </TableCell>
              {/* link */}
              <TableCell>
                <TextLink href={product.url}>View on Crutchfield</TextLink>
              </TableCell>
              {/* description */}
              <TableCell>
                <Input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={(e) => {
                    const newState = [...state];
                    newState[index].description = e.target.value;
                    setState(newState);
                  }}
                />
              </TableCell>
              {/* delete */}
              <TableCell>
                <Button
                  type="button"
                  color="red"
                  onClick={() => {
                    const newState = [...state];
                    newState.splice(index, 1);
                    setState(newState);
                  }}
                >
                  <TrashIcon />
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button
          disabled={loading || state.length === 0}
          type="button"
          color="blue"
          onClick={async () => {
            setLoading(true);
            const error = await bulkProductInsert(state);
            if (!error) setState([]);
            setLoading(false);
          }}
        >
          {loading ? <StopCircleIcon /> : <CheckBadgeIcon />}
          {loading ? "Loading..." : "Submit Products"}
        </Button>
      </div>
    </>
  );
}
