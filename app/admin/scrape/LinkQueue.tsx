import { validateUrl } from "@utils/helperFunctions";
import { useState } from "react";
import { Field, FieldGroup, Label } from "@components/fieldset";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Text, TextLink } from "@components/text";

import { scrapeLink, Product } from "./productScraper";

type ScrapeLink = {
  url: string;
  scraping: boolean;
  hasError: boolean;
  message: string;
  products: Product[];
}

export default function LinkQueue() {
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");

  const addLink = () => {
    if (!validateUrl(newLink)) return;
    setLinks([...links, newLink]);
    setNewLink("");
  }

  return (
    <FieldGroup>
      <Field>
        <Label>Add a URL to the queue</Label>
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
      </Field>
      <input type="hidden" name="urls" value={links.join(",")} />
      <Text>Links to be scraped:</Text>
      <ol className="list-decimal pl-4 mb-4">
        {links.length > 0 &&
          links.map((link) => (
            <li key={link} className="mb-2">
              <TextLink href={link} target="_blank">
                {link}
              </TextLink>
            </li>
          ))}
      </ol>
    </FieldGroup>
  );
}
