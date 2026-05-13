import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { aiRecommendationLogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(aiRecommendationLogs).orderBy(aiRecommendationLogs.createdAt);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
