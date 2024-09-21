"use server";

import { streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { ProductCard } from "../config/[hash]/ProductCard";
import { queryParams } from "./types";
import { queryProducts } from "./queryProducts"; // Import the new query function

const systemPrompt = `
You are an AI assistant for an audio equipment store. Your task is to interpret user queries about audio products and return relevant results from the database. 

The database schema is as follows:
- id: int8 (primary key)
- category: text
- title: text
- brand: text
- item_no: text
- subtitle: text
- price: numeric
- stock_status: text
- key_features: text
- photo_url: text
- average_rating: numeric
- rating_count: int4
- product_url: text

Interpret the user's query and use the queryProducts function to fetch relevant results. Then, present the results using the ProductCard component for each product.
`;

const LoadingComponent = () => (
  <div className="animate-pulse p-4">Searching for products...</div>
);

export async function streamComponent(userQuery: string) {
  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    prompt: `User query: "${userQuery}"\n\nBased on this query, fetch and display relevant products.`,
    system: systemPrompt,
    text: ({ content }) => <div>{content}</div>,
    tools: {
      queryProducts: {
        description: "Query the product database based on user input",
        parameters: queryParams,
        generate: async function* (params) {
          yield <LoadingComponent />;

          try {
            const data = await queryProducts(params);

            if (!data || data.length === 0) {
              return <div>No products found matching your criteria.</div>;
            }

            return (
              <div className="space-y-4">
                {data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            );
          } catch (error) {
            return (
              <div>Error fetching products: {(error as Error).message}</div>
            );
          }
        },
      },
    },
  });

  return result.value;
}
