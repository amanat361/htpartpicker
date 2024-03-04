"use client";

import { Button } from "@/components/primitives/button";
import { useState } from "react";

export default function ButtonWithError() {
  const [error, setError] = useState(false);
  if (error) {
    throw new Error("fake error for testing purposes");
  }
  return <Button onClick={() => setError(true)}>Throw Error</Button>;
}
