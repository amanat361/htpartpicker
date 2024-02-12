import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import { useState, useEffect, useRef } from "react";
import { bulkProductInsert } from "@utils/supabaseServer";
import type { Product } from "@/app/api/scrape/route";
import ProductRow from "./ProductRow";
import SubmitTable from "./SubmitTable";

import { useSearchParams } from "next/navigation";
import TablePagination from "./TablePagination";
const ITEMS_PER_PAGE = 10;

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
    const isEmpty = (product: Product) => {
      return Object.values(product).some((value) => value === "");
    };

    const notEmpty = (product: Product) => {
      return !isEmpty(product);
    };
    if (products.length > addedProductsCount.current) {
      const newProducts = products.slice(addedProductsCount.current);
      const emptyProducts = newProducts.filter(isEmpty);
      const notEmptyProducts = newProducts.filter(notEmpty);
      setState((state) => [...emptyProducts, ...notEmptyProducts, ...state]);
      addedProductsCount.current = products.length;
    }
  }, [products]);

  const onSubmit = async () => {
    setLoading(true);
    const error = await bulkProductInsert(state);
    if (!error) {
      setState([]);
      setPage(1);
    }
    setLoading(false);
  };

  const onInputChange = (index: number, product: Product) => {
    state[index] = product;
  };

  const onDelete = (index: number) => {
    const newState = [...state];
    newState.splice(index, 1);
    const lastPage = Math.ceil(newState.length / ITEMS_PER_PAGE);
    if (newState.length % ITEMS_PER_PAGE === 0) {
      if (page > lastPage) setPage(lastPage);
    }
    setState(newState);
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
      <TablePagination
        stateLength={state.length}
        page={page}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
}
