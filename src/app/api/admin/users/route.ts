import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allUsers = await db.select().from(users).orderBy(users.createdAt);
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newUser = await db.insert(users).values({
      email: body.email,
      name: body.name,
      avatarUrl: body.avatarUrl || null,
      role: body.role || "client",
    }).returning();
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error: any) {
    if (error?.message?.includes("unique")) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
