"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2, Search, BrainCircuit, MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type AILog = {
  id: string; userId: string | null; sessionId: string | null;
  inputData: any; generatedResponse: any; tokensUsed: number | null;
  createdAt: string;
};

export default function AILogsPage() {
  const [items, setItems] = useState<AILog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState<AILog | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [viewing, setViewing] = useState<AILog | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/ai-logs"); setItems(await res.json()); }
    catch { toast.error("Gagal memuat data"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    if (!deleting) return;
    try { await fetch(`/api/admin/ai-logs/${deleting.id}`, { method: "DELETE" }); toast.success("Dihapus"); setDeleteDialogOpen(false); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const filtered = items.filter(i => {
    const businessType = i.inputData?.businessType || "";
    return businessType.toLowerCase().includes(search.toLowerCase()) || i.sessionId?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><BrainCircuit className="w-6 h-6 text-[#7C3AED]" /> AI Recommendation Logs</h2>
        <p className="text-[#9CA3AF] text-sm mt-1">{items.length} total logs</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <Input placeholder="Cari log..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] bg-white/[0.02]">
              <TableHead>Business Type</TableHead>
              <TableHead>System Goal</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? Array.from({ length: 3 }).map((_, i) => <TableRow key={i}><TableCell colSpan={6}><div className="h-8 bg-white/[0.04] rounded animate-pulse" /></TableCell></TableRow>)
            : filtered.length === 0 ? <TableRow><TableCell colSpan={6} className="text-center py-12 text-[#9CA3AF]">Belum ada AI log</TableCell></TableRow>
            : filtered.map((item) => (
              <TableRow key={item.id} className="border-white/[0.04]">
                <TableCell className="font-medium text-white">{item.inputData?.businessType || "—"}</TableCell>
                <TableCell className="text-[#9CA3AF] text-sm max-w-[200px]"><p className="line-clamp-1">{item.inputData?.systemGoal || "—"}</p></TableCell>
                <TableCell><Badge variant="info">{item.inputData?.budgetRange || "—"}</Badge></TableCell>
                <TableCell className="text-[#9CA3AF] font-mono text-sm">{item.tokensUsed?.toLocaleString() || "—"}</TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">{new Date(item.createdAt).toLocaleString("id-ID")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => { setViewing(item); setDetailOpen(true); }}><Eye className="w-4 h-4 mr-2" /> Detail</DropdownMenuItem>
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail AI Log</DialogTitle>
            <DialogDescription>Input & output dari AI recommendation</DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[#FF3B3B] mb-2">📥 Input Data</h4>
                <pre className="bg-black/30 rounded-lg p-3 text-xs text-[#9CA3AF] overflow-x-auto">
                  {JSON.stringify(viewing.inputData, null, 2)}
                </pre>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#22D3EE] mb-2">📤 Generated Response</h4>
                <pre className="bg-black/30 rounded-lg p-3 text-xs text-[#9CA3AF] overflow-x-auto">
                  {JSON.stringify(viewing.generatedResponse, null, 2)}
                </pre>
              </div>
              <div className="flex gap-4 text-xs text-[#9CA3AF]">
                <span>Tokens: <strong className="text-white">{viewing.tokensUsed?.toLocaleString() || "—"}</strong></span>
                <span>Session: <strong className="text-white font-mono">{viewing.sessionId || "—"}</strong></span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Hapus AI Log</DialogTitle><DialogDescription>Yakin menghapus log ini?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
}
