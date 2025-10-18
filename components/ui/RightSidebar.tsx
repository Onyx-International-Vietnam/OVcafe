"use client";

import * as React from "react";
import type { Room, Role } from "@/lib/helpers/types";
import ChatTab from "./sidebar/ChatTab";
import ParticipantsTab from "./sidebar/ParticipantsTab";
import MediaTab from "./sidebar/MediaTab";
import FilesTab from "./sidebar/FilesTab";
import WhiteboardTab from "./sidebar/WhiteboardTab";
import DataTab from "./sidebar/DataTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

type TabKey = "chat" | "participants" | "media" | "files" | "whiteboard" | "data";

export default function RightSidebar({
  initialTab = "chat",
  room,
  role,
}: {
  initialTab?: TabKey;
  room: Room;
  role: Role;
}) {
  const [tab, setTab] = React.useState<TabKey>(initialTab);

  return (
    <Card className="flex flex-col p-2 h-full overflow-hidden">
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as TabKey)}
        className="flex flex-col h-full overflow-hidden"
      >
        {/* Tabs header - không cho scroll ngang, wrap xuống dòng */}
        <TabsList className="mb-2 grid h-auto w-full grid-cols-3 gap-1 flex-shrink-0">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        {/* Vùng nội dung - flex-1 chiếm hết không gian còn lại */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="chat" className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
            <ChatTab />
          </TabsContent>
          <TabsContent value="participants" className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
            <ParticipantsTab room={room} role={role} />
          </TabsContent>
          <TabsContent value="media" className="m-0 h-full">
            <MediaTab />
          </TabsContent>
          <TabsContent value="files" className="m-0 h-full">
            <FilesTab />
          </TabsContent>
          <TabsContent value="whiteboard" className="m-0 h-full">
            <WhiteboardTab />
          </TabsContent>
          <TabsContent value="data" className="m-0 h-full">
            <DataTab />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
