import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { portfolios } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await db.update(portfolios).set({
      title: body.title,
      slug: body.slug,
      clientName: body.clientName,
      industry: body.industry,
      description: body.description,
      problem: body.problem,
      solution: body.solution,
      results: body.results,
      techStack: body.techStack,
      imageUrl: body.imageUrl,
      projectUrl: body.projectUrl,
      category: body.category,
      year: body.year,
      color: body.color,
      emoji: body.emoji,
      featured: body.featured,
      updatedAt: new Date(),
    }).where(eq(portfolios.id, id)).returning();
    if (!updated.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(portfolios).where(eq(portfolios.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
