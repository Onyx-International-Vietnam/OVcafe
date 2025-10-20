import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Globe,
  Lock,
  MoreVertical,
  Settings,
  ExternalLink,
  Copy,
  Trash2,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface RoomCardProps {
  room: {
    id: string;
    title: string;
    isLive: boolean;
    viewerCount: number;
    isPublic?: boolean;
    tags?: string[];
    createdAt?: Date;
  };
  showActions?: boolean;
}

export default function RoomCard({ room, showActions = false }: RoomCardProps) {
  const timeAgo = room.createdAt
    ? getTimeAgo(room.createdAt)
    : "Vừa xong";

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
      <CardContent className="p-0">
        {/* Thumbnail with gradient overlay */}
        <Link href={`/rooms/${room.id}`} className="block relative">
          <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
            {/* Placeholder background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            
            {/* Live/Offline Badge */}
            <div className="absolute top-3 left-3 z-10">
              {room.isLive ? (
                <Badge className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/50 border-0">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    LIVE
                  </span>
                </Badge>
              ) : (
                <Badge variant="secondary" className="shadow-md backdrop-blur-sm bg-background/80">
                  Offline
                </Badge>
              )}
            </div>

            {/* Viewer count */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/75 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg">
              <Users className="h-3 w-3" />
              <span>{room.viewerCount.toLocaleString()}</span>
            </div>

            {/* Play icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary text-primary-foreground rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                <ExternalLink className="h-6 w-6" />
              </div>
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and Actions */}
          <div className="flex items-start justify-between gap-3">
            <Link href={`/rooms/${room.id}`} className="flex-1 min-w-0">
              <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                {room.title}
              </h3>
            </Link>
            
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/rooms/${room.id}`} className="cursor-pointer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Mở phòng
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/rooms/${room.id}/settings`} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Cài đặt
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Copy className="mr-2 h-4 w-4" />
                    Sao chép link
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa phòng
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Tags */}
          {room.tags && room.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {room.tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs px-2 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t">
            <span className="flex items-center gap-1">
              {room.isPublic !== false ? (
                <>
                  <Globe className="h-3 w-3" />
                  Công khai
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  Riêng tư
                </>
              )}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Vừa xong";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
}
