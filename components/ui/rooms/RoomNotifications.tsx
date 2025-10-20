"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface RoomNotificationsProps {
  roomId: string;
}

export function RoomNotifications({ roomId }: RoomNotificationsProps) {
  useEffect(() => {
    // TODO: Subscribe to room events
    // Mock example:
    const handleUserJoin = (userName: string) => {
      toast.info("User joined", {
        description: `${userName} has joined the room`,
      });
    };

    const handleUserLeave = (userName: string) => {
      toast.info("User left", {
        description: `${userName} has left the room`,
      });
    };

    const handleUserKicked = (userName: string) => {
      toast.warning("User removed", {
        description: `${userName} was kicked from the room`,
      });
    };

    const handleUserBanned = (userName: string) => {
      toast.error("User banned", {
        description: `${userName} was banned from the room`,
      });
    };

    // Setup event listeners here
    // Cleanup on unmount
    return () => {
      // Remove event listeners
    };
  }, [roomId]);

  return null;
}
