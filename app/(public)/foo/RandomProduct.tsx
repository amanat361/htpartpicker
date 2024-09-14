"use client";

import React, { useState, useCallback } from "react";
import { createHash } from "@/utils/hash";
import { Tables } from "@/database.types";
import Link from "next/link";
import { Button } from "@/components/primitives/button";

interface RandomProductHashLinkProps {
  products: Tables<"crutchfield">[];
}

export function RandomProductHashLink({
  products,
}: RandomProductHashLinkProps) {
  const [hash, setHash] = useState<string>("");

  const generateNewHash = useCallback(() => {
    const randomProducts = getRandomProducts(products, 10);
    const productIds = randomProducts.map((product) => product.id);
    const newHash = createHash(productIds);
    setHash(newHash);
  }, [products]);

  return (
    <div>
      <Button onClick={generateNewHash}>Generate New Hash</Button>
      {hash && (
        <div>
          <p>Generated Hash:</p>
          <Link href={`/config/${hash}`} target="_blank">{hash}</Link>
        </div>
      )}
    </div>
  );
}

function getRandomProducts(
  products: Tables<"crutchfield">[],
  count: number
): Tables<"crutchfield">[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
