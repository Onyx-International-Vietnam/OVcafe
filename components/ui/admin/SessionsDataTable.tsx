"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui/admin/ConfirmDialog";
import { Search, Power, Ban, RotateCcw } from "lucide-react";

type Session = {
  id: string;
  roomId: string;
  title: string;
  owner: string;
  viewers: number;
  startedAt: Date;
  disabled: boolean;
};

export function SessionsDataTable({ data }: { data: Session[] }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("viewers");

  const filtered = data
    .filter((session) =>
      session.title.toLowerCase().includes(search.toLowerCase()) ||
      session.owner.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "viewers") return b.viewers - a.viewers;
      if (sortBy === "startedAt") return b.startedAt.getTime() - a.startedAt.getTime();
      return 0;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm phòng hoặc chủ phòng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewers">Viewers (cao → thấp)</SelectItem>
            <SelectItem value="startedAt">Mới nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>Phòng</TableHead>
              <TableHead>Chủ phòng</TableHead>
              <TableHead>Viewers</TableHead>
              <TableHead>Bắt đầu</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell>{s.owner}</TableCell>
                <TableCell>{s.viewers}</TableCell>
                <TableCell>{s.startedAt.toLocaleTimeString("vi-VN")}</TableCell>
                <TableCell>
                  {s.disabled ? (
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
                      Disabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                      Active
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-2">
                    <ConfirmDialog
                      title="Tắt phiên"
                      description={`Tắt phiên "${s.title}"?`}
                      onConfirm={() => console.log("Shutdown session:", s.id)}
                    >
                      <Button variant="outline" size="sm" disabled={s.disabled}>
                        <Power className="mr-2 h-4 w-4" />
                        Tắt phiên
                      </Button>
                    </ConfirmDialog>
                    <ConfirmDialog
                      title="Ban chủ phòng"
                      description={`Ban ${s.owner}?`}
                      onConfirm={() => console.log("Ban owner:", s.owner)}
                    >
                      <Button variant="outline" size="sm">
                        <Ban className="mr-2 h-4 w-4" />
                        Ban Owner
                      </Button>
                    </ConfirmDialog>
                    <ConfirmDialog
                      title="Khôi phục phiên"
                      description={`Khôi phục "${s.title}"?`}
                      onConfirm={() => console.log("Restore session:", s.id)}
                    >
                      <Button size="sm" disabled={!s.disabled}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Khôi phục
                      </Button>
                    </ConfirmDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
