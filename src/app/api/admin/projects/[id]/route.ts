import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await db
      .update(projects)
      .set({
        title: body.title,
        description: body.description,
        status: body.status,
        totalBudget: body.totalBudget,
        techStack: body.techStack,
        requirements: body.requirements,
        assignedDeveloperId: body.assignedDeveloperId || null,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        progressPercentage: body.progressPercentage,
        repositoryUrl: body.repositoryUrl,
        stagingUrl: body.stagingUrl,
        productionUrl: body.productionUrl,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();
    if (!updated.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
