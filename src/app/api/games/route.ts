import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { gameSchema } from '@/types/Schemas/gameSchema';

export async function GET() {
	const games = await prisma.games.findMany({
		include: {
			homeTeam: true,
			awayTeam: true,
		},
		orderBy: {
			date: 'desc',
		},
	});
	return NextResponse.json(games);
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		if (typeof body.date === 'string') {
			body.date = new Date(body.date);
		}

		const validation = gameSchema.omit({ id: true }).safeParse(body);

		if (!validation.success) {
			return NextResponse.json(validation.error, { status: 400 });
		}

		const newGame = await prisma.games.create({
			data: validation.data,
		});

		return NextResponse.json(newGame, { status: 201 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
