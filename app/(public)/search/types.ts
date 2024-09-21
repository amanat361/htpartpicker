import { z } from "zod";

export const queryParams = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minRating: z.number().optional(),
  maxRating: z.number().optional(),
  minNumberOfReviews: z.number().optional(),
  maxNumberOfReviews: z.number().optional(),
  brand: z.string().optional(),
  limit: z.number().default(10),
});

export type QueryParams = z.infer<typeof queryParams>;