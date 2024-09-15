"use client";

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/primitives/dialog";
import { Button } from "@/components/primitives/button";
import { Tables } from "@/database.types";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { ProductCard } from "./[hash]/ProductDisplay";

interface ProductSelectionProps {
  products: Tables<"crutchfield">[];
  category: string;
}

export default function ProductSelection({ category, products }: ProductSelectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} outline>
        <PlusCircleIcon />
        Add your {category}
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} size="4xl">
        <DialogTitle>Add your {category}</DialogTitle>
        <DialogDescription>
          Select the products you want to add to your selection.
        </DialogDescription>
        <DialogBody>
          <div className="space-y-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
