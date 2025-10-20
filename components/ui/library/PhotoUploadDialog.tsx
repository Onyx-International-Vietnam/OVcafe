"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ImagePlus, Upload} from "lucide-react";

export function PhotoUploadDialog() {
  const [open, setOpen] = useState(false);
  const [uploading] = useState(false);
  const [progress] = useState(0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <ImagePlus className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Photos</DialogTitle>
          <DialogDescription>
            Upload photos to your library. You can add them to albums later.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dropzone */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="album">Album (Optional)</Label>
              <Select>
                <SelectTrigger id="album">
                  <SelectValue placeholder="Select album" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Album</SelectItem>
                  <SelectItem value="summer">Summer 2024</SelectItem>
                  <SelectItem value="travel">Travel Photos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <Select defaultValue="all">
                <SelectTrigger id="visibility">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Public - Anyone can see</SelectItem>
                  <SelectItem value="invited">Friends - Only friends</SelectItem>
                  <SelectItem value="selected">Private - Only me</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption (Optional)</Label>
              <Textarea
                id="caption"
                placeholder="Add a caption for all photos..."
                rows={3}
              />
            </div>
          </div>

          {/* Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Upload</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
