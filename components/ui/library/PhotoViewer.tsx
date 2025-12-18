"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface PhotoViewerProps {
  photo: {
    id: string;
    title: string;
    thumb?: string;
    visibility: "all" | "invited" | "selected";
  } | null;
  open: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function PhotoViewer({
  photo,
  open,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: PhotoViewerProps) {
  if (!photo) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-7xl h-[95vh] p-0 gap-0 bg-black/95 border-0">
        {/* Close Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Image Container */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {photo.thumb && (
            <Image
              src={photo.thumb}
              alt={photo.title}
              fill
              className="max-w-full max-h-full w-auto h-auto object-contain"
              quality={100}
              unoptimized
              priority
            />
          )}
        </div>

        {/* Previous Button */}
        {hasPrev && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onPrev?.();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        
        {/* Next Button */}
        {hasNext && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
