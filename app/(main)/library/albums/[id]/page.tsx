import { mockMedia } from "@/lib/helpers/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Globe, Link2, Edit, Plus, Trash2, FolderInput } from "lucide-react";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const photos = mockMedia("photo", 16);

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1800px]">
      <div className="space-y-6">
        {/* Album Header */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Summer 2024</h1>
                <Badge variant="secondary" className="w-fit px-3 py-1 font-semibold">
                  <Globe className="h-3.5 w-3.5 mr-1.5" />
                  PUBLIC
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                Photos from our amazing summer vacation. Created on June 1, 2024
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{photos.length}</span>
                  <span>photos</span>
                </span>
              </div>
            </div>
            <Button variant="outline" size="default" className="w-full sm:w-auto shadow-sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Album
            </Button>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-card rounded-xl p-4 shadow-sm border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="default" className="shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Photos</span>
                <span className="sm:hidden">Add</span>
              </Button>
              <Button variant="outline" size="default">
                <FolderInput className="h-4 w-4 mr-2" />
                Move
              </Button>
              <Button variant="outline" size="default" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">
                0 selected
              </Badge>
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square">
              <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
                <Checkbox className="bg-white shadow-lg border-2 w-5 h-5" />
              </div>
              <div className="relative h-full rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 ring-2 ring-transparent hover:ring-primary">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50">
                  {photo.thumb && (
                    <Image
                      src={photo.thumb}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
