import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: reference('authors'),
    slug: z.string(),
    image: image().optional(),
    tags: z.array(z.string()).optional(),
    relatedPosts: z.array(reference('posts')).optional(),
  }),
});

const authorsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    bio: z.string(),
    email: z.string().email(),
    role: z.enum(['Agente - CIMA Bienes Raíces']),
    headshot: image().optional().default({
      src: '/images/default-headshot.jpg',
      width: 280,
      height: 280,
      format: 'jpg',
    }),
  })
});

export const collections = {
  posts: postsCollection,
  authors: authorsCollection
};
