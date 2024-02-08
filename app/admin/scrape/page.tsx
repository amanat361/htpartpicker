"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import { useEffect, useRef, useState } from "react";
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
  const activeScrapesRef = useRef(new Set<string>());

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

    // Reset input and message state
    setNewLink("");
    setMessage("");
  };

  useEffect(() => {
    links.forEach((link) => {
      // Check if the link needs scraping and hasn't been processed yet
      if (link.scraping && !activeScrapesRef.current.has(link.url)) {
        activeScrapesRef.current.add(link.url); // Mark as in progress

        scrapeLink(link.url)
          .then(({ hasError, message, products }) => {
            // Successful scraping, update the link with the results
            setLinks((currentLinks) =>
              currentLinks.map((l) =>
                l.url === link.url
                  ? { ...l, scraping: false, hasError, message, products }
                  : l
              )
            );
          })
          .catch((error) => {
            // Handle errors in scraping
            setLinks((currentLinks) =>
              currentLinks.map((l) =>
                l.url === link.url
                  ? {
                      ...l,
                      scraping: false,
                      hasError: true,
                      message: "Error during scraping",
                    }
                  : l
              )
            );
          })
          .finally(() => {
            activeScrapesRef.current.delete(link.url); // Remove from in-progress tracking
          });
      }
    });
  }, [links]); // Dependency array includes 'links' to re-run when it changes

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
