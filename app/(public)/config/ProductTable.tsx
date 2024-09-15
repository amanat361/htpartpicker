import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";
import { Tables } from "@/database.types";
import ProductSelection from "./ProductSelection";

type Product = Tables<"crutchfield">;

// i pasted the type below for reference on how to build the table

// type Product = {
//   average_rating: number;
//   brand: string | null;
//   category: string;
//   id: number;
//   item_no: string;
//   key_features: string;
//   photo_url: string;
//   price: number | null;
//   product_url: string;
//   rating_count: number;
//   stock_status: string | null;
//   subtitle: string | null;
//   title: string;
// };

export default function ProductTable({ products }: { products: Product[] }) {
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  return (
    <Table dense bleed>
      <TableHead>
        <TableRow>
          <TableHeader>Component</TableHeader>
          <TableHeader>Selection</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Where</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category}>
            <TableCell>{category}</TableCell>
            <TableCell>
              <ProductSelection category={category} products={products.filter((product) => product.category === category)} />
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
