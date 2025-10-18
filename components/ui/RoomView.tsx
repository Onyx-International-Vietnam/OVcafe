"use client";

import * as React from "react";
import { toast } from "sonner";
import type { Room, Role, Quality } from "@/lib/helpers/types";
import { mockRoom, mockRoomTick } from "@/lib/helpers/mock";
import RoomHeader from "./RoomHeader";
import FeaturedStream from "./FeaturedStream";
import ParticipantGrid from "./ParticipantGrid";
import RightSidebar from "./RightSidebar";
import ControlBar from "./ControlBar";
import type { SidebarTab } from "@/lib/helpers/constants";

export default function RoomView({
  roomId,
  initialTab = "chat",
}: {
  roomId: string;
  initialTab?: SidebarTab;
}) {
  const [role, setRole] = React.useState<Role>("viewer");
  const [quality, setQuality] = React.useState<Quality>("auto");
  const [room, setRoom] = React.useState<Room>(() => mockRoom(roomId));

  // tick động
  React.useEffect(() => {
    const t = setInterval(() => setRoom((r) => mockRoomTick(r)), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid h-[calc(100dvh-140px)] grid-cols-1 gap-3 md:grid-cols-[1fr_360px]">
      <div className="flex min-h-0 flex-col gap-3">
        <RoomHeader room={room} role={role} onRoleChange={setRole} />
        <div className="grid min-h-0 flex-1 grid-rows-[1fr_auto] gap-3">
          <FeaturedStream room={room} role={role} quality={quality} />
          <ParticipantGrid room={room} role={role} />
        </div>
        <ControlBar
          role={role}
          quality={quality}
          onQualityChange={(q) => {
            setQuality(q);
            toast.info(`Quality → ${q.toUpperCase()}`);
          }}
          onJoinSeat={() => {
            setRole("participant");
            toast.success("Đã gửi yêu cầu lên ghế (demo)");
          }}
          onLeave={() => {
            setRole("viewer");
            toast("Đã rời ghế", { description: "Bạn quay về chế độ xem." });
          }}
          onRecordToggle={() => {
            setRoom((r) => ({ ...r, isRecording: !r.isRecording }));
            toast.success(
              room.isRecording ? "Đã tắt ghi hình" : "Đã bật ghi hình"
            );
          }}
        />
      </div>
      <RightSidebar initialTab={initialTab} room={room} role={role} />
    </div>
  );
}
