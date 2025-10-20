"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";

type Log = {
  id: string;
  timestamp: Date;
  actor: string;
  action: string;
  target: string;
  meta: Record<string, any>;
};

const actionLabels: Record<string, string> = {
  ban_user: "Ban User",
  shutdown_session: "Shutdown Session",
  add_ip_ban: "Add IP Ban",
  remove_ip_ban: "Remove IP Ban",
  delete_user: "Delete User",
};

export function LogsDataTable({ data }: { data: Log[] }) {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filtered = data.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm actor hoặc target..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="ban_user">Ban User</SelectItem>
            <SelectItem value="shutdown_session">Shutdown Session</SelectItem>
            <SelectItem value="add_ip_ban">Add IP Ban</SelectItem>
            <SelectItem value="remove_ip_ban">Remove IP Ban</SelectItem>
            <SelectItem value="delete_user">Delete User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead className="text-right">Meta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">
                  {log.timestamp.toLocaleString("vi-VN")}
                </TableCell>
                <TableCell>{log.actor}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
                    {actionLabels[log.action] || log.action}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{log.target}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Metadata</DialogTitle>
                      </DialogHeader>
                      <pre className="rounded-md bg-muted p-4 text-xs overflow-auto">
                        {JSON.stringify(log.meta, null, 2)}
                      </pre>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
