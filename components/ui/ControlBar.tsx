"use client";

import type { Role, Quality } from "@/lib/helpers/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ControlBar({
  role,
  quality,
  onQualityChange,
  onJoinSeat,
  onLeave,
  onRecordToggle,
}: {
  role: Role;
  quality: Quality;
  onQualityChange: (q: Quality) => void;
  onJoinSeat: () => void;
  onLeave: () => void;
  onRecordToggle: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius)] border bg-card p-2 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline">Mic</Button>
        <Button variant="outline">Cam</Button>

        <Select defaultValue={quality} onValueChange={(v) => onQualityChange(v as Quality)}>
          <SelectTrigger className="h-8 w-[140px]">
            <SelectValue placeholder="Quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {role === "viewer" ? (
          <Button onClick={onJoinSeat}>Request Seat</Button>
        ) : (
          <Button variant="outline" onClick={onLeave}>
            Leave
          </Button>
        )}
        {role === "owner" && <Button onClick={onRecordToggle}>Record</Button>}
      </div>
    </div>
  );
}
