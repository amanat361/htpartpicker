import { ClipboardDocumentIcon, ShareIcon } from "@heroicons/react/20/solid";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const items = [
  {
    id: 1,
    name: "Copy to Clipboard",
    icon: <ClipboardDocumentIcon />,
  },
  {
    id: 2,
    name: "Share with Others",
    icon: <ShareIcon />,
  },
];

export default function BuildCard() {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-2">
        <Input value="htpartpicker.com/builds/abcdef" />
      </div>
    </div>
  );
}
