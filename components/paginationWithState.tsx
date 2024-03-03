import clsx from "clsx";
import type React from "react";
import { Button } from "./button";

export function PaginationPrevious({
  callback,
  disabled,
  children = "Previous",
}: {
  callback: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <span className="grow basis-0">
      <Button
        onClick={callback}
        disabled={disabled}
        plain
        aria-label="Previous page"
      >
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children}
      </Button>
    </span>
  );
}

export function PaginationNext({
  callback,
  disabled,
  children = "Next",
}: {
  callback: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <span className="flex grow basis-0 justify-end">
      <Button
        onClick={callback}
        disabled={disabled}
        plain
        aria-label="Next page"
      >
        {children}
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </span>
  );
}

export function PaginationPage({
  callback,
  children,
  current = false,
}: {
  callback: () => void;
  children: string;
  current?: boolean;
}) {
  return (
    <Button
      onClick={callback}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? "page" : undefined}
      className={clsx(
        "min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg",
        current && "before:bg-zinc-950/5 dark:before:bg-white/10"
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  );
}