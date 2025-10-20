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
import { MoreVertical, UserMinus, Ban, Check, X, Users, RefreshCw, Search, UserPlus } from "lucide-react";

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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 md:p-8">
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-2 ring-primary/20">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Bạn bè</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Quản lý {friends.length} bạn bè và {incomingRequests.length + outgoingRequests.length} lời mời
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={refresh} 
            disabled={loading}
            className="w-full shadow-sm md:w-auto"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Đang tải..." : "Làm mới"}
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="all" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Tất cả</span>
            <span className="inline sm:hidden">All</span>
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
              {friends.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="online" className="gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Online
            <span className="ml-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              {onlineCount}
            </span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Lời mời</span>
            <span className="inline sm:hidden">Req</span>
            <span className="ml-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
              {incomingRequests.length + outgoingRequests.length}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* All Friends Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm kiếm bạn bè..."
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="online">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    Online
                  </div>
                </SelectItem>
                <SelectItem value="offline">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    Offline
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <FriendsSkeleton />
          ) : list.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((f) => (
                <Card key={f.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div 
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 transition-opacity hover:opacity-80"
                        onClick={() => handleViewProfile(f)}
                      >
                        <div className="relative h-14 w-14 flex-shrink-0">
                          <div className="h-full w-full overflow-hidden rounded-full bg-muted ring-2 ring-background">
                            {f.avatar && (
                              <Image
                                src={f.avatar}
                                alt={f.name}
                                width={56}
                                height={56}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-background ${f.online ? "bg-emerald-500" : "bg-gray-400"}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold">{f.name}</div>
                          <div className={`text-xs font-medium ${f.online ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                            {f.online ? "Đang hoạt động" : "Không hoạt động"}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRemove(f)}>
                            <UserMinus className="mr-2 h-4 w-4" />
                            Xóa bạn
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBlock(f)} className="text-destructive focus:text-destructive">
                            <Ban className="mr-2 h-4 w-4" />
                            Chặn
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleMessage(f)} className="flex-1">
                        Nhắn tin
                      </Button>
                      <Button size="sm" onClick={() => handleInvite(f)} className="flex-1">
                        Mời
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={<Users className="h-12 w-12" />}
              message="Không tìm thấy bạn bè nào" 
              description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
            />
          )}
        </TabsContent>

        {/* Online Tab */}
        <TabsContent value="online" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm kiếm bạn đang online..."
              className="pl-9"
            />
          </div>

          {loading ? (
            <FriendsSkeleton />
          ) : friends.filter(f => f.online && f.name.toLowerCase().includes(q.toLowerCase())).length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {friends.filter(f => f.online && f.name.toLowerCase().includes(q.toLowerCase())).map((f) => (
                <Card key={f.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div 
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 transition-opacity hover:opacity-80"
                        onClick={() => handleViewProfile(f)}
                      >
                        <div className="relative h-14 w-14 flex-shrink-0">
                          <div className="h-full w-full overflow-hidden rounded-full bg-muted ring-2 ring-emerald-500/20">
                            {f.avatar && (
                              <Image
                                src={f.avatar}
                                alt={f.name}
                                width={56}
                                height={56}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 animate-pulse rounded-full border-[3px] border-background bg-emerald-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold">{f.name}</div>
                          <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            Đang hoạt động
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRemove(f)}>
                            <UserMinus className="mr-2 h-4 w-4" />
                            Xóa bạn
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBlock(f)} className="text-destructive focus:text-destructive">
                            <Ban className="mr-2 h-4 w-4" />
                            Chặn
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleMessage(f)} className="flex-1">
                        Nhắn tin
                      </Button>
                      <Button size="sm" onClick={() => handleInvite(f)} className="flex-1">
                        Mời
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={<div className="h-12 w-12 rounded-full bg-emerald-500/10 p-3"><Users className="h-full w-full text-emerald-600" /></div>}
              message="Không có bạn nào đang online" 
              description="Bạn bè của bạn hiện đang offline"
            />
          )}
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-8">
          {/* Incoming Requests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <UserPlus className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Lời mời đến</h3>
              <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {incomingRequests.length}
              </span>
            </div>
            {incomingRequests.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {incomingRequests.map((req) => (
                  <Card key={req.id} className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="p-4">
                      <div 
                        className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-80"
                        onClick={() => router.push(`/profile/${req.id}`)}
                      >
                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                          {req.avatar && (
                            <Image
                              src={req.avatar}
                              alt={req.name}
                              width={56}
                              height={56}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold">{req.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Muốn kết bạn với bạn
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" onClick={() => handleAcceptRequest(req)} className="flex-1">
                          <Check className="mr-1 h-4 w-4" />
                          Chấp nhận
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeclineRequest(req)} className="flex-1">
                          <X className="mr-1 h-4 w-4" />
                          Từ chối
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<UserPlus className="h-12 w-12" />}
                message="Không có lời mời kết bạn" 
                description="Bạn chưa nhận được lời mời nào"
              />
            )}
          </div>

          {/* Outgoing Requests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                <UserPlus className="h-4 w-4 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold">Lời mời đã gửi</h3>
              <span className="ml-auto rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-700 dark:text-amber-400">
                {outgoingRequests.length}
              </span>
            </div>
            {outgoingRequests.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {outgoingRequests.map((req) => (
                  <Card key={req.id} className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="p-4">
                      <div 
                        className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-80"
                        onClick={() => router.push(`/profile/${req.id}`)}
                      >
                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-amber-500/20">
                          {req.avatar && (
                            <Image
                              src={req.avatar}
                              alt={req.name}
                              width={56}
                              height={56}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold">{req.name}</div>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                            Đang chờ phản hồi
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" onClick={() => handleCancelRequest(req)} className="w-full">
                          Hủy lời mời
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<UserPlus className="h-12 w-12" />}
                message="Chưa gửi lời mời nào" 
                description="Bạn chưa gửi lời mời kết bạn nào"
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FriendsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ 
  icon, 
  message, 
  description 
}: { 
  icon: React.ReactNode;
  message: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
      <div className="mb-4 text-muted-foreground">{icon}</div>
      <h3 className="mb-1 font-semibold">{message}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
