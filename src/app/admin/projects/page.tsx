"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, FolderKanban, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Project = {
  id: string;
  clientId: string;
  title: string;
  description: string | null;
  status: string;
  totalBudget: string | null;
  progressPercentage: number | null;
  techStack: string[] | null;
  createdAt: string;
  [key: string]: any;
};

const statusColors: Record<string, "default" | "info" | "success" | "warning" | "purple" | "destructive"> = {
  inquiry: "warning",
  planning: "purple",
  design: "info",
  development: "info",
  testing: "warning",
  deployment: "purple",
  completed: "success",
  on_hold: "destructive",
};

const statusOptions = ["inquiry", "planning", "design", "development", "testing", "deployment", "completed", "on_hold"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "", description: "", status: "inquiry", clientId: "",
    totalBudget: "", techStack: "", requirements: "",
    progressPercentage: "0", repositoryUrl: "", stagingUrl: "", productionUrl: "",
    startDate: "", endDate: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, uRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/users"),
      ]);
      setProjects(await pRes.json());
      setUsers(await uRes.json());
    } catch {
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreateDialog = () => {
    setEditingProject(null);
    setForm({
      title: "", description: "", status: "inquiry", clientId: "",
      totalBudget: "", techStack: "", requirements: "",
      progressPercentage: "0", repositoryUrl: "", stagingUrl: "", productionUrl: "",
      startDate: "", endDate: "",
    });
    setDialogOpen(true);
  };

  const openEditDialog = (p: Project) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      description: p.description || "",
      status: p.status,
      clientId: p.clientId,
      totalBudget: p.totalBudget || "",
      techStack: (p.techStack || []).join(", "),
      requirements: p.requirements || "",
      progressPercentage: String(p.progressPercentage || 0),
      repositoryUrl: p.repositoryUrl || "",
      stagingUrl: p.stagingUrl || "",
      productionUrl: p.productionUrl || "",
      startDate: p.startDate ? new Date(p.startDate).toISOString().split("T")[0] : "",
      endDate: p.endDate ? new Date(p.endDate).toISOString().split("T")[0] : "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";
      const payload = {
        ...form,
        techStack: form.techStack ? form.techStack.split(",").map((s) => s.trim()).filter(Boolean) : null,
        progressPercentage: parseInt(form.progressPercentage) || 0,
      };
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Gagal menyimpan");
      toast.success(editingProject ? "Project diupdate" : "Project dibuat");
      setDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;
    try {
      await fetch(`/api/admin/projects/${deletingProject.id}`, { method: "DELETE" });
      toast.success("Project dihapus");
      setDeleteDialogOpen(false);
      fetchData();
    } catch {
      toast.error("Gagal menghapus");
    }
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-[#7C3AED]" />
            Kelola Projects
          </h2>
          <p className="text-[#9CA3AF] text-sm mt-1">{projects.length} total projects</p>
        </div>
        <Button onClick={openCreateDialog} variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Project
        </Button>

      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <Input placeholder="Cari project..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02]">
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}><TableCell colSpan={6}><div className="h-8 bg-white/[0.04] rounded animate-pulse" /></TableCell></TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-[#9CA3AF]">Belum ada project</TableCell></TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id} className="border-white/[0.04]">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{p.title}</p>
                      {p.description && <p className="text-xs text-[#9CA3AF] mt-0.5 line-clamp-1">{p.description}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[p.status] || "secondary"}>{p.status}</Badge>
                  </TableCell>
                  <TableCell className="text-[#9CA3AF]">
                    {p.totalBudget ? `Rp ${Number(p.totalBudget).toLocaleString("id-ID")}` : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FF3B3B] to-[#7C3AED]"
                          style={{ width: `${p.progressPercentage || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#9CA3AF]">{p.progressPercentage || 0}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {(p.techStack || []).slice(0, 3).map((t: string) => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.06] text-[#9CA3AF]">{t}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(p)}><Pencil className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setDeletingProject(p); setDeleteDialogOpen(true); }} className="text-red-400 focus:text-red-400">
                          <Trash2 className="w-4 h-4 mr-2" /> Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Tambah Project Baru"}</DialogTitle>
            <DialogDescription>{editingProject ? "Update detail project" : "Masukkan informasi project baru"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Judul Project *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Client *</Label>
                <Select value={form.clientId} onValueChange={(v) => setForm({ ...form, clientId: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih client" /></SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>{u.name || u.email}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Budget (Rp)</Label>
                <Input type="number" value={form.totalBudget} onChange={(e) => setForm({ ...form, totalBudget: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Progress (%)</Label>
                <Input type="number" min="0" max="100" value={form.progressPercentage} onChange={(e) => setForm({ ...form, progressPercentage: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <Input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder="React, Node.js, PostgreSQL" />
              </div>
              <div className="space-y-2">
                <Label>Tanggal Mulai</Label>
                <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tanggal Selesai</Label>
                <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Requirements</Label>
              <Textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={3} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Repository URL</Label>
                <Input value={form.repositoryUrl} onChange={(e) => setForm({ ...form, repositoryUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Staging URL</Label>
                <Input value={form.stagingUrl} onChange={(e) => setForm({ ...form, stagingUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Production URL</Label>
                <Input value={form.productionUrl} onChange={(e) => setForm({ ...form, productionUrl: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button type="submit" variant="default">{editingProject ? "Simpan" : "Buat Project"}</Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Project</DialogTitle>
            <DialogDescription>Yakin menghapus <strong>{deletingProject?.title}</strong>? Semua data terkait akan ikut terhapus.</DialogDescription>
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
