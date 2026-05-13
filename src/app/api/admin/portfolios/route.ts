import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { portfolios } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(portfolios).orderBy(portfolios.createdAt);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await db.insert(portfolios).values({
      title: body.title,
      slug: body.slug,
      clientName: body.clientName || null,
      industry: body.industry || null,
      description: body.description || null,
      problem: body.problem || null,
      solution: body.solution || null,
      results: body.results || null,
      techStack: body.techStack || null,
      imageUrl: body.imageUrl || null,
      projectUrl: body.projectUrl || null,
      category: body.category || null,
      year: body.year || null,
      color: body.color || null,
      emoji: body.emoji || null,
      featured: body.featured || false,
    }).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
