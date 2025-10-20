import { mockMedia } from "@/lib/helpers/mock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Eye, ThumbsUp, Share2, Lock, Globe, Link2, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const video = mockMedia("video", 1)[0];
  const relatedVideos = mockMedia("video", 4);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <Card>
            <div className="relative aspect-video bg-black">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center space-y-2">
                  <div className="text-4xl">▶</div>
                  <p className="text-sm text-muted-foreground">Video Player Placeholder</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Video Info */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-xl font-bold flex-1">{video.title}</h1>
                  <Badge variant="secondary" className="text-xs">
                    {video.visibility === "all" && <Globe className="h-3 w-3 mr-1" />}
                    {video.visibility === "invited" && <Lock className="h-3 w-3 mr-1" />}
                    {video.visibility === "selected" && <Link2 className="h-3 w-3 mr-1" />}
                    {video.visibility.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>1.2K views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>2 days ago</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>5:32</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Separator />

              {/* Owner Info */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">Posted 2 days ago</div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">#travel</Badge>
                <Badge variant="outline">#vlog</Badge>
                <Badge variant="outline">#2024</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <h3 className="font-semibold">Related Videos</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedVideos.map((v) => (
                <Link key={v.id} href={`/library/videos/${v.id}`}>
                  <div className="flex gap-2 group cursor-pointer">
                    <div className="relative w-32 aspect-video bg-muted rounded overflow-hidden flex-shrink-0">
                      {v.thumb && (
                        <img src={v.thumb} alt={v.title} className="object-cover w-full h-full" />
                      )}
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        5:32
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                        {v.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        John Doe
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1.2K views · 2 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
