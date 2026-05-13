"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2, Search, Mail, MoreHorizontal, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Contact = {
  id: string; name: string; email: string; company: string | null;
  phone: string | null; service: string | null; budget: string | null;
  message: string; isRead: boolean | null; createdAt: string;
};

export default function ContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState<Contact | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [viewing, setViewing] = useState<Contact | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/contacts"); setItems(await res.json()); }
    catch { toast.error("Gagal memuat data"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const toggleRead = async (item: Contact) => {
    try {
      await fetch(`/api/admin/contacts/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !item.isRead }),
      });
      fetchData();
    } catch { toast.error("Gagal update"); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await fetch(`/api/admin/contacts/${deleting.id}`, { method: "DELETE" }); toast.success("Dihapus"); setDeleteDialogOpen(false); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const viewDetail = (item: Contact) => {
    setViewing(item);
    setDetailOpen(true);
    if (!item.isRead) toggleRead(item);
  };

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()));
  const unreadCount = items.filter(i => !i.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#F59E0B]" /> Contact Submissions
            {unreadCount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#FF3B3B]/20 text-[#FF3B3B] font-bold">{unreadCount} baru</span>}
          </h2>
          <p className="text-[#9CA3AF] text-sm mt-1">{items.length} total submissions</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <Input placeholder="Cari contact..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02]">
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Pesan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? Array.from({ length: 3 }).map((_, i) => <TableRow key={i}><TableCell colSpan={7}><div className="h-8 bg-white/[0.04] rounded animate-pulse" /></TableCell></TableRow>)
            : filtered.length === 0 ? <TableRow><TableCell colSpan={7} className="text-center py-12 text-[#9CA3AF]">Belum ada submission</TableCell></TableRow>
            : filtered.map((item) => (
              <TableRow key={item.id} className={`border-white/[0.04] cursor-pointer ${!item.isRead ? "bg-[#FF3B3B]/[0.03]" : ""}`} onClick={() => viewDetail(item)}>
                <TableCell className="font-medium text-white">{item.name}</TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{item.email}</TableCell>
                <TableCell><Badge variant="info">{item.service || "—"}</Badge></TableCell>
                <TableCell className="text-[#9CA3AF] text-sm max-w-[200px]"><p className="line-clamp-1">{item.message}</p></TableCell>
                <TableCell>
                  <Badge variant={item.isRead ? "secondary" : "default"}>
                    {item.isRead ? "Dibaca" : "Baru"}
                  </Badge>
                </TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{new Date(item.createdAt).toLocaleDateString("id-ID")}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toggleRead(item)}>
                        {item.isRead ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        {item.isRead ? "Tandai Belum Dibaca" : "Tandai Dibaca"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setDeleting(item); setDeleteDialogOpen(true); }} className="text-red-400 focus:text-red-400"><Trash2 className="w-4 h-4 mr-2" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Contact</DialogTitle>
            <DialogDescription>Pesan dari {viewing?.name}</DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-[#9CA3AF]">Nama:</span><p className="text-white font-medium">{viewing.name}</p></div>
                <div><span className="text-[#9CA3AF]">Email:</span><p className="text-white">{viewing.email}</p></div>
                {viewing.phone && <div><span className="text-[#9CA3AF]">Phone:</span><p className="text-white">{viewing.phone}</p></div>}
                {viewing.company && <div><span className="text-[#9CA3AF]">Company:</span><p className="text-white">{viewing.company}</p></div>}
                {viewing.service && <div><span className="text-[#9CA3AF]">Service:</span><p className="text-white">{viewing.service}</p></div>}
                {viewing.budget && <div><span className="text-[#9CA3AF]">Budget:</span><p className="text-white">{viewing.budget}</p></div>}
              </div>
              <div className="border-t border-white/[0.06] pt-4">
                <span className="text-[#9CA3AF] text-sm">Pesan:</span>
                <p className="text-white mt-1 whitespace-pre-wrap">{viewing.message}</p>
              </div>
              <p className="text-xs text-[#9CA3AF]">Dikirim: {new Date(viewing.createdAt).toLocaleString("id-ID")}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Hapus Contact</DialogTitle><DialogDescription>Yakin menghapus submission dari <strong>{deleting?.name}</strong>?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
}
