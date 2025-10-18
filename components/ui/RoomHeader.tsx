"use client";

import { formatNumber } from "@/lib/helpers/utils";
import type { Room, Role } from "@/lib/helpers/types";
import { canPresetQuality, canRecord } from "@/lib/helpers/permissions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function RoomHeader({
  room,
  role,
  onRoleChange,
}: {
  room: Room;
  role: Role;
  onRoleChange?: (r: Role) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[var(--radius)] border bg-card px-3 py-2 md:px-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-2 w-2 rounded-full ${
              room.isLive ? "bg-emerald-500" : "bg-muted-foreground/50"
            }`}
          />
          <h2 className="truncate text-base font-semibold md:text-lg">
            {room.title}
          </h2>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {room.isLive ? "Live" : "Offline"} · {formatNumber(room.viewerCount ?? 0)} viewers
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <Select
          defaultValue={role}
          onValueChange={(v) => onRoleChange?.(v as Role)}
        >
          <SelectTrigger className="h-8 w-[140px]">
            <SelectValue placeholder="Chọn vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewer">Viewer</SelectItem>
            <SelectItem value="participant">Participant</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
          </SelectContent>
        </Select>

        {canPresetQuality(role) && (
          <Button variant="outline" className="h-8 px-3">
            Preset Quality
          </Button>
        )}
        {canRecord(role) && (
          <Button className="h-8 px-3">
            {room.isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        )}
      </div>
    </div>
  );
}
