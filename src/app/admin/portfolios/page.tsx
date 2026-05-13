"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Briefcase, MoreHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Portfolio = {
  id: string; title: string; slug: string; clientName: string | null; industry: string | null;
  description: string | null; category: string | null; year: string | null;
  featured: boolean | null; imageUrl: string | null; projectUrl: string | null;
  techStack: string[] | null; emoji: string | null; createdAt: string;
  [key: string]: any;
};

export default function PortfoliosPage() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [deleting, setDeleting] = useState<Portfolio | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", clientName: "", industry: "", description: "",
    category: "", year: "", featured: false, imageUrl: "", projectUrl: "",
    techStack: "", problem: "", solution: "", emoji: "", color: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/portfolios"); setItems(await res.json()); }
    catch { toast.error("Gagal memuat data"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", slug: "", clientName: "", industry: "", description: "", category: "", year: new Date().getFullYear().toString(), featured: false, imageUrl: "", projectUrl: "", techStack: "", problem: "", solution: "", emoji: "", color: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: Portfolio) => {
    setEditing(item);
    setForm({
      title: item.title, slug: item.slug, clientName: item.clientName || "", industry: item.industry || "",
      description: item.description || "", category: item.category || "", year: item.year || "",
      featured: item.featured || false, imageUrl: item.imageUrl || "", projectUrl: item.projectUrl || "",
      techStack: (item.techStack || []).join(", "), problem: item.problem || "", solution: item.solution || "",
      emoji: item.emoji || "", color: item.color || "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editing ? `/api/admin/portfolios/${editing.id}` : "/api/admin/portfolios";
      const method = editing ? "PUT" : "POST";
      const payload = { ...form, techStack: form.techStack ? form.techStack.split(",").map(s => s.trim()).filter(Boolean) : null };
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Gagal");
      toast.success(editing ? "Portfolio diupdate" : "Portfolio dibuat");
      setDialogOpen(false); fetchData();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await fetch(`/api/admin/portfolios/${deleting.id}`, { method: "DELETE" }); toast.success("Dihapus"); setDeleteDialogOpen(false); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Briefcase className="w-6 h-6 text-[#10B981]" /> Kelola Portfolios</h2>
          <p className="text-[#9CA3AF] text-sm mt-1">{items.length} total portfolios</p>
        </div>
        <Button onClick={openCreate} variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Portfolio
        </Button>

      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <Input placeholder="Cari portfolio..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02]">
              <TableHead>Portfolio</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? Array.from({ length: 3 }).map((_, i) => <TableRow key={i}><TableCell colSpan={6}><div className="h-8 bg-white/[0.04] rounded animate-pulse" /></TableCell></TableRow>)
            : filtered.length === 0 ? <TableRow><TableCell colSpan={6} className="text-center py-12 text-[#9CA3AF]">Belum ada portfolio</TableCell></TableRow>
            : filtered.map((item) => (
              <TableRow key={item.id} className="border-white/[0.04]">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {item.emoji && <span className="text-lg">{item.emoji}</span>}
                    <div><p className="font-medium text-white">{item.title}</p><p className="text-xs text-[#9CA3AF]">{item.clientName || ""}</p></div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="info">{item.category || "—"}</Badge></TableCell>
                <TableCell className="text-[#9CA3AF]">{item.industry || "—"}</TableCell>
                <TableCell className="text-[#9CA3AF]">{item.year || "—"}</TableCell>
                <TableCell>{item.featured ? <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> : <Star className="w-4 h-4 text-white/10" />}</TableCell>
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Portfolio" : "Tambah Portfolio"}</DialogTitle>
            <DialogDescription>Isi detail portfolio</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Judul *</Label><Input value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) }); }} required /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
              <div className="space-y-2"><Label>Client</Label><Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} /></div>
              <div className="space-y-2"><Label>Industry</Label><Input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} /></div>
              <div className="space-y-2"><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Web App, Mobile, dll" /></div>
              <div className="space-y-2"><Label>Year</Label><Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></div>
              <div className="space-y-2"><Label>Emoji</Label><Input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🚀" /></div>
              <div className="space-y-2"><Label>Featured</Label>
                <Select value={form.featured ? "true" : "false"} onValueChange={(v) => setForm({ ...form, featured: v === "true" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="true">Ya</SelectItem><SelectItem value="false">Tidak</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2"><Label>Deskripsi</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Image URL</Label><Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></div>
              <div className="space-y-2"><Label>Project URL</Label><Input value={form.projectUrl} onChange={(e) => setForm({ ...form, projectUrl: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Tech Stack</Label><Input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder="Next.js, React, Supabase" /></div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button type="submit" variant="default">{editing ? "Simpan" : "Buat"}</Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Hapus Portfolio</DialogTitle><DialogDescription>Yakin menghapus <strong>{deleting?.title}</strong>?</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button><Button variant="destructive" onClick={handleDelete}>Hapus</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
