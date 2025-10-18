"use client";

import type { Slot } from "@/lib/helpers/types";

export default function ParticipantSlot({ slot }: { slot?: Slot }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-[var(--radius)] border bg-muted text-foreground">
      {slot?.user ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-black/20">
              {slot.user.avatar && (
                <img
                  src={slot.user.avatar}
                  alt={slot.user.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <div className="text-sm font-medium">{slot.user.name}</div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center text-foreground/60">
          <div className="text-xs">Trống · Click để tham gia</div>
        </div>
      )}
    </div>
  );
}
