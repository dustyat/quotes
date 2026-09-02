import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const memos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memos' }),
  schema: z.object({
    date: z.coerce.date(),
    pinned: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    source: z.string().optional(),
    mood: z.string().optional(),
    author: z.object({
      name: z.string(),
      handle: z.string().optional(),
      avatar: z.string().optional(),
    }).optional(),
    likes: z.number().optional().default(0),
  }),
});

export const collections = {
  memos,
};
