"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreVertical, Mic, MicOff, Video, VideoOff, Crown, Shield } from "lucide-react";
import { KickDialog } from "./KickDialog";
import { BanDialog } from "./BanDialog";
import { PromoteDialog } from "./PromoteDialog";

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  role: "owner" | "moderator" | "member";
  micOn: boolean;
  camOn: boolean;
}

interface ParticipantsTabProps {
  roomId: string;
  canModerate: boolean;
  isOwner: boolean;
}

export function ParticipantsTab({ canModerate, isOwner }: ParticipantsTabProps) {
  // Mock data - replace with real data from your state management
  const [participants] = useState<Participant[]>([
    {
      id: "1",
      name: "Room Owner",
      role: "owner",
      micOn: true,
      camOn: true,
    },
    {
      id: "2",
      name: "Moderator User",
      role: "moderator",
      micOn: true,
      camOn: false,
    },
    {
      id: "3",
      name: "Regular Member",
      role: "member",
      micOn: false,
      camOn: true,
    },
  ]);

  const [kickTarget, setKickTarget] = useState<Participant | null>(null);
  const [banTarget, setBanTarget] = useState<Participant | null>(null);
  const [promoteTarget, setPromoteTarget] = useState<Participant | null>(null);

  return (
    <>
      <ScrollArea className="h-full">
        <div className="space-y-1 p-2">
          <div className="px-2 py-1">
            <p className="text-xs font-medium text-muted-foreground">
              {participants.length} Participants
            </p>
          </div>

          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-2 rounded-md p-2 hover:bg-muted/50"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={participant.avatar} />
                <AvatarFallback>
                  {participant.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="truncate text-sm font-medium">
                    {participant.name}
                  </p>
                  {participant.role === "owner" && (
                    <Crown className="h-3 w-3 text-yellow-500" />
                  )}
                  {participant.role === "moderator" && (
                    <Shield className="h-3 w-3 text-blue-500" />
                  )}
                </div>
                <Badge variant="secondary" className="mt-0.5 h-4 text-[10px]">
                  {participant.role}
                </Badge>
              </div>

              <TooltipProvider>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-muted-foreground">
                        {participant.micOn ? (
                          <Mic className="h-4 w-4" />
                        ) : (
                          <MicOff className="h-4 w-4" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {participant.micOn ? "Mic on" : "Mic off"}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-muted-foreground">
                        {participant.camOn ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <VideoOff className="h-4 w-4" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {participant.camOn ? "Camera on" : "Camera off"}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>

              {canModerate && participant.role !== "owner" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isOwner && (
                      <>
                        <DropdownMenuItem
                          onClick={() => setPromoteTarget(participant)}
                        >
                          {participant.role === "moderator"
                            ? "Demote to Member"
                            : "Promote to Moderator"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem
                      onClick={() => setKickTarget(participant)}
                      className="text-orange-600"
                    >
                      Kick from Room
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setBanTarget(participant)}
                      className="text-destructive"
                    >
                      Ban from Room
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Moderation Dialogs */}
      {kickTarget && (
        <KickDialog
          participant={kickTarget}
          open={!!kickTarget}
          onOpenChange={(open) => !open && setKickTarget(null)}
        />
      )}
      {banTarget && (
        <BanDialog
          participant={banTarget}
          open={!!banTarget}
          onOpenChange={(open) => !open && setBanTarget(null)}
        />
      )}
      {promoteTarget && (
        <PromoteDialog
          participant={promoteTarget}
          open={!!promoteTarget}
          onOpenChange={(open) => !open && setPromoteTarget(null)}
        />
      )}
    </>
  );
}
