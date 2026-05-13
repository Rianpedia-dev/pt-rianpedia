"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Receipt, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Invoice = {
  id: string;
  invoiceNumber: string;
  amount: string;
  taxAmount: string | null;
  totalAmount: string;
  paymentStatus: string;
  dueDate: string | null;
  paidAt: string | null;
  notes: string | null;
  paymentMethod: string | null;
  projectId: string;
  createdAt: string;
  [key: string]: any;
};

const paymentStatusColors: Record<string, "default" | "success" | "warning" | "destructive"> = {
  pending: "warning",
  paid: "success",
  overdue: "destructive",
  cancelled: "destructive",
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [deletingInvoice, setDeletingInvoice] = useState<Invoice | null>(null);
  const [form, setForm] = useState({
    invoiceNumber: "", projectId: "", amount: "", taxAmount: "0", totalAmount: "",
    paymentStatus: "pending", dueDate: "", notes: "", paymentMethod: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [iRes, pRes] = await Promise.all([
        fetch("/api/admin/invoices"),
        fetch("/api/admin/projects"),
      ]);
      setInvoices(await iRes.json());
      setProjects(await pRes.json());
    } catch { toast.error("Gagal memuat data"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditingInvoice(null);
    setForm({ invoiceNumber: `INV-${Date.now()}`, projectId: "", amount: "", taxAmount: "0", totalAmount: "", paymentStatus: "pending", dueDate: "", notes: "", paymentMethod: "" });
    setDialogOpen(true);
  };

  const openEdit = (inv: Invoice) => {
    setEditingInvoice(inv);
    setForm({
      invoiceNumber: inv.invoiceNumber, projectId: inv.projectId, amount: inv.amount,
      taxAmount: inv.taxAmount || "0", totalAmount: inv.totalAmount,
      paymentStatus: inv.paymentStatus, dueDate: inv.dueDate ? new Date(inv.dueDate).toISOString().split("T")[0] : "",
      notes: inv.notes || "", paymentMethod: inv.paymentMethod || "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingInvoice ? `/api/admin/invoices/${editingInvoice.id}` : "/api/admin/invoices";
      const method = editingInvoice ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Gagal");
      toast.success(editingInvoice ? "Invoice diupdate" : "Invoice dibuat");
      setDialogOpen(false);
      fetchData();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async () => {
    if (!deletingInvoice) return;
    try {
      await fetch(`/api/admin/invoices/${deletingInvoice.id}`, { method: "DELETE" });
      toast.success("Invoice dihapus");
      setDeleteDialogOpen(false);
      fetchData();
    } catch { toast.error("Gagal menghapus"); }
  };

  const filtered = invoices.filter((i) => i.invoiceNumber.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-[#22D3EE]" /> Kelola Invoices
          </h2>
          <p className="text-[#9CA3AF] text-sm mt-1">{invoices.length} total invoices</p>
        </div>
        <Button onClick={openCreate} variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Buat Invoice
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <Input placeholder="Cari invoice..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02]">
              <TableHead>No. Invoice</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <TableRow key={i}><TableCell colSpan={6}><div className="h-8 bg-white/[0.04] rounded animate-pulse" /></TableCell></TableRow>)
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-[#9CA3AF]">Belum ada invoice</TableCell></TableRow>
            ) : filtered.map((inv) => (
              <TableRow key={inv.id} className="border-white/[0.04]">
                <TableCell className="font-medium text-white font-mono text-sm">{inv.invoiceNumber}</TableCell>
                <TableCell className="text-[#9CA3AF]">Rp {Number(inv.amount).toLocaleString("id-ID")}</TableCell>
                <TableCell className="text-white font-semibold">Rp {Number(inv.totalAmount).toLocaleString("id-ID")}</TableCell>
                <TableCell><Badge variant={paymentStatusColors[inv.paymentStatus] || "secondary"}>{inv.paymentStatus}</Badge></TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("id-ID") : "—"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(inv)}><Pencil className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setDeletingInvoice(inv); setDeleteDialogOpen(true); }} className="text-red-400 focus:text-red-400"><Trash2 className="w-4 h-4 mr-2" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingInvoice ? "Edit Invoice" : "Buat Invoice Baru"}</DialogTitle>
            <DialogDescription>Isi detail invoice</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>No. Invoice *</Label>
                <Input value={form.invoiceNumber} onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Project *</Label>
                <Select value={form.projectId} onValueChange={(v) => setForm({ ...form, projectId: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih project" /></SelectTrigger>
                  <SelectContent>{projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subtotal (Rp)</Label>
                <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Pajak (Rp)</Label>
                <Input type="number" value={form.taxAmount} onChange={(e) => setForm({ ...form, taxAmount: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Total (Rp) *</Label>
                <Input type="number" value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.paymentStatus} onValueChange={(v) => setForm({ ...form, paymentStatus: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["pending", "paid", "overdue", "cancelled"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Input value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} placeholder="Transfer Bank, dll" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Catatan</Label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button type="submit">{editingInvoice ? "Simpan" : "Buat Invoice"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Invoice</DialogTitle>
            <DialogDescription>Yakin menghapus invoice <strong>{deletingInvoice?.invoiceNumber}</strong>?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
