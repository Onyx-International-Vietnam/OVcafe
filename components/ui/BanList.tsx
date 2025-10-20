"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserX } from "lucide-react";

interface BannedUser {
  id: string;
  username: string;
  reason: string;
  bannedAt: Date;
  expiresAt?: Date;
}

interface BanListProps {
  roomId: string;
}

// Fake data for demonstration
const FAKE_BANNED_USERS: BannedUser[] = [
  {
    id: "1",
    username: "baduser123",
    reason: "Spamming chat",
    bannedAt: new Date("2024-01-15"),
    expiresAt: new Date("2024-02-15"),
  },
  {
    id: "2",
    username: "troll_master",
    reason: "Harassment and inappropriate behavior",
    bannedAt: new Date("2024-01-10"),
    expiresAt: undefined, // Permanent
  },
  {
    id: "3",
    username: "advertiser99",
    reason: "Advertising without permission",
    bannedAt: new Date("2024-01-20"),
    expiresAt: new Date("2024-01-27"),
  },
];

export default function BanList({ roomId }: BanListProps) {
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>(FAKE_BANNED_USERS);

  const handleUnban = async (userId: string) => {
    console.log(`Unbanning user ${userId} from room ${roomId}`);
    setBannedUsers(bannedUsers.filter((u) => u.id !== userId));
  };

  const formatExpiry = (date?: Date) => {
    if (!date) return <Badge variant="destructive" className="text-xs">Permanent</Badge>;
    const now = new Date();
    const isExpired = date < now;
    
    if (isExpired) {
      return <Badge variant="secondary" className="text-xs">Expired</Badge>;
    }
    
    return (
      <Badge variant="outline" className="text-xs">
        {new Intl.DateTimeFormat("vi-VN", {
          dateStyle: "medium",
        }).format(date)}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Banned Users</CardTitle>
        <CardDescription className="text-xs">
          {bannedUsers.length} user{bannedUsers.length !== 1 ? "s" : ""} currently banned
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">User</TableHead>
              <TableHead className="text-xs">Reason</TableHead>
              <TableHead className="text-xs">Expires</TableHead>
              <TableHead className="text-xs text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bannedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <UserX className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm">No banned users</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              bannedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-sm">{user.username}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">
                    {user.reason}
                  </TableCell>
                  <TableCell className="text-xs">{formatExpiry(user.expiresAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnban(user.id)}
                      className="h-7 text-xs"
                    >
                      Unban
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
