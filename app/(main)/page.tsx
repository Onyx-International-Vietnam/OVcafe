import { mockRooms } from "@/lib/helpers/mock";
import RoomCard from "@/components/ui/RoomCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, TrendingUp } from "lucide-react";

export default async function Page() {
  const rooms = mockRooms(8).map((room) => ({
    ...room,
    tags: ["Gaming", "Chill", "Music", "Talk"].slice(0, Math.floor(Math.random() * 3) + 1),
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    viewerCount: room.viewerCount ?? 0, // Ensure viewerCount is always defined
  }));

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary/80 to-primary/60 p-8 md:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
              <TrendingUp className="mr-1 h-3 w-3" />
              Đang hot
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-4xl mb-3">
            Đang livestream
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mb-6">
            Khám phá các phòng đang hoạt động – click để tham gia ngay và kết nối với mọi người.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <Input 
              placeholder="Tìm phòng, chủ phòng…" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm h-11"
            />
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link href="/create-room">
                <Sparkles className="mr-2 h-4 w-4" />
                Tạo phòng
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Phòng đang hoạt động
          </h2>
          <Badge variant="outline">
            {rooms.filter(r => r.isLive).length} phòng live
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
