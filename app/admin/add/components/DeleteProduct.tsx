"use client";

import { deleteProductAndRevalidate } from "@/app/database/actions";
import { useState } from "react";
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from "@components/alert";
import { Button } from "@components/button";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/16/solid";

export default function DeleteProductComponent({
  product_id,
}: {
  product_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="button" color="red" onClick={() => setIsOpen(true)}>
        <TrashIcon />
        Delete
      </Button>
      <Alert open={isOpen} onClose={setIsOpen}>
        <AlertTitle>Are you sure you want to delete this product?</AlertTitle>
        <AlertDescription>
          This action will permanently delete this product from the database.
          This action cannot be undone.
        </AlertDescription>
        <AlertActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              deleteProductAndRevalidate(product_id);
              setIsOpen(false);
            }}
          >
            <CheckCircleIcon />
            Permanently Delete Product
          </Button>
        </AlertActions>
      </Alert>
    </>
  );
}
