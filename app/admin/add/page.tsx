import ProductForm from "./ProductForm";
import RecentProducts from "./RecentProducts";
import { getDetailedProducts, getSources, getCategories } from "@utils/supabaseServer";

export default async function AddPage() {
  const products = await getDetailedProducts();
  const sources = await getSources();
  const categories = await getCategories();

  return (
    <div className="max-w-6xl w-full space-y-12">
      <ProductForm categories={categories} />
      <RecentProducts sources={sources} products={products} />
    </div>
  );
}
