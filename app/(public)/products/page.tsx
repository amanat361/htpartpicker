import { BentoGrid, BentoGridItem } from "@/components/effects/bento-grid";
import { IconClipboardCopy } from "@tabler/icons-react";
import { getCategories } from "@/database/methods";

export default async function ProductCategories() {
  const { data, result } = await getCategories();
  if (result.hasError) return null;
  const categories = data;

  return (
    <>
      <div className="mx-auto max-w-xl text-center">
        <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Check out our categories for the best products in Home Theater
        </p>
      </div>
      <BentoGrid className="max-w-6xl mx-auto mt-16 sm:mt-20">
        {categories.map((category, i) => (
          <BentoGridItem
            key={i}
            title={category.name}
            description={category.description}
            header={<Skeleton />}
            icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-rose-200 dark:from-rose-950 dark:to-rose-700 to-rose-100"></div>
);
