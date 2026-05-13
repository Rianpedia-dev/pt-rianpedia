"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, MessageSquareQuote, MoreHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Testimonial = {
  id: string; name: string; role: string | null; content: string;
  rating: number | null; avatar: string | null; order: number | null; createdAt: string;
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: "", role: "", content: "", rating: "5", avatar: "", order: "0", color: "" });

  const fetchData = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/testimonials"); setItems(await res.json()); }
    catch { toast.error("Gagal memuat data"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: "", role: "", content: "", rating: "5", avatar: "", order: "0", color: "" }); setDialogOpen(true); };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({ name: item.name, role: item.role || "", content: item.content, rating: String(item.rating || 5), avatar: item.avatar || "", order: String(item.order || 0), color: (item as any).color || "" });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editing ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials";
      const method = editing ? "PUT" : "POST";
      const payload = { ...form, rating: parseInt(form.rating) || 5, order: parseInt(form.order) || 0 };
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Gagal");
      toast.success(editing ? "Testimonial diupdate" : "Testimonial dibuat");
      setDialogOpen(false); fetchData();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await fetch(`/api/admin/testimonials/${deleting.id}`, { method: "DELETE" }); toast.success("Dihapus"); setDeleteDialogOpen(false); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2"><MessageSquareQuote className="w-6 h-6 text-[#8B5CF6]" /> Kelola Testimonials</h2>
          <p className="text-[#9CA3AF] text-sm mt-1">{items.length} total testimonials</p>
        </div>
        <Button onClick={openCreate} variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Testimonial
        </Button>

      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <Input placeholder="Cari testimonial..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02]">
              <TableHead>Nama</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? Array.from({ length: 3 }).map((_, i) => <TableRow key={i}><TableCell colSpan={5}><div className="h-8 bg-white/[0.04] rounded animate-pulse" /></TableCell></TableRow>)
            : filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center py-12 text-[#9CA3AF]">Belum ada testimonial</TableCell></TableRow>
            : filtered.map((item) => (
              <TableRow key={item.id} className="border-white/[0.04]">
                <TableCell className="font-medium text-white">{item.name}</TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{item.role || "—"}</TableCell>
                <TableCell className="text-[#9CA3AF] text-sm max-w-[200px]"><p className="line-clamp-2">{item.content}</p></TableCell>
                <TableCell>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < (item.rating || 5) ? "text-amber-400 fill-amber-400" : "text-white/10"}`} />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(item)}><Pencil className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setDeleting(item); setDeleteDialogOpen(true); }} className="text-red-400 focus:text-red-400"><Trash2 className="w-4 h-4 mr-2" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Testimonial" : "Tambah Testimonial"}</DialogTitle>
            <DialogDescription>Isi detail testimonial</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Nama *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Role</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CEO, Founder, dll" /></div>
            </div>
            <div className="space-y-2"><Label>Review *</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} required /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Rating (1-5)</Label><Input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} /></div>
              <div className="space-y-2"><Label>Order</Label><Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button type="submit" variant="default">{editing ? "Simpan" : "Buat"}</Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Hapus Testimonial</DialogTitle><DialogDescription>Yakin menghapus testimonial dari <strong>{deleting?.name}</strong>?</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button><Button variant="destructive" onClick={handleDelete}>Hapus</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
