import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";

import { getCategories } from "@/database/methods";
import { getProducts } from "@/database/methods";
import ConstructionGreeting from "@/components/construction";

export default async function PageUnderConstruction({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProducts();
  if (products.result.hasError) return <ConstructionGreeting />;
  const filteredProducts = products.data.filter(
    (product) => product.category.toLowerCase() === params.category
  );

  return (
    <div className="w-full max-w-6xl">
      <h1 className="text-2xl leading-6 mb-4">{params.category}</h1>
      <Table
        dense
        bleed
        className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>Image</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>ID</TableHeader>
            <TableHeader>Created At</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  className="w-16 h-16"
                  src={product.image_url}
                  alt={product.name}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                {new Date(product.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export async function generateStaticParams() {
  const { data, result } = await getCategories();
  if (result.hasError) return [{ category: "error" }];

  return data.map((category) => ({
    category: category.name.toLowerCase(),
  }));
}
