/* eslint-disable @next/next/no-img-element */
import type { ProductWithTags } from "@utils/supabaseServer";
import { Badge } from "@components/badge";
import { Button } from "@components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";

function formatTime(time: string) {
  const date = new Date(time);
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as const;
  return date.toLocaleDateString("en-US", options);
}

export default function RecentProducts({ products }: { products: ProductWithTags[] }) {
  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          <TableHeader>Category</TableHeader>
          <TableHeader>Image</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Brand</TableHeader>
          <TableHeader>Tags</TableHeader>
          <TableHeader>Add Source</TableHeader>
          <TableHeader>Delete</TableHeader>
          <TableHeader>Created At</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
                <Badge color="lime">{product.category}</Badge>
            </TableCell>
            <TableCell>
              <img
                src={product.image_url}
                alt={product.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
            </TableCell>
            <TableCell>
              <div className="font-bold text-md">
                {product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}
              </div>
            </TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>
              {product.tags.length === 0 && <Badge color="zinc">None</Badge>}
              {product.tags.slice(0, 1).map((tag) => (
                <Badge key={tag} color="indigo" className="mr-1">
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 1 && (
                <Badge color="indigo" className="mr-1">
                  +{product.tags.length - 1} more
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <Button color="indigo">Add Source</Button>
            </TableCell>
            <TableCell>
              <Button color="red">Delete Product</Button>
            </TableCell>
            <TableCell className="text-zinc-500">{formatTime(product.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
