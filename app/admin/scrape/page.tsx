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

import type { Product, ResponseJson } from "@/app/api/scrape/route";
import { useRef, useState } from "react";

import Failure from "../add/components/Failure";
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

  const addLink = () => {
    if (links.some((link) => link.url === newLink) || !newLink.trim()) {
      setMessage("URL already in queue or empty!");
      return;
    }

    const newScrapeLink = {
      url: newLink,
      scraping: true,
      hasError: false,
      message: "Waiting to start scraping...",
      products: [],
    };

    // Add the new link to the list
    setLinks((prevLinks) => [...prevLinks, newScrapeLink]);

    // Fetch /api/scrape to start scraping the new link
    fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: newLink }),
    })
      // check status
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to scrape the URL!");
      })
      // update the link state with the response
      .then((data: ResponseJson) => {
        const link = links.find((link) => link.url === newScrapeLink.url);
        setMessage(newScrapeLink.url);
        if (link) {
          link.scraping = false;
          link.hasError = false;
          link.message = data.message;
          link.products = data.products;
          setLinks((prevLinks) =>
            prevLinks.map((l) => (l.url === newScrapeLink.url ? link : l))
          );
        }
      })
      // handle errors
      .catch((error) => {
        setMessage(error.message);
      });

    // Reset input and message state
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
