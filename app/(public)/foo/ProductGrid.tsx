"use client";
import { Suspense, useState } from "react";
import { Tables } from "@/database.types";

import { Button } from "@/components/primitives/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ITEMS_PER_PAGE = 5;

function ProductGrid({
  products,
  page,
}: {
  products: Tables<"crutchfield">[];
  page: number;
}) {
  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
      {paginatedProducts.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={"https://images.crutchfieldonline.com/" + product.photo_url}
              alt={product.title}
              className="w-full h-48 object-contain bg-white p-2 rounded-lg"
            />
            <CardTitle className="mt-2 text-lg font-bold truncate">
              {product.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {product.brand && (
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            )}
            <p className="mt-2 text-xl font-bold">
              {product.price
                ? `$${product.price.toFixed(2)}`
                : "Price not available"}
            </p>
            <div className="mt-2 flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1">{product.average_rating.toFixed(1)}</span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({product.rating_count} reviews)
              </span>
            </div>
            <p className="mt-2 text-sm line-clamp-3">{product.key_features}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Link href={product.product_url}>View Product</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          {...(i === currentPage ? { outline: true } : { plain: true })}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
}

function ProductGridWithPagination({
  products,
}: {
  products: Tables<"crutchfield">[];
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto py-8">
      <ProductGrid products={products} page={currentPage} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export function ClientSideProductGrid({
  products,
}: {
  products: Tables<"crutchfield">[];
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <div className="container mx-auto">
      <Tabs defaultValue={categories[0]}>
        <div className="overflow-x-auto">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductGridWithPagination
                products={products.filter((p) => p.category === category)}
              />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
