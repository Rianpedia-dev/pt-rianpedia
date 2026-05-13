import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(invoices).orderBy(invoices.createdAt);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await db.insert(invoices).values({
      projectId: body.projectId,
      milestoneId: body.milestoneId || null,
      invoiceNumber: body.invoiceNumber,
      amount: body.amount,
      taxAmount: body.taxAmount || "0",
      totalAmount: body.totalAmount,
      paymentStatus: body.paymentStatus || "pending",
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      notes: body.notes || null,
      paymentMethod: body.paymentMethod || null,
    }).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
