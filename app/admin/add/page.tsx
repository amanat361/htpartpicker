import ProductForm from "./ProductForm"
import { getSources, getCategories } from "@utils/supabaseServer";

export default async function AddPage() {
  const sources = await getSources();
  const categories = await getCategories();

  return (
    <div className="max-w-6xl w-full space-y-12">
      <ProductForm sources={sources} categories={categories}/>
    </div>
  );
}
