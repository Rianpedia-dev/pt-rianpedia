"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2, Search, MessagesSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Message = {
  id: string; projectId: string; senderId: string; content: string;
  type: string; fileName: string | null; isRead: boolean | null; createdAt: string;
};

export default function MessagesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState<Message | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/messages"); setItems(await res.json()); }
    catch { toast.error("Gagal memuat data"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    if (!deleting) return;
    try { await fetch(`/api/admin/messages/${deleting.id}`, { method: "DELETE" }); toast.success("Dihapus"); setDeleteDialogOpen(false); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const filtered = items.filter(i => i.content.toLowerCase().includes(search.toLowerCase()));

  const typeColors: Record<string, "default" | "info" | "secondary"> = { text: "secondary", file: "info", system: "default" };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><MessagesSquare className="w-6 h-6 text-[#22D3EE]" /> Messages</h2>
        <p className="text-[#9CA3AF] text-sm mt-1">{items.length} total messages</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <Input placeholder="Cari pesan..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02]">
              <TableHead>Konten</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? Array.from({ length: 3 }).map((_, i) => <TableRow key={i}><TableCell colSpan={5}><div className="h-8 bg-white/[0.04] rounded animate-pulse" /></TableCell></TableRow>)
            : filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center py-12 text-[#9CA3AF]">Belum ada pesan</TableCell></TableRow>
            : filtered.map((item) => (
              <TableRow key={item.id} className="border-white/[0.04]">
                <TableCell className="text-white max-w-[300px]"><p className="line-clamp-2">{item.content}</p></TableCell>
                <TableCell><Badge variant={typeColors[item.type] || "secondary"}>{item.type}</Badge></TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{item.fileName || "—"}</TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{new Date(item.createdAt).toLocaleString("id-ID")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => { setDeleting(item); setDeleteDialogOpen(true); }} className="text-red-400 focus:text-red-400"><Trash2 className="w-4 h-4 mr-2" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Hapus Message</DialogTitle><DialogDescription>Yakin menghapus pesan ini?</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button><Button variant="destructive" onClick={handleDelete}>Hapus</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
