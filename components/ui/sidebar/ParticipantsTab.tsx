"use client";

import { useRouter } from "next/navigation";
import type { Room, Role } from "@/lib/helpers/types";
import { canBan } from "@/lib/helpers/permissions";
import { Button } from "@/components/ui/button";

export default function ParticipantsTab({
  room,
  role,
}: {
  room: Room;
  role: Role;
}) {
  const router = useRouter();
  const list = [room.featured, ...room.participants].filter(Boolean);

  const handleViewProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="space-y-2">
      {list.map((s, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between rounded-md border p-2 text-sm"
        >
          <div className="min-w-0">
            <div className="truncate font-medium">{s!.user?.name ?? "—"}</div>
            <div className="text-xs text-muted-foreground">{s!.role}</div>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              onClick={() => handleViewProfile(s!.user?.id || "")}
            >
              Profile
            </Button>
            {canBan(role) && <Button variant="outline">Ban</Button>}
          </div>
        </div>
      ))}
    </div>
  );
}
