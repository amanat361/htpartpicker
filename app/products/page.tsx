/* eslint-disable @next/next/no-img-element */
import { Text, TextLink } from "@components/text";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "AV Recievers",
    href: "/products/av-recievers",
    imageSrc:
      "https://images.crutchfieldonline.com/ImageBank/v20150623164400/brands/custom/homeTheater/ht_component_system_receiver.jpg",
    imageAlt: "AV Reciever",
  },
  {
    id: 2,
    name: "Subwoofers",
    href: "/products/subwoofers",
    imageSrc:
      "https://s40517.pcdn.co/wp-content/uploads/2022/08/Sub1080x1080-Blog-Pic.png",
    imageAlt: "Subwoofer",
  },
  {
    id: 3,
    name: "Displays",
    href: "/products/displays",
    imageSrc: "https://i.insider.com/60ca3acf23393a00188e38ea?width=700",
    imageAlt: "Display",
  },
  {
    id: 4,
    name: "Speakers",
    href: "/products/speakers",
    imageSrc:
      "https://images.crutchfieldonline.com/ImageBank/v20150623164500/brands/custom/homeTheater/ht_component_system_speakers.jpg",
    imageAlt: "Speakers",
  },
];

function ProductList() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product) => (
        <Link key={product.id} href={product.href} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 dark:text-gray-100">
            <h3>{product.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="space-y-12 w-full max-w-6xl">
      <ProductList />
    </div>
  );
}
