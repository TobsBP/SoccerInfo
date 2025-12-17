import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { teamSchema } from "@/types/Schemas/teamSchema";

export async function GET() {
  const teams = await prisma.teams.findMany();
  return NextResponse.json(teams);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = teamSchema.omit({ id: true }).safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    const newTeam = await prisma.teams.create({
      data: validation.data,
    });

    return NextResponse.json(newTeam, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
