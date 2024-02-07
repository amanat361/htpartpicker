import ScrapeForm from "./ScrapeForm";
import { getCategories } from "@utils/supabaseServer";

export default async function ScrapePage() {
  const categories = await getCategories();
  return (
    <div className="max-w-6xl space-y-8 w-full">
      <h1 className="text-3xl font-semibold">Scrape</h1>
      <ScrapeForm categories={categories} />
    </div>
  );
}
