"use client";

import type { Room, Role } from "@/lib/helpers/types";
import ParticipantSlot from "./ParticipantSlot";
import { MAX_PARTICIPANTS } from "@/lib/helpers/constants";

export default function ParticipantGrid({
  room,
  role,
}: {
  room: Room;
  role: Role;
}) {
  const slots = room.participants;
  const blanks = Math.max(0, MAX_PARTICIPANTS - slots.length);

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {slots.map((s, idx) => (
        <ParticipantSlot key={idx} slot={s} />
      ))}
      {Array.from({ length: blanks }).map((_, i) => (
        <ParticipantSlot key={`blank-${i}`} />
      ))}
    </div>
  );
}
