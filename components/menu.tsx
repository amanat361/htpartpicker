import {
  WrenchIcon,
  PlusCircleIcon,
  MagnifyingGlassCircleIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "./button";

const actions = [
  {
    title: "Build your Theater",
    description:
      "The current build tool is a work in progress but you can preview it here.",
    href: "/build",
    icon: WrenchIcon,
    iconForeground: "text-teal-700 dark:text-teal-50",
    iconBackground: "bg-teal-50 dark:bg-teal-700",
  },
  {
    title: "Add products",
    description:
      "Add products to the database for use in your builds. Admins only.",
    href: "/admin/add",
    icon: PlusCircleIcon,
    iconForeground: "text-cyan-700 dark:text-cyan-50",
    iconBackground: "bg-cyan-50 dark:bg-cyan-700",
  },
  {
    title: "Scrape products",
    description:
      "Use the expirimental scraping tool for bulk inserts. Admins only.",
    href: "/admin/scrape",
    icon: MagnifyingGlassCircleIcon,
    iconForeground: "text-amber-700 dark:text-amber-50",
    iconBackground: "bg-amber-50 dark:bg-amber-700",
  },
  {
    title: "View on GitHub",
    description: "View the source code and contribute to the project.",
    href: "https://github.com/amanat361/htpartpicker",
    icon: CodeBracketIcon,
    iconForeground: "text-purple-700 dark:text-purple-50",
    iconBackground: "bg-blue-50 dark:bg-blue-100",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Menu() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action, actionIdx) => (
        <Button href={action.href} key={action.title} color="blue">
          <action.icon />
          {action.title}
        </Button>
      ))}
    </div>
  )
}