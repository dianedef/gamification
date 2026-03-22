import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    section: z.string().optional(),
    order: z.number().default(999),
    prev: z
      .object({
        text: z.string(),
        link: z.string(),
      })
      .optional(),
    next: z
      .object({
        text: z.string(),
        link: z.string(),
      })
      .optional(),
  }),
});

export const collections = { docs };
