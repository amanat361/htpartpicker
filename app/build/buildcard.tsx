"use client";

import {
  ClipboardDocumentIcon,
  ShareIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  PaperClipIcon,
  ClockIcon,
  Bars3BottomLeftIcon,
  CheckBadgeIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useEffect, useState } from "react";

export default function BuildCard() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copiedText) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copiedText]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex space-x-2">
        <Input value="htpartpicker.com/builds/abcdef" />
        <Button
          className="min-w-fit"
          onClick={() => copyToClipboard("htpartpicker.com/builds/abcdef")}
        >
          <ClipboardDocumentIcon />
          <span className="hidden sm:block">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </Button>
        <Button className="min-w-fit">
          <ShareIcon />
          <span className="hidden sm:block">Share Link</span>
        </Button>
      </div>
      <div className="flex gap-2 w-full flex-wrap">
        <Button outline>
          <DocumentTextIcon />
          <span className="hidden sm:block">Markdown</span>
        </Button>
        <Button outline>
          <CodeBracketIcon />
          <span className="hidden sm:block">HTML</span>
        </Button>
        <Button outline>
          <Bars3BottomLeftIcon />
          <span className="hidden sm:block">Text</span>
        </Button>
        <Button outline>
          <PaperClipIcon />
          <span className="hidden sm:block">PDF</span>
        </Button>
        <Button outline>
          <ClockIcon />
          <span className="hidden sm:block">History</span>
        </Button>
        <div className="w-full sm:w-fit flex flex-col sm:flex-row gap-2 sm:justify-center sm:items-center">
          <Badge color="green">
            <CheckBadgeIcon className="w-4 h-4" />
            Your parts are compatible!
          </Badge>
          <Badge color="indigo">
            <InformationCircleIcon className="w-4 h-4" />
            Your build is currently set to public.
          </Badge>
        </div>
      </div>
    </div>
  );
}
