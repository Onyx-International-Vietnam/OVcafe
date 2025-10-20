import { Video } from "lucide-react";

export function VideosEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Video className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Upload your first video to get started
      </p>
    </div>
  );
}
