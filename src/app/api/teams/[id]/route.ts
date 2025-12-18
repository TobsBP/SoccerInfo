import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { teamSchema } from '@/types/Schemas/teamSchema';

export async function GET(
	_request: NextRequest,
	props: { params: Promise<{ id: string }> },
) {
	const params = await props.params;
	const teamId = parseInt(params.id, 10);

	if (Number.isNaN(teamId)) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	const team = await prisma.teams.findUnique({
		where: { id: teamId },
	});

	if (!team) {
		return NextResponse.json({ error: 'Team not found' }, { status: 404 });
	}

	return NextResponse.json(team);
}

export async function PUT(
	request: NextRequest,
	props: { params: Promise<{ id: string }> },
) {
	try {
		const params = await props.params;
		const teamId = parseInt(params.id, 10);

		if (Number.isNaN(teamId)) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
		}

		const body = await request.json();

		if (!body) {
			return NextResponse.json({ error: 'No data provided' }, { status: 400 });
		}

		const validation = teamSchema.omit({ id: true }).safeParse(body);

		if (!validation.success) {
			return NextResponse.json(validation.error, { status: 400 });
		}

		const updatedTeam = await prisma.teams.update({
			where: { id: teamId },
			data: validation.data,
		});

		return NextResponse.json(updatedTeam);
	} catch {
		return NextResponse.json({ error: 'Error updating team' }, { status: 500 });
	}
}

export async function DELETE(
	_request: NextRequest,
	props: { params: Promise<{ id: string }> },
) {
	try {
		const params = await props.params;
		const teamId = parseInt(params.id, 10);

		if (Number.isNaN(teamId)) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
		}

		await prisma.teams.delete({
			where: { id: teamId },
		});

		return new NextResponse(null, { status: 204 });
	} catch {
		return NextResponse.json({ error: 'Error deleting team' }, { status: 500 });
	}
}
