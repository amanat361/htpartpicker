import { Text, Strong } from "./text";
import { Button } from "@/components/primitives/button";
import { ShareIcon, PlusIcon } from "@heroicons/react/16/solid";

export default function SectionHeading( {title}: {title: string} ) {
  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between mb-5">
      <Text><Strong>{title}</Strong></Text>
      {/* <h3 className="text-base font-semibold leading-6 text-gray-900">
        {title}
      </h3> */}
      <div className="mt-3 flex sm:ml-4 sm:mt-0 gap-4">
        <Button outline>
          <ShareIcon />
          Share</Button>
        <Button>
          <PlusIcon />
          Create</Button>
      </div>
    </div>
  );
}
