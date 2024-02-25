import { getCategories } from "@/database/methods";
import { getProducts } from "@/database/methods";
import Greeting from "@/components/construction";

export default async function PageUnderConstruction({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProducts();
  if (products.result.hasError) return <div>error</div>;
  const filteredProducts = products.data.filter(
    (product) => product.category === params.category
  );

  return (
    <>
      <h1 className="text-2xl">{params.category}</h1>
      <div className="flex flex-col gap-4 w-full max-w-6xl">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full flex gap-4 items-center">
            <img
              className="w-16 h-16"
              src={product.image_url}
              alt={product.name}
            />
            {product.name}
          </div>
        ))}
      </div>
      <Greeting />
    </>
  );
}

export async function generateStaticParams() {
  const { data, result } = await getCategories();
  if (result.hasError) return [{ category: "error" }];

  return data.map((category) => ({
    category: category.name,
  }));
}
