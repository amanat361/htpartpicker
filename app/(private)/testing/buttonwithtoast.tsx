"use client";

import { toast } from "sonner";
import { Button } from "@/components/primitives/button";

export default function ButtonWithToast() {
  return <Button onClick={() => toast("Testing!")}>Send toast</Button>;
}
