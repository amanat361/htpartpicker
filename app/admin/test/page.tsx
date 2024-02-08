"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import { useState } from "react";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { PlusIcon } from "@heroicons/react/16/solid";
import { TextLink } from "@components/text";
import Failure from "../add/components/Failure";

import { scrapeLink, Product } from "./productScraper";
import { Badge } from "@/app/components/badge";

import ScrapedProducts from "./ScrapedProducts";

type ScrapeLink = {
  url: string;
  scraping: boolean;
  hasError: boolean;
  message: string;
  products: Product[];
};

export default function LinkQueue() {
  const [links, setLinks] = useState<ScrapeLink[]>([]);
  const [newLink, setNewLink] = useState("");
  const [message, setMessage] = useState("");

  const addLink = async () => {
    if (links.some((link) => link.url === newLink)) {
      setMessage("URL already in queue!");
      return;
    }
    let newScrapeLink = {
      url: newLink,
      scraping: true,
      hasError: false,
      message: "Waiting for data from server...",
      products: [],
    } as ScrapeLink;
    setLinks((links) => [...links, newScrapeLink]);
    setNewLink("");
    setMessage("");
    const { hasError, message, products } = await scrapeLink(newLink);
    newScrapeLink.scraping = false;
    newScrapeLink.hasError = hasError;
    newScrapeLink.message = message;
    newScrapeLink.products = products;
    setLinks((links) => [...links.filter((link) => link.url !== newLink), newScrapeLink]);
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
        <ScrapedProducts category="Testing" products={links.flatMap((link) => link.products)} />
      )}
    </div>
  );
}
