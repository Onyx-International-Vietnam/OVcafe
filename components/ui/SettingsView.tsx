"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BanList from "./BanList";

type SettingsTab = "general" | "permissions" | "moderation" | "advanced";

interface SettingsViewProps {
  roomId: string;
  activeTab: SettingsTab;
}

export default function SettingsView({ roomId, activeTab }: SettingsViewProps) {
  const [tab, setTab] = useState<SettingsTab>(activeTab);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-4 py-3">
        <h2 className="text-lg font-semibold">Room Settings</h2>
        <p className="text-xs text-muted-foreground">Manage your room configuration</p>
      </div>
      
      <Tabs value={tab} onValueChange={(v) => setTab(v as SettingsTab)} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3 grid w-[calc(100%-2rem)] grid-cols-2 gap-1">
          <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
          <TabsTrigger value="permissions" className="text-xs">Permissions</TabsTrigger>
          <TabsTrigger value="moderation" className="text-xs">Moderation</TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 px-4">
          <TabsContent value="general" className="mt-4 space-y-4 pb-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Basic Information</CardTitle>
                <CardDescription className="text-xs">Update your room details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="room-name" className="text-xs">Room Name</Label>
                  <Input 
                    id="room-name"
                    defaultValue="My Awesome Room"
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs">Description</Label>
                  <Textarea 
                    id="description"
                    defaultValue="Welcome to my room! Feel free to join and chat."
                    className="text-sm resize-none"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-type" className="text-xs">Room Type</Label>
                  <Select defaultValue="public">
                    <SelectTrigger id="room-type" className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="invite">Invite Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="mt-4 space-y-3 pb-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Participant Permissions</CardTitle>
                <CardDescription className="text-xs">Control what participants can do</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium">Share Screen</Label>
                    <p className="text-xs text-muted-foreground">Members can share their screen</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium">Upload Files</Label>
                    <p className="text-xs text-muted-foreground">Members can upload files to the room</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium">Use Whiteboard</Label>
                    <p className="text-xs text-muted-foreground">Members can draw on whiteboard</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium">Require Approval</Label>
                    <p className="text-xs text-muted-foreground">New members need approval</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="mt-4 pb-4">
            <BanList roomId={roomId} />
          </TabsContent>

          <TabsContent value="advanced" className="mt-4 space-y-3 pb-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Room Capacity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="max-participants" className="text-xs">Max Participants</Label>
                <Input 
                  id="max-participants"
                  type="number" 
                  defaultValue="50"
                  className="h-8 text-sm"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Recording Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recording-quality" className="text-xs">Recording Quality</Label>
                  <Select defaultValue="high">
                    <SelectTrigger id="recording-quality" className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (1080p)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="low">Low (480p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium">Enable Recording</Label>
                    <p className="text-xs text-muted-foreground">Auto-record all sessions</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium">End-to-End Encryption</Label>
                    <p className="text-xs text-muted-foreground">Maximum security mode</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
