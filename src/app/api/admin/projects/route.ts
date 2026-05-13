import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allProjects = await db.select().from(projects).orderBy(projects.createdAt);
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newProject = await db.insert(projects).values({
      clientId: body.clientId,
      assignedDeveloperId: body.assignedDeveloperId || null,
      title: body.title,
      description: body.description || null,
      status: body.status || "inquiry",
      totalBudget: body.totalBudget || null,
      techStack: body.techStack || null,
      requirements: body.requirements || null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
    }).returning();
    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
