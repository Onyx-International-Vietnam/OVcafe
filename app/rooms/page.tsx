import { mockRooms } from "@/lib/helpers/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function Page() {
  const rooms = mockRooms(5);
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
            Phòng của tôi
          </h1>
          <p className="text-sm text-muted-foreground">
            Tạo, quản lý và vào phòng nhanh.
          </p>
        </div>
        <Button asChild>
          <Link href="/create-room">Tạo phòng</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r) => (
          <Link key={r.id} href={`/rooms/${r.id}`} className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold">
                      {r.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {r.isLive ? "Đang live" : "Offline"} · {r.viewerCount} viewers
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                      r.isLive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-muted text-foreground/70"
                    }`}
                  >
                    {r.isLive ? "Live" : "Offline"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
