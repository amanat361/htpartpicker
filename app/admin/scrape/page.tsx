"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { PlusIcon } from "@heroicons/react/16/solid";
import { TextLink } from "@components/text";
import { Badge } from "@/app/components/badge";

import type { ScrapeLink } from "@/app/api/scrape/route";
import { useState } from "react";

import Failure from "../add/components/Failure";
import ScrapedProducts from "./ScrapedProducts";

export default function LinkQueue() {
  const [links, setLinks] = useState<ScrapeLink[]>([]);
  const [newLink, setNewLink] = useState("");
  const [message, setMessage] = useState("");

  const addLink = () => {
    if (links.some((link) => link.url === newLink)) {
      setMessage("URL already in queue");
      return;
    }

    if (!newLink.trim()) {
      setMessage("URL cannot be empty");
      return;
    }

    const newScrapeLink = {
      url: newLink,
      scraping: true,
      hasError: false,
      message: "Processing...",
      products: [],
    } as ScrapeLink;

    setLinks((prevLinks) => [...prevLinks, newScrapeLink]);

    fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newScrapeLink),
    })
      .then((res) => res.json() as Promise<ScrapeLink>)
      .then((data) => {
        setLinks((prevLinks) =>
          prevLinks.map((link) => (link.url === data.url ? data : link))
        );
      })
      .catch((error) => {
        const newErrorLink = {
          url: newLink,
          scraping: false,
          hasError: true,
          message: "Server error :(",
          products: [],
        } as ScrapeLink;
        setLinks((prevLinks) =>
          prevLinks.map((link) => (link.url === newLink ? newErrorLink : link))
        );
      });

    setNewLink("");
    setMessage("");
  };

  return (
    <div className="max-w-6xl w-full space-y-8">
      <h1 className="text-md font-bold">Add a URL to the queue</h1>
      <div className="flex gap-2 items-center mt-2">
        <Input
          name="url"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
        <Button color="emerald" onClick={addLink}>
          <PlusIcon />
        </Button>
      </div>
      {message && <Failure errorMessage={message} />}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>URL</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Message</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.length > 0 &&
            links.map((link) => (
              <TableRow key={link.url}>
                <TableCell>
                  <TextLink href={link.url} target="_blank">
                    {link.url}
                  </TextLink>
                </TableCell>
                <TableCell>
                  {link.scraping ? (
                    <Badge color="blue">Loading...</Badge>
                  ) : (
                    <Badge color="violet">Finished</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {link.hasError ? (
                    <Badge color="red">{link.message}</Badge>
                  ) : (
                    <Badge color="green">{link.message}</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {links.length > 0 && (
        <ScrapedProducts
          category="Testing"
          products={links.flatMap((link) => link.products)}
        />
      )}
    </div>
  );
}
