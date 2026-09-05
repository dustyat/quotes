import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const memos = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*', '!**/_*/**'], base: './src/content/memos' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date().optional().default(() => new Date()),
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
    translations: z.record(z.string(), z.object({
      content: z.string(),
      source: z.string().optional(),
    })).optional().default({}),
  }),
});

export const collections = {
  memos,
};
