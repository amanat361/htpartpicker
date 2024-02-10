import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@components/pagination";
import { useState, useEffect, useRef } from "react";
import { bulkProductInsert } from "@utils/supabaseServer";
import type { Product } from "@/app/api/scrape/route";
import ProductRow from "./ProductRow";
import SubmitTable from "./SubmitTable";

import { useSearchParams } from "next/navigation";
const ITEMS_PER_PAGE = 5;

export default function ProductTable({
  category,
  products,
}: {
  category: String;
  products: Product[];
}) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const addedProductsCount = useRef(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) setPage(parseInt(page));
  }, [searchParams]);

  useEffect(() => {
    if (products.length > addedProductsCount.current) {
      const newProducts = products.slice(addedProductsCount.current);
      setState((state) => [...state, ...newProducts]);
      addedProductsCount.current = products.length;
    }
  }, [products]);

  const onSubmit = async () => {
    setLoading(true);
    const error = await bulkProductInsert(state);
    if (!error) setState([]);
    setLoading(false);
  };

  const onInputChange = (index: number, product: Product) => {
    state[index] = product;
  };

  const onDelete = (index: number) => {
    const newState = [...state];
    newState.splice(index, 1);
    setState(newState);
    if (state.length % ITEMS_PER_PAGE === 1 && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
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
            <TableHeader>Delete</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {state
            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
            .map((product, index) => (
              <ProductRow
                key={product.url}
                index={index}
                product={product}
                onChange={onInputChange}
                onDelete={onDelete}
              />
            ))}
        </TableBody>
      </Table>
      <SubmitTable loading={loading} onSubmit={onSubmit} />
      <Pagination>
        <PaginationPrevious href={page === 1 ? null : `?page=${page - 1}`} />
        <PaginationList>
          {Array.from({ length: Math.ceil(state.length / ITEMS_PER_PAGE) }).map(
            (_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationPage key={pageNumber} href={`?page=${pageNumber}`}>
                  {pageNumber as unknown as string}
                </PaginationPage>
              );
            }
          )}
        </PaginationList>
        <PaginationNext
          href={
            state.length <= page * ITEMS_PER_PAGE ? null : `?page=${page + 1}`
          }
        />
      </Pagination>
    </>
  );
}
