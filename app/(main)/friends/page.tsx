"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { mockFriends } from "@/lib/helpers/mock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { MoreVertical, UserMinus, Ban, Check, X } from "lucide-react";

type FriendRequest = {
  id: string;
  name: string;
  avatar?: string;
  status: "pending";
  sentAt: Date;
};

export default function Page() {
  const router = useRouter();

  const [friends, setFriends] = React.useState(() => mockFriends(10));
  const [q, setQ] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("all");

  const [incomingRequests, setIncomingRequests] = React.useState<FriendRequest[]>([
    { id: "req1", name: "Nguyễn Văn A", avatar: undefined, status: "pending", sentAt: new Date() },
    { id: "req2", name: "Trần Thị B", avatar: undefined, status: "pending", sentAt: new Date() },
  ]);
  const [outgoingRequests, setOutgoingRequests] = React.useState<FriendRequest[]>([
    { id: "req3", name: "Lê Văn C", avatar: undefined, status: "pending", sentAt: new Date() },
  ]);

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
          (statusFilter === "all" || (statusFilter === "online" && f.online) || (statusFilter === "offline" && !f.online)) &&
          f.name.toLowerCase().includes(q.toLowerCase())
      ),
    [friends, q, statusFilter]
  );

  const onlineCount = friends.filter(f => f.online).length;

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

  const handleRemove = (f: (typeof friends)[number]) => {
    setFriends(prev => prev.filter(fr => fr.id !== f.id));
    toast.success(`Đã xóa ${f.name} khỏi danh sách bạn bè`);
  };

  const handleBlock = (f: (typeof friends)[number]) => {
    setFriends(prev => prev.filter(fr => fr.id !== f.id));
    toast.success(`Đã chặn ${f.name}`);
  };

  const handleAcceptRequest = (req: FriendRequest) => {
    setIncomingRequests(prev => prev.filter(r => r.id !== req.id));
    toast.success(`Đã chấp nhận lời mời kết bạn từ ${req.name}`);
  };

  const handleDeclineRequest = (req: FriendRequest) => {
    setIncomingRequests(prev => prev.filter(r => r.id !== req.id));
    toast.success(`Đã từ chối lời mời kết bạn từ ${req.name}`);
  };

  const handleCancelRequest = (req: FriendRequest) => {
    setOutgoingRequests(prev => prev.filter(r => r.id !== req.id));
    toast.success(`Đã hủy lời mời kết bạn gửi cho ${req.name}`);
  };

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setFriends(mockFriends(10));
      setLoading(false);
      toast.success("Đã làm mới danh sách bạn bè");
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">Bạn bè</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý bạn bè và lời mời kết bạn.
          </p>
        </div>
        <Button variant="outline" onClick={refresh} disabled={loading}>
          {loading ? "Đang tải..." : "Làm mới"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tất cả ({friends.length})</TabsTrigger>
          <TabsTrigger value="online">Online ({onlineCount})</TabsTrigger>
          <TabsTrigger value="requests">
            Lời mời ({incomingRequests.length + outgoingRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm tên bạn…"
              className="w-[220px]"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <FriendsSkeleton />
          ) : list.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((f) => (
                <Card key={f.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div 
                      className="flex min-w-0 flex-1 items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleViewProfile(f)}
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                        {f.avatar && (
                          <Image
                            src={f.avatar}
                            alt={f.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        )}
                        <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${f.online ? "bg-emerald-500" : "bg-gray-400"}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{f.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {f.online ? "Online" : "Offline"}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRemove(f)}>
                          <UserMinus className="mr-2 h-4 w-4" />
                          Xóa bạn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBlock(f)} className="text-destructive">
                          <Ban className="mr-2 h-4 w-4" />
                          Chặn
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleMessage(f)} className="flex-1">
                      Nhắn tin
                    </Button>
                    <Button size="sm" onClick={() => handleInvite(f)} className="flex-1">
                      Mời phòng
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState message="Không có bạn phù hợp bộ lọc." />
          )}
        </TabsContent>

        <TabsContent value="online" className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm tên bạn…"
              className="w-[220px]"
            />
          </div>

          {loading ? (
            <FriendsSkeleton />
          ) : friends.filter(f => f.online && f.name.toLowerCase().includes(q.toLowerCase())).length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {friends.filter(f => f.online && f.name.toLowerCase().includes(q.toLowerCase())).map((f) => (
                <Card key={f.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div 
                      className="flex min-w-0 flex-1 items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleViewProfile(f)}
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                        {f.avatar && (
                          <Image
                            src={f.avatar}
                            alt={f.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        )}
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{f.name}</div>
                        <div className="text-xs text-emerald-600">Online</div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRemove(f)}>
                          <UserMinus className="mr-2 h-4 w-4" />
                          Xóa bạn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBlock(f)} className="text-destructive">
                          <Ban className="mr-2 h-4 w-4" />
                          Chặn
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleMessage(f)} className="flex-1">
                      Nhắn tin
                    </Button>
                    <Button size="sm" onClick={() => handleInvite(f)} className="flex-1">
                      Mời phòng
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState message="Không có bạn nào đang online." />
          )}
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold">Lời mời đến ({incomingRequests.length})</h3>
            {incomingRequests.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {incomingRequests.map((req) => (
                  <Card key={req.id} className="p-4">
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => router.push(`/profile/${req.id}`)}
                    >
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                        {req.avatar && (
                          <Image
                            src={req.avatar}
                            alt={req.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{req.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Gửi lời mời kết bạn
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptRequest(req)} className="flex-1">
                        <Check className="mr-1 h-4 w-4" />
                        Chấp nhận
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeclineRequest(req)} className="flex-1">
                        <X className="mr-1 h-4 w-4" />
                        Từ chối
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState message="Không có lời mời kết bạn nào." />
            )}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Lời mời đã gửi ({outgoingRequests.length})</h3>
            {outgoingRequests.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {outgoingRequests.map((req) => (
                  <Card key={req.id} className="p-4">
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => router.push(`/profile/${req.id}`)}
                    >
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                        {req.avatar && (
                          <Image
                            src={req.avatar}
                            alt={req.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{req.name}</div>
                        <div className="text-xs text-amber-600">
                          Đang chờ phản hồi
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" onClick={() => handleCancelRequest(req)} className="w-full">
                        Hủy lời mời
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState message="Bạn chưa gửi lời mời kết bạn nào." />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FriendsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
