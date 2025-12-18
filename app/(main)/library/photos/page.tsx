import { mockMedia } from "@/lib/helpers/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { PhotoUploadDialog } from "@/components/ui/library/PhotoUploadDialog";
import {
  Search,
  FolderPlus,
  Lock,
  Globe,
  Link2,
  ImagePlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function PhotosGrid() {
  const items = mockMedia("photo", 12);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
        <ImagePlus className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold mb-2">No photos yet</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Upload your first photo to get started
        </p>
        <PhotoUploadDialog />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {items.map((photo) => (
        <div key={photo.id} className="group relative aspect-square">
          <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Checkbox className="bg-white shadow-md" />
          </div>
          <Card className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary hover:shadow-lg transition-all h-full">
            <div className="relative aspect-square bg-muted">
              {photo.thumb && (
                <Image
                  src={photo.thumb}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              )}
            </div>
          </Card>
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge variant="secondary" className="text-xs shadow-md">
              {photo.visibility === "all" && <Globe className="h-3 w-3" />}
              {photo.visibility === "invited" && <Lock className="h-3 w-3" />}
              {photo.visibility === "selected" && <Link2 className="h-3 w-3" />}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

async function AlbumsGrid() {
  const albums = [
    { id: "1", title: "Summer 2024", count: 45, cover: "/placeholder.svg" },
    { id: "2", title: "Travel Photos", count: 128, cover: "/placeholder.svg" },
    { id: "3", title: "Family", count: 67, cover: "/placeholder.svg" },
    { id: "4", title: "Work Events", count: 34, cover: "/placeholder.svg" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {albums.map((album) => (
        <Link key={album.id} href={`/library/albums/${album.id}`}>
          <Card className="overflow-hidden group cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-primary transition-all">
            <div className="relative aspect-video bg-muted">
              <Image
                src={album.cover}
                alt={album.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            </div>
            <CardContent className="p-3 sm:p-4">
              <div className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors">
                {album.title}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {album.count} photos
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default async function Page() {
  return (
    <div className="space-y-4 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Thư viện ảnh</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <FolderPlus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">New Album</span>
            <span className="sm:hidden">Album</span>
          </Button>
          <PhotoUploadDialog />
        </div>
      </div>

      <Tabs defaultValue="photos" className="space-y-4">
        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
          <TabsTrigger value="photos">All Photos</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4">
          {/* Toolbar */}
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search photos..." className="pl-9" />
                </div>
                <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                  <Select defaultValue="all-albums">
                    <SelectTrigger className="text-xs sm:text-sm">
                      <SelectValue placeholder="Album" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-albums">All Albums</SelectItem>
                      <SelectItem value="none">No Album</SelectItem>
                      <SelectItem value="summer">Summer 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-visibility">
                    <SelectTrigger className="text-xs sm:text-sm">
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-visibility">All</SelectItem>
                      <SelectItem value="all">Public</SelectItem>
                      <SelectItem value="invited">Friends</SelectItem>
                      <SelectItem value="selected">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="newest">
                    <SelectTrigger className="text-xs sm:text-sm">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Suspense
            fallback={
              <div className="text-center py-8 text-muted-foreground">
                Loading...
              </div>
            }
          >
            <PhotosGrid />
          </Suspense>
        </TabsContent>

        <TabsContent value="albums" className="space-y-4">
          <Suspense
            fallback={
              <div className="text-center py-8 text-muted-foreground">
                Loading...
              </div>
            }
          >
            <AlbumsGrid />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
