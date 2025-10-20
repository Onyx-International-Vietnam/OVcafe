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
    <div className="container mx-auto px-4 py-6 max-w-[1800px]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px]">
        {/* Main Content */}
        <div className="space-y-5 min-w-0">
          {/* Video Player */}
          <div className="rounded-xl overflow-hidden shadow-lg bg-black">
            <div className="relative aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <div className="text-6xl text-white">▶</div>
                  </div>
                  <p className="text-sm text-gray-400">Video Player Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="space-y-5">
            {/* Title & Badge */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex-1 leading-tight tracking-tight">
                  {video.title}
                </h1>
                <Badge variant="secondary" className="text-xs px-3 py-1 w-fit font-medium">
                  {video.visibility === "all" && <Globe className="h-3.5 w-3.5 mr-1.5" />}
                  {video.visibility === "invited" && <Lock className="h-3.5 w-3.5 mr-1.5" />}
                  {video.visibility === "selected" && <Link2 className="h-3.5 w-3.5 mr-1.5" />}
                  <span className="uppercase tracking-wide">{video.visibility}</span>
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 font-medium">
                  <Eye className="h-4 w-4" />
                  <span>1.2K views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>2 days ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>5:32</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default" size="default" className="flex-1 sm:flex-none shadow-md">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="default" className="flex-1 sm:flex-none">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <Separator className="my-5" />

            {/* Owner Info */}
            <div className="flex items-center gap-4 py-3">
              <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base sm:text-lg">John Doe</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Posted 2 days ago · 10K subscribers</div>
              </div>
              <Button variant="default" size="default" className="hidden sm:flex shadow-md">
                Subscribe
              </Button>
            </div>

            <Separator className="my-5" />

            {/* Description */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-base">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer px-3 py-1">
                #travel
              </Badge>
              <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer px-3 py-1">
                #vlog
              </Badge>
              <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer px-3 py-1">
                #2024
              </Badge>
            </div>
          </div>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Related Videos</h3>
            <Badge variant="secondary" className="text-xs">{relatedVideos.length}</Badge>
          </div>
          
          <div className="space-y-4">
            {relatedVideos.map((v) => (
              <Link key={v.id} href={`/library/videos/${v.id}`}>
                <div className="group cursor-pointer rounded-lg overflow-hidden hover:bg-accent/50 transition-all p-2 -m-2">
                  <div className="flex gap-3">
                    <div className="relative w-[160px] aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                      {v.thumb && (
                        <img 
                          src={v.thumb} 
                          alt={v.title} 
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" 
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-0.5 rounded font-semibold">
                        5:32
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {v.title}
                      </h4>
                      <div className="text-xs text-muted-foreground font-medium">
                        John Doe
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>1.2K views</span>
                        <span>·</span>
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
