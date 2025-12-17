import { z } from 'zod';

export const teamSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(100),
  logoUrl: z.string().url().optional().nullable(),
});

export type TeamSchema = z.infer<typeof teamSchema>;