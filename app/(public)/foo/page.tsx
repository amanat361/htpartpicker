import { supabase } from "@/database/server";
import { ClientSideProductGrid } from "./ProductGrid";

export default async function NewProductsPage() {
  const { data: products1, error: error1 } = await supabase
    .from("crutchfield")
    .select("*")
    .range(0,500);

  const { data: products2, error: error2 } = await supabase
    .from("crutchfield")
    .select("*")
    .range(500,1000);

  const { data: products3, error: error3 } = await supabase
    .from("crutchfield")
    .select("*")
    .range(1000,1500);

  const { data: products4, error: error4 } = await supabase
    .from("crutchfield")
    .select("*")
    .range(1500,2000);

  const { data: products5, error: error5 } = await supabase
    .from("crutchfield")
    .select("*")
    .range(2000,2500);

  if (!products1 || !products2 || !products3 || !products4 || !products5 || error1 || error2 || error3 || error4 || error5) {
    return <div>There was an error fetching products. {error1?.message} {error2?.message} {error3?.message} {error4?.message} {error5?.message}</div>;
  }

  const products = [...products1, ...products2, ...products3, ...products4, ...products5];

  return <ClientSideProductGrid products={products} />;
}
