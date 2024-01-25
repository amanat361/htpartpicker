/* eslint-disable @next/next/no-img-element */
import type { Product, ProductSource } from "@utils/supabaseServer";
import Link from "next/link";

import { Badge } from "@components/badge";

const placeholderImage =
  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

export default function ProductPreview({
  product,
  product_source,
}: {
  product: Product;
  product_source: ProductSource;
}) {
  return (
    <div className="flex items-start gap-6 px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm col-span-full">
      <div className="flex-shrink-0">
        <img
          alt="Product Image"
          className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
          height={100}
          src={product.image_url || placeholderImage}
          width={100}
        />
      </div>
      <div className="flex-grow grid gap-2">
        <h3 className="text-lg font-semibold">
          {product.name || "Product Name"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Brand: {product.brand || "Acme Inc"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Category: {product.category || "Electronics"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Date Created: {product.created_at || "January 1, 2024"}
        </p>
      </div>
      <div className="grid gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Updated: {product_source.last_updated || "January 2, 2024"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Price: ${product_source.price || "99.99"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Source ID: {product_source.source_id || "123456"}
        </p>
        <Link
          className="text-sm text-blue-500 hover:underline dark:text-blue-400"
          href={product_source.url || "#"}
        >
          View on Source
        </Link>
      </div>
    </div>
  );
}