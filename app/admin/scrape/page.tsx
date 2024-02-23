"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PlusIcon, SparklesIcon } from "@heroicons/react/16/solid";
import { TextLink } from "@/components/text";
import { Badge } from "@/components/badge";
import { product_links_from_crutchfield } from "@/lib/links";
import "ldrs/lineSpinner"; // Default values shown

import type { ScrapeLink } from "@/app/api/scrape/route";
import { FormEvent, useEffect, useState, useRef } from "react";

import ProductTable from "./ProductTable";

export default function LinkQueue() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [links, setLinks] = useState<ScrapeLink[]>([]);
  const [newLink, setNewLink] = useState("");
  const [message, setMessage] = useState("");

  async function randomizeLink() {
    if (!product_links_from_crutchfield.length) {
      setMessage("No more links to scrape");
      return;
    }
    const randomIndex = Math.floor(
      Math.random() * product_links_from_crutchfield.length
    );
    setNewLink(product_links_from_crutchfield[randomIndex]);
    product_links_from_crutchfield.splice(randomIndex, 1);
    inputRef.current?.focus();
  }

  const addLink = (e: FormEvent) => {
    e.preventDefault();

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

  useEffect(() => {
    async function getLoader() {
      const { mirage, quantum } = await import("ldrs");
      mirage.register();
      quantum.register();
    }
    getLoader();
  }, []);

  return (
    <div className="max-w-6xl w-full space-y-8">
      <h1 className="text-md font-bold">Add a URL to the queue</h1>
      <form onSubmit={addLink} className="flex gap-2 items-center mt-2">
        <Input
          ref={inputRef}
          name="url"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
        <Button color="indigo" onClick={randomizeLink}>
          <SparklesIcon />
          Random
        </Button>
        <Button color="lime" type="submit">
          <PlusIcon />
          Scrape
        </Button>
      </form>
      {message && <Badge color="red">{message}</Badge>}
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
                    <l-mirage color="white"></l-mirage>
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
        <ProductTable
          category="Testing"
          products={links.flatMap((link) => link.products)}
        />
      )}
    </div>
  );
}
