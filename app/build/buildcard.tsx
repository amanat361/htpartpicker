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
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import React, { useEffect, useState } from "react";
import { beeMovie } from "./bee-movie";
import { Textarea } from "@/components/textarea";

function CopyToClipboardButton({ text }: { text: string }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    copyToClipboard(text);
    setCopied(true);
  }

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Button className="min-w-fit" onClick={handleCopy} color="emerald">
      <ClipboardDocumentIcon />
      <span className="hidden sm:block">{copied ? "Done!" : "Copy"}</span>
    </Button>
  );
}

function PreviewDialog({
  isOpen,
  setIsOpen,
  exportOption,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exportOption: "markdown" | "html" | "text" | "pdf" | "history" | null;
}) {
  if (!exportOption) return null;
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>Export your build as {exportOption}</DialogTitle>
      <DialogDescription>
        Copy the {exportOption} below to share your build with others.
      </DialogDescription>
      <DialogBody>
        <pre className="whitespace-pre-wrap">{beeMovie}</pre>
        {/* <Textarea value={beeMovie} rows={20} /> */}
      </DialogBody>
      <DialogActions>
        <Button color="blue">Copy</Button>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function BuildCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [exportOption, setExportOption] = useState<
    "markdown" | "html" | "text" | "pdf" | "history" | null
  >(null);

  useEffect(() => {
    if (exportOption) {
      setIsOpen(true);
    }
  }, [exportOption]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex space-x-2">
          <Input value="htpartpicker.com/builds/abcdef" />
          <CopyToClipboardButton text="testing" />
          <Button className="min-w-fit" color="blue">
            <ShareIcon />
            <span className="hidden sm:block">Share</span>
          </Button>
        </div>
        <div className="flex gap-2 w-full flex-wrap">
          <Button outline onClick={() => setExportOption("markdown")}>
            <DocumentTextIcon />
            <span className="hidden sm:block">Markdown</span>
          </Button>
          <Button outline onClick={() => setExportOption("html")}>
            <CodeBracketIcon />
            <span className="hidden sm:block">HTML</span>
          </Button>
          <Button outline onClick={() => setExportOption("text")}>
            <Bars3BottomLeftIcon />
            <span className="hidden sm:block">Text</span>
          </Button>
          <Button outline onClick={() => setExportOption("pdf")}>
            <PaperClipIcon />
            <span className="hidden sm:block">PDF</span>
          </Button>
          <Button outline onClick={() => setExportOption("history")}>
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
      <PreviewDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        exportOption={exportOption}
      />
    </>
  );
}
