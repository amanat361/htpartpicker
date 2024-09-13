import { supabase } from "@/database/server";
import { ClientSideProductGrid } from "./ProductGrid";

export default async function NewProductsPage() {
  const { data: products, error } = await supabase
    .from("crutchfield")
    .select("*");

  if (!products || error) {
    return <div>There was an error fetching products. {error.message}</div>;
  }

  return <ClientSideProductGrid products={products} />;
}
