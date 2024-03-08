"use client";

import { z } from "zod";
import { Input } from "@/components/primitives/input";
import { useState } from "react";
import { Button } from "@/components/primitives/button";
import { toastResult } from "@/database/helpers";

export default function ZodTesting() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg">Zod Testing</h2>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        onClick={() => {
          const result = z.coerce.number().min(5).max(7).multipleOf(3).safeParse(value);
          toastResult(result);
        }}
      >
        Parse number
      </Button>
    </div>
  );
}
