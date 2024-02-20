/* eslint-disable @next/next/no-img-element */
import type { Source, ProductWithTagsAndSources } from "@/database/types";
import { Badge } from "@/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import AddSourceToProductComponent from "./components/AddSourceToProduct";
import DeleteProductComponent from "./components/DeleteProduct";

function formatTime(time: string) {
  const date = new Date(time);
  const options = {
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // hour12: true,
  } as const;
  return date.toLocaleDateString("en-US", options);
}

const maxTags = 1;
const maxSources = 1;

function SourceLogo({
  sources,
  id,
  url,
}: {
  sources: Source[];
  id: number;
  url: string;
}) {
  const source = sources.find((source) => source.id === id);
  if (!source) return <Badge color="zinc">N/A</Badge>;
  return (
    <a href={url} target="_blank">
      <img
        src={source.logo as string}
        alt={source.name as string}
        className="h-8 rounded-lg object-cover min-w-16"
      />
    </a>
  );
}

export default function RecentProducts({
  sources,
  products,
}: {
  sources: Source[];
  products: ProductWithTagsAndSources[];
}) {
  return (
    <Table dense bleed className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          <TableHeader>Category</TableHeader>
          <TableHeader>Image</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Brand</TableHeader>
          <TableHeader>Tags</TableHeader>
          <TableHeader>Sources</TableHeader>
          <TableHeader>Add Source</TableHeader>
          <TableHeader>Delete</TableHeader>
          <TableHeader>Created</TableHeader>
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
                className="min-w-12 min-h-12 rounded-xl object-cover"
              />
            </TableCell>
            <TableCell>
              <div className="font-bold text-md">
                {product.name.length > 20
                  ? `${product.name.slice(0, 20)}...`
                  : product.name}
              </div>
            </TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>
              {product.tags.length === 0 && <Badge color="zinc">None</Badge>}
              {product.tags.slice(0, maxTags).map((tag) => (
                <Badge key={tag.id} color="indigo" className="mr-1">
                  {tag.name}
                </Badge>
              ))}
              {product.tags.length > maxTags && (
                <Badge color="indigo">
                  +{product.tags.length - maxTags} more
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {product.sources.length === 0 && <Badge color="zinc">None</Badge>}
              <div className="flex gap-4 w-full">
                {product.sources.slice(0, maxSources).map((source) => (
                  <SourceLogo
                    key={source.url}
                    sources={sources}
                    id={source.source_id}
                    url={source.url}
                  />
                ))}
                {product.sources.length > maxSources && (
                  <Badge color="amber">
                    +{product.sources.length - maxSources} more
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <AddSourceToProductComponent
                sources={sources}
                product_id={product.id}
              />
            </TableCell>
            <TableCell>
              <DeleteProductComponent product_id={product.id} />
            </TableCell>
            <TableCell className="text-zinc-500">
              {formatTime(product.created_at)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
