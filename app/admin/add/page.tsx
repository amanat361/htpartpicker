import ProductForm from "./ProductForm";
import RecentProducts from "./RecentProducts";
import { getSources, getCategories, getProductsWithTagsAndSources, getTags } from "@/database/methods";

export default async function AddPage() {
  const products = await getProductsWithTagsAndSources();
  const {data: tags, result: tagsResult} = await getTags();
  const {data: sources, result: sourcesResult } = await getSources();
  const {data: categories, result: categoriesResult} = await getCategories();

  if (tagsResult.hasError) {
    return <div>There was an error fetching tags. {tagsResult.message}</div>;
  }

  if (sourcesResult.hasError) {
    return <div>There was an error fetching sources. {sourcesResult.message}</div>;
  }

  if (categoriesResult.hasError) {
    return <div>There was an error fetching categories. {categoriesResult.message}</div>;
  }

  return (
    <div className="max-w-6xl w-full space-y-12">
      <ProductForm tags={tags} categories={categories} />
      <RecentProducts sources={sources} products={products} />
    </div>
  );
}
