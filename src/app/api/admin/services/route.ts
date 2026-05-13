import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(services).orderBy(services.order);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await db.insert(services).values({
      id: body.id,
      title: body.title,
      subtitle: body.subtitle || null,
      description: body.description || null,
      features: body.features || null,
      packages: body.packages || null,
      color: body.color || null,
      gradient: body.gradient || null,
      emoji: body.emoji || null,
      order: body.order || 0,
    }).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
