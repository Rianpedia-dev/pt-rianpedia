import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { aiRecommendationLogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(aiRecommendationLogs).where(eq(aiRecommendationLogs.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
