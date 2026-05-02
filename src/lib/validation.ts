// landing_page/src/lib/validation.ts
import { z } from 'zod';

export const INTERESTS = ['pilot', 'partnership', 'investment', 'press', 'other'] as const;
export type Interest = (typeof INTERESTS)[number];

export const pilotRequestSchema = z
  .object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(200),
    organization: z.string().min(2).max(200),
    role: z.string().min(2).max(200),
    interest: z.enum(INTERESTS),
    message: z.string().min(10).max(4000),
    honeypot: z.string().max(0).optional()
  })
  .strict();

export type PilotRequest = z.infer<typeof pilotRequestSchema>;
