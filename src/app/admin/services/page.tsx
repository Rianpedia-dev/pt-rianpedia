"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Wrench, MoreHorizontal, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Service = {
  id: string; title: string; subtitle: string | null; description: string | null;
  features: string[] | null; packages: any[] | null; color: string | null;
  gradient: string | null; emoji: string | null; order: number | null; createdAt: string;
};

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<Service | null>(null);
  const [form, setForm] = useState({
    id: "", title: "", subtitle: "", description: "", features: "", emoji: "",
    color: "", gradient: "", order: "0",
  });

  const fetchData = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/services"); setItems(await res.json()); }
    catch { toast.error("Gagal memuat data"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ id: "", title: "", subtitle: "", description: "", features: "", emoji: "", color: "", gradient: "", order: "0" });
    setDialogOpen(true);
  };

  const openEdit = (item: Service) => {
    setEditing(item);
    setForm({
      id: item.id, title: item.title, subtitle: item.subtitle || "", description: item.description || "",
      features: (item.features || []).join("\n"), emoji: item.emoji || "",
      color: item.color || "", gradient: item.gradient || "", order: String(item.order || 0),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editing ? `/api/admin/services/${editing.id}` : "/api/admin/services";
      const method = editing ? "PUT" : "POST";
      const payload = { ...form, features: form.features ? form.features.split("\n").map(s => s.trim()).filter(Boolean) : null, order: parseInt(form.order) || 0 };
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Gagal");
      toast.success(editing ? "Service diupdate" : "Service dibuat");
      setDialogOpen(false); fetchData();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await fetch(`/api/admin/services/${deleting.id}`, { method: "DELETE" }); toast.success("Dihapus"); setDeleteDialogOpen(false); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Wrench className="w-6 h-6 text-[#EC4899]" /> Kelola Services</h2>
          <p className="text-[#9CA3AF] text-sm mt-1">{items.length} total services</p>
        </div>
        <Button onClick={openCreate} variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Service
        </Button>

      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <Input placeholder="Cari service..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02]">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Subtitle</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? Array.from({ length: 3 }).map((_, i) => <TableRow key={i}><TableCell colSpan={5}><div className="h-8 bg-white/[0.04] rounded animate-pulse" /></TableCell></TableRow>)
            : filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center py-12 text-[#9CA3AF]">Belum ada service</TableCell></TableRow>
            : filtered.map((item) => (
              <TableRow key={item.id} className="border-white/[0.04]">
                <TableCell className="text-[#9CA3AF]">{item.order}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {item.emoji && <span className="text-lg">{item.emoji}</span>}
                    <span className="font-medium text-white">{item.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{item.subtitle || "—"}</TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{(item.features || []).length} fitur</TableCell>
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
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Service" : "Tambah Service"}</DialogTitle>
            <DialogDescription>Isi detail service</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>ID *</Label><Input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required disabled={!!editing} placeholder="web-development" /></div>
              <div className="space-y-2"><Label>Order</Label><Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Judul *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Subtitle</Label><Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></div>
            <div className="space-y-2"><Label>Deskripsi</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div className="space-y-2"><Label>Features (satu per baris)</Label><Textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={4} placeholder="Responsive Design\nSEO Optimization\nCMS Integration" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Emoji</Label><Input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🌐" /></div>
              <div className="space-y-2"><Label>Color</Label><Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="#FF3B3B" /></div>
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
          <DialogHeader><DialogTitle>Hapus Service</DialogTitle><DialogDescription>Yakin menghapus <strong>{deleting?.title}</strong>?</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button><Button variant="destructive" onClick={handleDelete}>Hapus</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
