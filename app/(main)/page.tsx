"use client";

import { useState } from "react";
import { mockRooms } from "@/lib/helpers/mock";
import RoomCard from "@/components/ui/RoomCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, TrendingUp, Search, Grid3x3, Filter, Eye, ArrowUpDown, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
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

      {/* Advanced Toolbar */}
      <Card className="shadow-sm py-0">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search with icon */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                className="pl-9 h-9 sm:h-10"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Filter by Status */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 sm:h-10 flex-1 sm:flex-none min-w-0">
                    <Filter className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Trạng thái</span>
                    {statusFilter !== "all" && (
                      <Badge variant="secondary" className="ml-1 sm:ml-2 h-5 px-1 hidden xs:inline-flex">1</Badge>
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
                  <Button variant="outline" size="sm" className="h-9 sm:h-10 flex-1 sm:flex-none min-w-0">
                    <Eye className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate hidden xs:inline">Hiển thị</span>
                    <span className="truncate xs:hidden">Hiện</span>
                    {visibilityFilter !== "all" && (
                      <Badge variant="secondary" className="ml-1 sm:ml-2 h-5 px-1 hidden xs:inline-flex">1</Badge>
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
                  <Button variant="outline" size="sm" className="h-9 sm:h-10 flex-1 sm:flex-none min-w-0">
                    <ArrowUpDown className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Sắp xếp</span>
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

              <div className="h-10 w-px bg-border hidden md:block" />

              {/* View Toggle */}
              <div className="flex items-center rounded-lg border bg-background shadow-sm">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-9 px-2 sm:px-3 rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-9 px-2 sm:px-3 rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
