"use client";
import { Roboto_Slab } from "next/font/google";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { useState } from "react";
import { Button } from "@/components/button";
import { ShareIcon, PlusIcon, WrenchIcon } from "@heroicons/react/16/solid";
import { Badge } from "@/components/badge";
import { Strong, Text, TextLink } from "@/components/text";
import { Item, items } from "@/data/products";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import BuildCard from "./buildcard";

type BadgeColor =
  | "teal"
  | "blue"
  | "purple"
  | "amber"
  | "yellow"
  | "green"
  | "red"
  | "fuchsia";
interface BadgeColors {
  [key: string]: BadgeColor;
}

const badgeColors = {
  device: "teal",
  speaker: "blue",
  accessory: "fuchsia",
  works: "yellow",
  recommended: "green",
  incompatible: "red",
  single: "amber",
  pair: "purple",
} as BadgeColors;

const customFont = Roboto_Slab({ subsets: ["latin"] });

function SectionHeading() {
  return (
    <div className="flex items-center gap-4">
      <WrenchIcon className="h-6 w-6 md:h-10 md:w-10" />
      <TypewriterEffectSmooth
        className=""
        words={[
          { text: "Build" },
          { text: "your" },
          {
            text: "Home",
            className: "text-blue-700 dark:text-blue-800",
          },
          {
            text: "Theater",
            className: "text-indigo-700 dark:text-indigo-800",
          },
        ]}
      />
    </div>
  );
}

function Popup({
  isOpen,
  setIsOpen,
  item,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: Item | null;
}) {
  if (!item) return null;
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>{item.name}</DialogTitle>
      <DialogDescription>{item.description}</DialogDescription>
      <DialogBody className="space-y-4">
        <div className="space-x-2 space-y-2">
          <Text>
            <Strong>Quantity:</Strong>
          </Text>
          <Badge color={badgeColors[item.quantity]}>{item.quantity}</Badge>
        </div>
        <div className="space-x-2 space-y-2">
          <Text>
            <Strong>Type:</Strong>
          </Text>
          <Badge color={badgeColors[item.type]}>{item.type}</Badge>
        </div>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setIsOpen(false)}>Also cancel lol</Button>
      </DialogActions>
    </Dialog>
  );
}

function BuildTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <Table
      striped
      dense
      className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
    >
      <Popup isOpen={isOpen} setIsOpen={setIsOpen} item={selectedItem} />
      <TableHead>
        <TableRow>
          <TableHeader>Component</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Selection</TableHeader>
          <TableHeader>Recommended</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Link</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Badge color={badgeColors[item.type]}>{item.type}</Badge>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(true);
                }}
              >
                <PlusIcon />
                Add {item.name}
                {item.quantity === "pair" ? " pair" : ""}
                {item.quantity === "multiple" ? "s" : ""}
              </Button>
            </TableCell>
            <TableCell className="space-x-2">
              <Badge color="yellow">Works with setup</Badge>
            </TableCell>
            <TableCell>$100</TableCell>
            <TableCell>
              <TextLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                View on Amazon
              </TextLink>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function BuildPage() {
  return (
    <div className="max-w-6xl w-full space-y-4 md:space-y-6 lg:space-y-8">
      <SectionHeading />
      <BuildCard />
      {/* for now we will dynamically change config based on components */}
      {/* <Configurations />  */}
      <BuildTable />
    </div>
  );
}
