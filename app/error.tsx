"use client";

import { Button } from "@/components/primitives/button";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { Text } from "@/components/primitives/text";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl text-rose-600">Hii~~ uWu we have an oopsie woopsie!!! xpp</h1>
      <h1>That&apos;s not vewy kawaii, but we are working sooper dooper fast to fix da wittle issue!</h1>
      <Text>*starts twerking*</Text>
      <img
        className="rounded-xl"
        src="https://preview.redd.it/upvote-for-bring-back-the-wide-buh-and-remove-the-slim-one-v0-t1m5ahgp7uvb1.jpg?auto=webp&s=04a5bfc3e8458e19a668c0532832658e7608dea9"
        alt="Error image of funny cat"
      />
      <Text>Error Message: {error.message}</Text>
      <Button onClick={() => reset()}>
        Try again (sorry!)
        <ArrowUturnLeftIcon />
      </Button>
    </div>
  );
}
