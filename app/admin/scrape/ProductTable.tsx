import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { useState, useEffect, useRef } from "react";
import { insertScrapedProducts } from "@/database/actions";
import type { ScrapedProduct } from "@/database/types";
import ProductRow from "./ProductRow";
import SubmitTable from "./SubmitTable";

import TablePagination from "./TablePagination";
const ITEMS_PER_PAGE = 10;

export default function ProductTable({
  category,
  products,
}: {
  category: String;
  products: ScrapedProduct[];
}) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ScrapedProduct[]>([]);
  const [page, setPage] = useState(1);
  const addedProductsCount = useRef(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const isEmpty = (product: ScrapedProduct) => {
      return Object.values(product).some((value) => value === "");
    };

    const notEmpty = (product: ScrapedProduct) => {
      return !isEmpty(product);
    };

    if (products.length > addedProductsCount.current) {
      const addedProducts = products.slice(addedProductsCount.current);
      const newProducts = addedProducts;
      const emptyProducts = newProducts.filter(isEmpty);
      const notEmptyProducts = newProducts.filter(notEmpty);
      setState((state) => [...emptyProducts, ...state, ...notEmptyProducts]);
      addedProductsCount.current = products.length;
    }
  }, [products, state]);

  const onSubmit = async () => {
    setLoading(true);
    const result = await insertScrapedProducts(state);
    if (!result.hasError) {
      setState([]);
      setPage(1);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const onInputChange = (index: number, product: ScrapedProduct) => {
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
            <TableHeader>View</TableHeader>
            <TableHeader>Title</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Highlights</TableHeader>
            <TableHeader>Delete</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {state
            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
            .map((product, index) => (
              <ProductRow
                key={product.url + product.name + product.brand}
                index={index}
                product={product}
                onChange={onInputChange}
                onDelete={onDelete}
              />
            ))}
        </TableBody>
      </Table>
      <SubmitTable loading={loading} onSubmit={onSubmit} />
      {error && <div className="text-red-500">{error}</div>}
      <TablePagination
        stateLength={state.length}
        page={page}
        setPage={setPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
}
