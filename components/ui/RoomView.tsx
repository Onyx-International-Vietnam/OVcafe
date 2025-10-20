"use client";

import { RoomLayout } from "@/components/ui/rooms/RoomLayout";
import { RoomNotifications } from "@/components/ui/rooms/RoomNotifications";
import type { SidebarTab } from "@/lib/helpers/constants";

interface RoomViewProps {
  roomId: string;
  initialTab: SidebarTab;
}

export default function RoomView({ roomId, initialTab }: RoomViewProps) {
  // TODO: Replace with actual user role logic from your auth system
  const isOwner = true;
  const isModerator = false;

  return (
    <>
      <RoomLayout
        roomId={roomId}
        initialTab={initialTab}
        isOwner={isOwner}
        isModerator={isModerator}
      >
        {/* Player/Stage Area - Add your video/audio components here */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Room: {roomId}</h1>
            <p className="text-muted-foreground">
              Video conference stage will appear here
            </p>
            {/* TODO: Integrate WebRTC components */}
          </div>
        </div>
      </RoomLayout>

      {/* In-room notifications */}
      <RoomNotifications roomId={roomId} />
    </>
  );
}
