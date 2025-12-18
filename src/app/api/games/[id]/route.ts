import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const gameId = Number(params.id);

  if (Number.isNaN(gameId)) {
    return NextResponse.json(
      { error: 'Invalid ID' },
      { status: 400 }
    );
  }

  const game = await prisma.games.findUnique({
    where: { id: gameId },
  });

  if (!game) {
    return NextResponse.json(
      { error: 'Game not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(game);
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const gameId = Number(params.id);

  if (Number.isNaN(gameId)) {
    return NextResponse.json(
      { error: 'Invalid ID' },
      { status: 400 }
    );
  }

  try {
    await prisma.games.delete({
      where: { id: gameId },
    });

    return NextResponse.json(
      { message: 'Game deleted successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Error deleting game' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const gameId = Number(params.id);
  
  if (Number.isNaN(gameId)) {
    return NextResponse.json(
      { error: 'Invalid ID' },
      { status: 400 }
    );
  }
  const data = await request.json();
  
  try {
    const updatedGame = await prisma.games.update({
      where: { id: gameId },
      data,
    });

    return NextResponse.json(updatedGame);
  } catch {
    return NextResponse.json(
      { error: 'Error updating game' },
      { status: 500 }
    );
  }
}
