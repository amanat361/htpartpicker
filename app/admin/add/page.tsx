import ProductForm from "./ProductForm"
import { getCategories } from "@utils/supabaseServer";

export default async function AddPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-6xl w-full space-y-12">
      <ProductForm categories={categories}/>
    </div>
  );
}
