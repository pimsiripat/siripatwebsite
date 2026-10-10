import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    // Omit to skip the hero block (e.g. a motion gallery that opens on its clips).
    heroImage: z.string().optional(),
    image: z.string(),
    // Looping clip shown in the hero instead of `heroImage`.
    heroVideo: z.string().optional(),
    // Looping clip shown in place of `image` on the project card (motion work).
    video: z.string().optional(),
    meta: z.record(z.string()),
    order: z.number(),
  }),
});

export const collections = { projects };
