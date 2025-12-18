import { z } from 'zod';

export const gameSchema = z.object({
	id: z.number().int(),
	date: z.date(),
	homeTeamId: z.number().int(),
	awayTeamId: z.number().int(),
	homeScore: z.number().int().default(0),
	awayScore: z.number().int().default(0),
	finished: z.boolean().default(false),
});
