import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { playerSchema } from '@/types/Schemas/playerSchema';

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const playerId = parseInt(id, 10);

		if (Number.isNaN(playerId)) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
		}

		const player = await prisma.players.findUnique({
			where: { id: playerId },
			include: {
				team: true,
			},
		});

		if (!player) {
			return NextResponse.json({ error: 'Player not found' }, { status: 404 });
		}

		return NextResponse.json(player);
	} catch (_error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const playerId = parseInt(id, 10);

		if (Number.isNaN(playerId)) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
		}

		const body = await request.json();

		const validation = playerSchema.safeParse(body);

		if (!validation.success) {
			return NextResponse.json(validation.error, { status: 400 });
		}

		// Check if player exists
		const existingPlayer = await prisma.players.findUnique({
			where: { id: playerId },
		});

		if (!existingPlayer) {
			return NextResponse.json({ error: 'Player not found' }, { status: 404 });
		}

		const updatedPlayer = await prisma.players.update({
			where: { id: playerId },
			data: validation.data,
		});

		return NextResponse.json(updatedPlayer);
	} catch (_error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const playerId = parseInt(id, 10);

		if (Number.isNaN(playerId)) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
		}

		// Check if player exists
		const existingPlayer = await prisma.players.findUnique({
			where: { id: playerId },
		});

		if (!existingPlayer) {
			return NextResponse.json({ error: 'Player not found' }, { status: 404 });
		}

		await prisma.players.delete({
			where: { id: playerId },
		});

		return NextResponse.json({ message: 'Player deleted successfully' });
	} catch (_error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
