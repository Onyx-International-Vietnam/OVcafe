"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Copy, Search, Send } from "lucide-react";
import { toast } from "sonner";

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
}

interface InviteDialogProps {
  roomId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteDialog({ roomId, open, onOpenChange }: InviteDialogProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Mock friends - replace with real data
  const friends: Friend[] = [
    { id: "1", name: "Alice Johnson", online: true },
    { id: "2", name: "Bob Smith", online: false },
    { id: "3", name: "Carol Williams", online: true },
  ];

  const inviteLink = `${window.location.origin}/rooms/${roomId}`;

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    toast.success("Link copied!", {
      description: "Invite link copied to clipboard",
    });
  };

  const sendInvites = () => {
    toast.success("Invites sent!", {
      description: `Sent ${selected.size} invitation${selected.size !== 1 ? "s" : ""}`,
    });
    setSelected(new Set());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to Room</DialogTitle>
          <DialogDescription>
            Invite friends or share the room link
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Invite Link */}
          <div className="space-y-2">
            <Label>Room Link</Label>
            <div className="flex gap-2">
              <Input value={inviteLink} readOnly />
              <Button size="icon" variant="outline" onClick={copyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Friend Search */}
          <div className="space-y-2">
            <Label>Invite Friends</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Friends List */}
          <ScrollArea className="h-48 rounded-md border">
            <div className="p-2 space-y-1">
              {filteredFriends.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No friends found
                </p>
              ) : (
                filteredFriends.map((friend) => (
                  <label
                    key={friend.id}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-muted/50 cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.has(friend.id)}
                      onCheckedChange={() => toggleSelect(friend.id)}
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback>
                        {friend.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {friend.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </label>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={sendInvites}
            disabled={selected.size === 0}
          >
            <Send className="mr-2 h-4 w-4" />
            Send {selected.size > 0 && `(${selected.size})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
