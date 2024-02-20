/* eslint-disable @next/next/no-img-element */
import {
  WrenchIcon,
  PlusCircleIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import GithubSVG from "@/public/github.svg";

const GithubIcon = () => {
  return <img src={GithubSVG.src} alt="GitHub" className="h-6 w-6" />;
} 

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
    icon: GithubIcon,
    iconForeground: "text-purple-700 dark:text-purple-50",
    iconBackground: "bg-blue-50 dark:bg-blue-100",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Menu() {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 dark:bg-black dark:divide-black">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0
              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
              : "",
            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
            actionIdx === actions.length - 1
              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
              : "",
            "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 dark:bg-slate-800"
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                "inline-flex rounded-lg p-3"
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              <a href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </a>
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {action.description}
            </p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400 dark:text-zinc-400 dark:group-hover:text-zinc-300"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}
