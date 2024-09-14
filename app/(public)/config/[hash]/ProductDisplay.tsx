import { supabase } from "@/database/server";
import Link from "next/link";

export async function ProductDisplay({ id }: { id: number }) {
  const { data: product, error } = await supabase
    .from("crutchfield")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return (
      <div>
        Error loading product {id}: {error.message}
      </div>
    );
  }

  if (!product) {
    return <div>Product {id} not found</div>;
  }

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <img
        src={`https://images.crutchfieldonline.com/ImageHandler/trim/500/500${product.photo_url}`}
        alt={product.title}
        className="w-24 h-24 object-contain bg-white p-2 rounded-lg"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-bold truncate">{product.title}</h2>
        {product.brand && (
          <p className="text-sm text-gray-600">{product.brand}</p>
        )}
        <p className="text-xl font-bold">
          {product.price
            ? `$${product.price.toFixed(2)}`
            : "Price not available"}
        </p>
        <div className="flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1">{product.average_rating.toFixed(1)}</span>
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating_count} reviews)
          </span>
        </div>
      </div>
      <Link
        href={product.product_url}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View
      </Link>
    </div>
  );
}
