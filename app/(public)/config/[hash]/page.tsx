import { Suspense } from "react";
import { ProductCard } from "./ProductCard";
import { Metadata, ResolvingMetadata } from "next";
import { getProductsFromHash } from "../actions";
import { TextLink } from "@/components/primitives/text";

type Props = {
  params: { hash: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const products = await getProductsFromHash(params.hash);
  const previousImages = (await parent).openGraph?.images || [];
  const description =
    !products || products.length === 0
      ? "No products found."
      : `Someone has shared a custom configuration for their home theater with ${
          products.length
        } items: ${products.map((product) => product.title).join(", ")}.`;

  return {
    title: "Home Theater Part Picker - Custom Configuration",
    description: description,
    openGraph: {
      // images: ["/some-specific-page-image.jpg", ...previousImages],
      images: previousImages,
    },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: { hash: string };
}) {
  const products = await getProductsFromHash(params.hash);

  if (!products) {
    return (
      <div className="p-4 w-full max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-4">
          Invalid Configuration in the URL
        </h1>
        <TextLink href="/config">Go back to the configuration page</TextLink>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Custom Configuration with {products.length} Products
      </h1>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-end">
        <h1 className="text-xl font-bold mt-4">
          Total: $
          {products
            .reduce((total, product) => total + (product.price ?? 0), 0)
            .toFixed(2)}
        </h1>
      </div>
    </div>
  );
}
