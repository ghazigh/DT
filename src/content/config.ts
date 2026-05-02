// landing_page/src/content/config.ts
import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    pain: z.array(z.object({ headline: z.string(), body: z.string(), source: z.string() })).length(3),
    whatItDoes: z.string(),
    howItWorks: z.array(z.object({ title: z.string(), body: z.string() })),
    capabilities: z.array(z.object({ title: z.string(), description: z.string(), stat: z.string().optional() })),
    useCases: z.array(z.object({ title: z.string(), body: z.string() })),
    proof: z.array(z.object({ value: z.string(), label: z.string(), note: z.string() })),
    pricingHint: z.string(),
    ctaLabel: z.string().default('Request a 30-min walkthrough')
  })
});

export const collections = { products };
