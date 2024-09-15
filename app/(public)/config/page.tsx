import { Text } from "@/components/primitives/text";
import ProductTable from "./ProductTable";
import { supabase } from "@/database/server";

export default async function ConfigPage() {
  const batchSize = 500;
  const totalProducts = 2500;
  const batches = totalProducts / batchSize;

  const productPromises = Array.from({ length: batches }, (_, i) =>
    supabase
      .from("crutchfield")
      .select("*")
      .range(i * batchSize, (i + 1) * batchSize - 1)
  );

  const results = await Promise.all(productPromises);

  const errors = results
    .filter((result) => result.error)
    .map((result) => result.error);
  const allProducts = results.flatMap((result) => result.data || []);

  if (errors.length > 0 || allProducts.length === 0) {
    return (
      <div>
        There was an error fetching products.{" "}
        {errors.map((error) => error?.message).join(" ")}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl flex flex-col gap-4">
      <Text>Configure your home theater</Text>
      <ProductTable products={allProducts} />
    </div>
  );
}
