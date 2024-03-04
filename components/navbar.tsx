"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/home-theater.png";
import Link from "next/link";
import { Button } from "@/components/primitives/button";
import { Input } from "./primitives/input";

const selectedMobilePage =
  "rounded-md bg-gray-900 block px-3 py-2 text-base font-medium text-white";
const unselectedMobilePage =
  "rounded-md block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-white";

const pages = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Build",
    href: "/build",
  },
  {
    name: "Guides",
    href: "/guides",
  },
  {
    name: "Community",
    href: "/community",
  },
  {
    name: "Products",
    href: "/products",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <Disclosure
      as="nav"
      className="bg-white dark:bg-black border-b-[1px] border-slate-300 dark:border-slate-700"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <Image
                    className="h-8 w-auto"
                    src={logo}
                    alt="HT Part Picker"
                  />
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    {pages.map((page) =>
                      pathname === page.href ? (
                        <Button key={page.name} href={page.href}>
                          {page.name}
                        </Button>
                      ) : (
                        <Button key={page.name} href={page.href} outline>
                          {page.name}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <Input
                    id="search"
                    name="search"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              {pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className={
                    pathname === page.href
                      ? selectedMobilePage
                      : unselectedMobilePage
                  }
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
