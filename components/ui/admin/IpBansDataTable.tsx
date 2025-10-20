"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ui/admin/ConfirmDialog";
import { Search, ShieldOff } from "lucide-react";

type IpBan = {
  id: string;
  ip: string;
  reason: string;
  addedBy: string;
  expiresAt: Date | null;
  createdAt: Date;
};

export function IpBansDataTable({ data }: { data: IpBan[] }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((ban) =>
    ban.ip.includes(search) || ban.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm IP hoặc lý do..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Lý do</TableHead>
              <TableHead>Thêm bởi</TableHead>
              <TableHead>Hết hạn</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((ban) => (
              <TableRow key={ban.id}>
                <TableCell className="font-mono font-medium">{ban.ip}</TableCell>
                <TableCell>{ban.reason}</TableCell>
                <TableCell>{ban.addedBy}</TableCell>
                <TableCell>
                  {ban.expiresAt ? (
                    ban.expiresAt.toLocaleDateString("vi-VN")
                  ) : (
                    <span className="text-muted-foreground">Vĩnh viễn</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <ConfirmDialog
                    title="Gỡ ban IP"
                    description={`Gỡ ban cho IP ${ban.ip}?`}
                    onConfirm={() => console.log("Unban IP:", ban.id)}
                  >
                    <Button variant="outline" size="sm">
                      <ShieldOff className="mr-2 h-4 w-4" />
                      Gỡ ban
                    </Button>
                  </ConfirmDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
