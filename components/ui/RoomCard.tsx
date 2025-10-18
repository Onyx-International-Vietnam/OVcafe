import type { Room } from "@/lib/helpers/types";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Link href={`/rooms/${room.id}`} className="block">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-video bg-muted">
          {room.thumb && (
            <img
              src={room.thumb}
              alt={room.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{room.title}</div>
              <div className="text-xs text-muted-foreground">
                {room.isLive ? "Live" : "Offline"} · {room.viewerCount} viewers
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                room.isLive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-muted text-foreground/70"
              }`}
            >
              {room.isLive ? "Live" : "Offline"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
