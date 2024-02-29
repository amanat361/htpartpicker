import { Text, TextLink } from "@/components/text";
import { PinContainer } from "@/components/ui/3d-pin";
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
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {products.map((product) => (
        <PinContainer key={product.id} href={product.href} title={product.name}>
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
              {product.name}
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500 ">{product.name}</span>
            </div>
            <div className="flex flex-1 w-full overflow-hidden rounded-lg mt-4">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </PinContainer>
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
