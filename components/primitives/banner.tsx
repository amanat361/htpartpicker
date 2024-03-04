"use client";
import { XMarkIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type CommitData = {
  commit: {
    message: string;
  };
  html_url: string;
  stats: {
    total: number;
    additions: number;
    deletions: number;
  };
};

function MinusCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
    </svg>
  );
}

function PlusCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

export default function Banner({ data }: { data: CommitData }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <a
      href={data.html_url}
      target="_blank"
      className="flex flex-col sm:flex-row items-center sm:h-16 border border-black dark:border-white hover:cursor-pointer rounded-lg p-4 m-4 sm:gap-4 fixed bottom-0 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all group"
    >
      <div className="text-lg flex items-center gap-4 ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
            transform="scale(64)"
            className="fill-black dark:fill-white group-hover:fill-white dark:group-hover:fill-black transition-all"
          />
        </svg>
        <div>
          <h3 className="font-semibold text-sm">HT Part Picker Update</h3>
          <p className="text-sm text-gray-800 group-hover:text-gray-400 dark:text-gray-400 dark:group-hover:text-gray-800 transition-all">
            {data.commit.message}
          </p>
        </div>
      </div>
      <div className="flex gap-4 py-2 sm:py-0">
        <div className="flex items-center gap-2 text-emerald-700 group-hover:text-emerald-400 dark:text-emerald-400 dark:group-hover:text-emerald-700 transition-all">
          <PlusCircleIcon className="w-4 h-4" />
          <span className="text-sm">{data.stats.additions} Additions</span>
        </div>
        <div className="flex items-center gap-2 text-rose-700 group-hover:text-rose-400 dark:text-rose-500 dark:group-hover:text-rose-700 transition-all">
          <MinusCircleIcon className="w-4 h-4" />
          <span className="text-sm">{data.stats.deletions} Deletions</span>
        </div>
        <ArrowUpRightIcon className="w-5 h-5 group-hover:text-white dark:group-hover:text-black transition-all" />
      </div>
    </a>
  );
}