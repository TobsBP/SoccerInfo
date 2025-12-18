import { z } from 'zod';

export const playerSchema = z.object({
	id: z.number().int(),
	name: z.string().min(1).max(100),
	position: z.string().max(50).optional().nullable(),
	number: z.coerce.number().int().min(0).max(99).optional().nullable(),
	teamId: z.coerce.number().int().optional().nullable(),
	lastTeams: z.array(z.string().max(100)).optional().nullable(),
	imageUrl: z.url().optional().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type PlayerSchema = z.infer<typeof playerSchema>;
