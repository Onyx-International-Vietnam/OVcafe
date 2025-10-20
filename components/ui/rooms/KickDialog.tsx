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

interface KickDialogProps {
  participant: { id: string; name: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KickDialog({ participant, open, onOpenChange }: KickDialogProps) {
  const handleKick = () => {
    // TODO: Implement kick logic
    toast.warning("User kicked", {
      description: `${participant.name} has been removed from the room`,
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kick User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to kick <strong>{participant.name}</strong> from
            the room? They can rejoin if they have the link.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleKick} className="bg-orange-600 hover:bg-orange-700">
            Kick
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
