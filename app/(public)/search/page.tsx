"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { streamComponent } from "./actions";

export default function Page() {
  const [component, setComponent] = useState<React.ReactNode>();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          setComponent(await streamComponent(query));
          setIsLoading(false);
          inputRef.current?.focus();
        }}
        className="mb-4"
      >
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your product query"
          className="mb-2"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Products"}
        </Button>
      </form>
      <div>{component}</div>
    </div>
  );
}
