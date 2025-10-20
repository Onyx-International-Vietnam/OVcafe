import { mockRooms } from "@/lib/helpers/mock";
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
  MoreVertical,
  Eye,
  Users,
  Globe,
  Lock,
} from "lucide-react";

export default async function Page() {
  const rooms = mockRooms(5);
  const isLoading = false;
  const isEmpty = rooms.length === 0;

  return (
    <div className="space-y-6">
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

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm phòng..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter by Status */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Trạng thái
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Lọc theo trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">
                  Tất cả
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="live">
                  Đang live
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
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Hiển thị
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Lọc theo quyền truy cập</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="all">
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
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sắp xếp
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sắp xếp theo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="recent">
                <DropdownMenuRadioItem value="recent">
                  Gần đây nhất
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="viewers">
                  Nhiều người xem nhất
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="title">
                  Tên A-Z
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Toggle */}
          <div className="flex items-center rounded-md border">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-32 w-full mb-3 rounded-md" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && isEmpty && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Grid3x3 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Chưa có phòng nào</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bắt đầu bằng cách tạo phòng đầu tiên của bạn
            </p>
            <Button asChild>
              <Link href="/create-room">Tạo phòng đầu tiên</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Room Grid */}
      {!isLoading && !isEmpty && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r) => (
            <Card key={r.id} className="overflow-hidden hover:shadow-md transition-shadow group">
              <CardContent className="p-0">
                {/* Thumbnail */}
                <Link href={`/rooms/${r.id}`} className="block relative aspect-video bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {r.isLive && (
                    <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
                      <span className="animate-pulse mr-1">●</span> LIVE
                    </Badge>
                  )}
                  {!r.isLive && (
                    <Badge className="absolute top-2 left-2" variant="secondary">
                      Offline
                    </Badge>
                  )}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/75 text-white text-xs px-2 py-0.5 rounded">
                    <Users className="h-3 w-3" />
                    {r.viewerCount}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <Link href={`/rooms/${r.id}`}>
                        <h3 className="font-semibold truncate hover:text-primary transition-colors">
                          {r.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>Chủ phòng: Bạn</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          Công khai
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup>
                          <Link href={`/rooms/${r.id}`}>
                            <DropdownMenuRadioItem value="open" className="cursor-pointer">
                              Mở phòng
                            </DropdownMenuRadioItem>
                          </Link>
                          <Link href={`/rooms/${r.id}/settings`}>
                            <DropdownMenuRadioItem value="settings" className="cursor-pointer">
                              Cài đặt
                            </DropdownMenuRadioItem>
                          </Link>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isEmpty && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Hiển thị <span className="font-medium">1-{rooms.length}</span> trong tổng số{" "}
            <span className="font-medium">{rooms.length}</span> phòng
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Trước
            </Button>
            <Button variant="outline" size="sm" disabled>
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
