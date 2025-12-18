import { z } from 'zod';

export const teamSchema = z.object({
	id: z.number().int(),
	name: z.string().min(1).max(100),
	logoUrl: z.string().url().optional().nullable(),
	foundedYear: z.coerce
		.number()
		.int()
		.min(1800)
		.max(new Date().getFullYear())
		.optional()
		.nullable(),
	stadium: z.string().max(100).optional().nullable(),
	city: z.string().max(100).optional().nullable(),
	state: z.string().max(100).optional().nullable(),
	country: z.string().max(100).default('Brasil'),
	titlesTotal: z.coerce.number().int().min(0).default(0),
	titlesLeague: z.coerce.number().int().min(0).default(0),
	titlesCup: z.coerce.number().int().min(0).default(0),
	titlesIntl: z.coerce.number().int().min(0).default(0),
	colors: z.string().max(50).optional().nullable(),
	website: z.string().url().optional().nullable(),
	socialMedia: z.string().max(255).optional().nullable(),
});

export type TeamSchema = z.infer<typeof teamSchema>;
