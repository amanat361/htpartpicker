import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconClipboardCopy } from "@tabler/icons-react";
import { getCategories } from "@/database/methods";

export default async function ProductCategories() {
  const { data, result } = await getCategories();
  if (result.hasError) return null;
  const categories = data;

  return (
    <BentoGrid className="max-w-6xl mx-auto">
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
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-rose-200 dark:from-rose-950 dark:to-rose-700 to-rose-100"></div>
);
