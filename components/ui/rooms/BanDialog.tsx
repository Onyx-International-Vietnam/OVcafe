"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface BanDialogProps {
  participant: { id: string; name: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BanDialog({ participant, open, onOpenChange }: BanDialogProps) {
  const handleBan = () => {
    // TODO: Implement ban logic
    toast.error("User banned", {
      description: `${participant.name} has been permanently banned from the room`,
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ban User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to permanently ban <strong>{participant.name}</strong>?
            This action will prevent them from rejoining the room.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleBan} className="bg-destructive hover:bg-destructive/90">
            Ban User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
