import { mockRooms } from "@/lib/helpers/mock";
import RoomCard from "@/components/ui/RoomCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const rooms = mockRooms(8);
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
            Đang livestream
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Khám phá các phòng đang hoạt động – click để tham gia ngay.
          </p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Tìm phòng, chủ phòng…" />
          <Button asChild>
            <Link href="/create-room">Tạo phòng</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms.map((r) => (
          <RoomCard key={r.id} room={r} />
        ))}
      </div>
    </div>
  );
}
