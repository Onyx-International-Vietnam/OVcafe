"use client";

import { useState } from "react";
import { mockRooms } from "@/lib/helpers/mock";
import RoomCard from "@/components/ui/RoomCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowUpDown,
  Grid3x3,
  List,
  Eye,
  Plus,
  Sparkles,
} from "lucide-react";

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const rooms = mockRooms(5).map((room) => ({
    ...room,
    tags: ["Gaming", "Chill", "Music"].slice(0, Math.floor(Math.random() * 3) + 1),
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    viewerCount: room.viewerCount ?? 0, // Ensure viewerCount is always defined
  }));
  
  const isLoading = false;
  const isEmpty = rooms.length === 0;

  return (
    <div className="space-y-6 p-0">
      {/* Header with gradient accent */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg -z-10" />
        <div className="flex items-end justify-between p-6 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Phòng của tôi
              </h1>
              <Badge variant="secondary" className="text-xs">
                {rooms.length} phòng
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Tạo, quản lý và vào phòng nhanh. Tất cả phòng của bạn ở một nơi.
            </p>
          </div>
          <Button asChild size="lg" className="shadow-lg shadow-primary/25">
            <Link href="/create-room">
              <Plus className="mr-2 h-4 w-4" />
              Tạo phòng mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Advanced Toolbar */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search with icon */}
            <div className="relative flex-1 max-w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên phòng..."
                className="pl-9 h-10"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Filter by Status */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    <Filter className="mr-2 h-4 w-4" />
                    Trạng thái
                    {statusFilter !== "all" && (
                      <Badge variant="secondary" className="ml-2 h-5 px-1">1</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Lọc theo trạng thái</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                    <DropdownMenuRadioItem value="all">
                      Tất cả
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="live">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-red-600 rounded-full" />
                        Đang live
                      </span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="upcoming">
                      Sắp diễn ra
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="offline">
                      Offline
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Filter by Visibility */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    <Eye className="mr-2 h-4 w-4" />
                    Hiển thị
                    {visibilityFilter !== "all" && (
                      <Badge variant="secondary" className="ml-2 h-5 px-1">1</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Lọc theo quyền truy cập</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={visibilityFilter} onValueChange={setVisibilityFilter}>
                    <DropdownMenuRadioItem value="all">
                      Tất cả
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="public">
                      Công khai
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="private">
                      Riêng tư
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sắp xếp
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>Sắp xếp theo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="recent">
                      Gần đây nhất
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="viewers">
                      Nhiều người xem nhất
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="title">
                      Tên A-Z
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="created">
                      Mới tạo nhất
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-10 w-px bg-border hidden sm:block" />

              {/* View Toggle */}
              <div className="flex items-center rounded-lg border bg-background shadow-sm">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-9 px-3 rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-9 px-3 rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && isEmpty && (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Chưa có phòng nào</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Bắt đầu bằng cách tạo phòng đầu tiên của bạn và chia sẻ với mọi người
            </p>
            <Button asChild size="lg" className="shadow-lg shadow-primary/25">
              <Link href="/create-room">
                <Plus className="mr-2 h-4 w-4" />
                Tạo phòng đầu tiên
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Room Grid/List */}
      {!isLoading && !isEmpty && (
        <div className={
          viewMode === "grid"
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-4"
        }>
          {rooms.map((r) => (
            <RoomCard key={r.id} room={r} showActions={true} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isEmpty && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Hiển thị <span className="font-semibold text-foreground">1-{rooms.length}</span> trong tổng số{" "}
                <span className="font-semibold text-foreground">{rooms.length}</span> phòng
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Trước
                </Button>
                <div className="flex items-center gap-1">
                  <Button variant="default" size="sm" className="w-8">
                    1
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8">
                    2
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8">
                    3
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Sau
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
