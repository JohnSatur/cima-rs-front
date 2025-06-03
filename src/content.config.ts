import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';
import { file } from 'astro/loaders';
import { DealType, ConstructionType } from '@/types/property.enum';

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

// Schema base para todas las propiedades
const basePropertySchema = z.object({
  id: z.string(),
  address: z.object({
    street: z.string().optional(),
    intNumber: z.string().optional(),
    extNumber: z.string().optional(),
    neighborhood: z.string(),
    zipCode: z.number(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
  description: z.string().optional(),
  price: z.number().min(0),
  landArea: z.number().min(0).optional(),
  dealType: z.enum([DealType.VENTA, DealType.RENTA]),
  services: z.array(z.string()).optional(),
  location: z.object({
    longitude: z.number(),
    latitude: z.number(),
  }).optional(),
  notes: z.string().optional(),
  commissionPercentage: z.number().min(0).max(100).optional(),
  ownerName: z.string().optional(),
  featured: z.boolean().default(false),
  coverImage: z.string().default('src/assets/img/no-images.jpg'),
  images: z.array(z.string()).default([]),
});

// Schema específico para construcciones
const constructionCollection = defineCollection({
  loader: file('./src/data/constructions.json'),
  schema: basePropertySchema.extend({
    rooms: z.number().min(0).optional(),
    bathrooms: z.number().min(0).optional(),
    builtArea: z.number().min(0).optional(),
    floors: z.number().min(1).optional(),
    equipment: z.array(z.string()).optional(),
    finishes: z.string().optional(),
    furnished: z.boolean().optional(),
    constructionStyle: z.string().optional(),
    private: z.boolean().default(false),
    constructionYear: z.number().max(new Date().getFullYear()).optional(),
    constructionType: z.enum([
      ConstructionType.CASA,
      ConstructionType.DEPARTAMENTO,
      ConstructionType.LOFT,
      ConstructionType.LOCAL_COMERCIAL,
      ConstructionType.EDIFICIO,
      ConstructionType.OFICINA,
    ]),
  })
});

export const collections = {
  posts: postsCollection,
  authors: authorsCollection,
  constructions: constructionCollection,
};
