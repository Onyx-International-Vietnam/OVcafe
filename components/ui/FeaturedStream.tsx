"use client";

import type { Room, Role, Quality } from "@/lib/helpers/types";
import { Button } from "@/components/ui/button";

export default function FeaturedStream({
  room,
  role,
  quality,
}: {
  room: Room;
  role: Role;
  quality: Quality;
}) {
  return (
    <div className="relative min-h-[200px] overflow-hidden rounded-[var(--radius)] border bg-black text-white md:min-h-[360px]">
      {room.thumb && (
        <img
          src={room.thumb}
          alt={room.title}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
      )}

      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/70">
            Featured
          </div>
          <div className="mt-1 text-lg font-semibold">
            {room.featured?.user?.name ?? "—"}
          </div>
          <div className="mt-2 text-xs text-white/70">
            Role: {room.featured?.role ?? "—"} · Quality: {quality}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-between p-2">
        <div className="inline-flex gap-2">
          <Button variant="ghost" className="h-8 text-white">Volume</Button>
          <Button variant="ghost" className="h-8 text-white">Maximize</Button>
        </div>
        <Button variant="ghost" className="h-8 text-white">Quality</Button>
      </div>
    </div>
  );
}
