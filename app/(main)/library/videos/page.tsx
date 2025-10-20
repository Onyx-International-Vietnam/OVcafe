import { mockMedia } from "@/lib/helpers/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { VideoUploadDialog } from "@/components/ui/library/video-upload-dialog";
import { VideosEmptyState } from "@/components/ui/library/VideosEmptyState";
import { VideoCardSkeleton } from "@/components/ui/library/VideoCardSkeleton";
import { Search, Clock, Eye, Lock, Globe, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function VideoGrid() {
  const items = mockMedia("video", 8);
  
  if (items.length === 0) {
    return <VideosEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((v) => (
        <Link key={v.id} href={`/library/videos/${v.id}`}>
          <Card className="overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative aspect-video bg-muted">
              {v.thumb && (
                <Image
                  src={v.thumb}
                  alt={v.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              )}
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>5:32</span>
              </div>
            </div>
            <CardContent className="p-3 space-y-2">
              <div className="truncate text-sm font-medium">{v.title}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>1.2K views</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {v.visibility === "all" && <Globe className="h-3 w-3 mr-1" />}
                  {v.visibility === "invited" && <Lock className="h-3 w-3 mr-1" />}
                  {v.visibility === "selected" && <Link2 className="h-3 w-3 mr-1" />}
                  {v.visibility.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl">Thư viện video</h1>
        <VideoUploadDialog />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search videos..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all-visibility">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-visibility">All</SelectItem>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
              <SelectItem value="selected">Selected</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="views">Most Views</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Video Grid with Suspense */}
      <Suspense fallback={<VideoGridSkeleton />}>
        <VideoGrid />
      </Suspense>
    </div>
  );
}
