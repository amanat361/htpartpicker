"use client";

import { toast } from "sonner";
import { Button } from "@/components/primitives/button";

export default function TestingButtons() {
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => toast.success("Testing")}>Send success toast</Button>
      <Button onClick={() => toast.error("Testing")}>Send error toast</Button>
      <Button onClick={() => toast.warning("Testing")}>Send warning toast</Button>
      <Button onClick={() => toast.info("Testing")}>Send info toast</Button>
    </div>
  );
}
