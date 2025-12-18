import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { playerSchema } from '@/types/Schemas/playerSchema';

export async function GET() {
	const players = await prisma.players.findMany({
		include: {
			team: true,
		},
		orderBy: {
			name: 'asc',
		},
	});
	return NextResponse.json(players);
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const validation = playerSchema.omit({ id: true }).safeParse(body);

		if (!validation.success) {
			return NextResponse.json(validation.error, { status: 400 });
		}

		const newPlayer = await prisma.players.create({
			data: validation.data,
		});

		return NextResponse.json(newPlayer, { status: 201 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
