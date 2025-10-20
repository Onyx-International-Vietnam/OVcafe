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
    <div className="space-y-4">
      {/* Album Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Summer 2024</h1>
                <Badge variant="secondary">
                  <Globe className="h-3 w-3 mr-1" />
                  PUBLIC
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Photos from our amazing summer vacation. Created on June 1, 2024
              </p>
              <div className="text-sm text-muted-foreground">
                {photos.length} photos
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Album
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Photos
          </Button>
          <Button variant="outline" size="sm">
            <FolderInput className="h-4 w-4 mr-2" />
            Move to Album
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          0 selected
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square">
            <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Checkbox className="bg-white" />
            </div>
            <Card className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all h-full">
              <div className="relative aspect-square bg-muted">
                {photo.thumb && (
                  <Image
                    src={photo.thumb}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
