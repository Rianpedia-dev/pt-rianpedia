import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(testimonials).orderBy(testimonials.order);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await db.insert(testimonials).values({
      name: body.name,
      role: body.role || null,
      content: body.content,
      rating: body.rating || 5,
      avatar: body.avatar || null,
      color: body.color || null,
      order: body.order || 0,
    }).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
