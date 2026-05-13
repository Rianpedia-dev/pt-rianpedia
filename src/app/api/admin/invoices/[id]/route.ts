import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await db.update(invoices).set({
      invoiceNumber: body.invoiceNumber,
      amount: body.amount,
      taxAmount: body.taxAmount,
      totalAmount: body.totalAmount,
      paymentStatus: body.paymentStatus,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      notes: body.notes,
      paymentMethod: body.paymentMethod,
      paidAt: body.paidAt ? new Date(body.paidAt) : null,
      updatedAt: new Date(),
    }).where(eq(invoices.id, id)).returning();
    if (!updated.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(invoices).where(eq(invoices.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
