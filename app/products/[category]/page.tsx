import { getCategories } from "@/database/methods";
import Greeting from "@/components/construction";

export default function PageUnderConstruction({
  params,
}: {
  params: { category: string };
}) {
  return (
    <>
      {params.category}
      <Greeting />
    </>
  );
}


export async function generateStaticParams() {
  const {data, result} = await getCategories();
  if (result.hasError) return [
    { category: "error" },
  ];

  return data.map((category) => ({
    category: category.name,
  }));
}