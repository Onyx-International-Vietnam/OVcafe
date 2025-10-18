"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { mockFriends } from "@/lib/helpers/mock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const [friends, setFriends] = React.useState(() => mockFriends(10));
  const [q, setQ] = React.useState("");
  const [onlineOnly, setOnlineOnly] = React.useState(false);

  // Tick động: thỉnh thoảng đổi trạng thái online của 1 người ngẫu nhiên
  React.useEffect(() => {
    const t = setInterval(() => {
      setFriends((prev) => {
        if (!prev.length) return prev;
        const idx = Math.floor(Math.random() * prev.length);
        const next = [...prev];
        next[idx] = { ...next[idx], online: !next[idx].online };
        return next;
      });
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const list = React.useMemo(
    () =>
      friends.filter(
        (f) =>
          (!onlineOnly || f.online) &&
          f.name.toLowerCase().includes(q.toLowerCase())
      ),
    [friends, q, onlineOnly]
  );

  const handleInvite = async (f: (typeof friends)[number]) => {
    const url = `${location.origin}/rooms/r1`;
    toast.promise(
      (async () => {
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          /* ignore clipboard error in demo */
        }
        await new Promise((r) => setTimeout(r, 800));
      })(),
      {
        loading: `Đang mời ${f.name}…`,
        success: `Đã mời ${f.name} vào phòng (link đã copy)`,
        error: "Mời thất bại (demo)",
      }
    );
  };

  const handleMessage = (f: (typeof friends)[number]) => {
    toast.info(`Mở chat với ${f.name}`);
    router.push(`/messages?to=${encodeURIComponent(f.id)}`);
  };

  const handleViewProfile = (f: (typeof friends)[number]) => {
    router.push(`/profile/${encodeURIComponent(f.id)}`);
  };

  const refresh = () => {
    setFriends(mockFriends(10));
    toast.success("Đã làm mới danh sách bạn bè");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">Bạn bè</h1>
          <p className="text-sm text-muted-foreground">
            Danh sách cập nhật trạng thái online theo thời gian (demo).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm tên bạn…"
            className="w-[220px]"
          />
          <label className="inline-flex items-center gap-2 text-sm">
            <Checkbox
              checked={onlineOnly}
              onCheckedChange={(v) => setOnlineOnly(Boolean(v))}
            />
            Chỉ hiện Online
          </label>
          <Button variant="outline" onClick={refresh}>
            Làm mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map((f) => (
          <Card key={f.id} className="flex items-center justify-between p-3">
            <div 
              className="min-w-0 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleViewProfile(f)}
            >
              <div className="h-9 w-9 overflow-hidden rounded-full bg-muted">
                {f.avatar && (
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{f.name}</div>
                <div
                  className={`text-xs ${
                    f.online ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {f.online ? "Online" : "Offline"}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleMessage(f)}>
                Nhắn tin
              </Button>
              <Button onClick={() => handleInvite(f)}>Mời phòng</Button>
            </div>
          </Card>
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Không có bạn phù hợp bộ lọc.
        </p>
      )}
    </div>
  );
}
