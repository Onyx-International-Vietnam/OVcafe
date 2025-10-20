"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserPlus, PhoneOff } from "lucide-react";
import type { SidebarTab } from "@/lib/helpers/constants";
import { ParticipantsTab } from "./ParticipantsTab";
import { InviteDialog } from "./InviteDialog";
import { EndRoomDialog } from "./EndRoomDialog";
import SettingsView from "@/components/ui/SettingsView";

interface RoomLayoutProps {
  roomId: string;
  initialTab: SidebarTab;
  isOwner: boolean;
  isModerator: boolean;
  children: React.ReactNode;
}

export function RoomLayout({
  roomId,
  initialTab,
  isOwner,
  isModerator,
  children,
}: RoomLayoutProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>(initialTab);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [endRoomOpen, setEndRoomOpen] = useState(false);

  const canModerate = isOwner || isModerator;

  return (
    <div className="flex h-screen flex-col">
      {/* Owner/Moderator Bar */}
      {canModerate && (
        <>
          <div className="flex items-center justify-between border-b bg-background px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Room Controls</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInviteOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Invite
              </Button>
              {isOwner && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setEndRoomOpen(true)}
                >
                  <PhoneOff className="mr-2 h-4 w-4" />
                  End Room
                </Button>
              )}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Player/Stage */}
        <div className="flex flex-1 items-center justify-center bg-muted/20">
          {children}
        </div>

        {/* Right Rail with Tabs */}
        <div className="w-80 border-l bg-background">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as SidebarTab)}
            className="flex h-full flex-col"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="participants">Users</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="whiteboard">Board</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Chat content here...
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="participants" className="flex-1 overflow-hidden">
              <ParticipantsTab
                roomId={roomId}
                canModerate={canModerate}
                isOwner={isOwner}
              />
            </TabsContent>

            <TabsContent value="media" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Media library here...
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="whiteboard" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Whiteboard here...
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="data" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Room data here...
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 overflow-hidden">
              <SettingsView roomId={roomId} activeTab="general" />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialogs */}
      <InviteDialog
        roomId={roomId}
        open={inviteOpen}
        onOpenChange={setInviteOpen}
      />
      <EndRoomDialog
        roomId={roomId}
        open={endRoomOpen}
        onOpenChange={setEndRoomOpen}
      />
    </div>
  );
}
