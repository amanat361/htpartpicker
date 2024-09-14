import { Suspense } from "react";
import { decodeHash } from "@/utils/hash";
import { ProductDisplay } from "./ProductDisplay";

export default function ProductsPage({ params }: { params: { hash: string } }) {
  const productIds = decodeHash(params.hash);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="space-y-4">
        {productIds.map((id) => (
          <Suspense key={id} fallback={<div>Loading product {id}...</div>}>
            <ProductDisplay id={id} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
