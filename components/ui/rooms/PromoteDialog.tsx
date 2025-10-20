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

interface PromoteDialogProps {
  participant: { id: string; name: string; role: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PromoteDialog({ participant, open, onOpenChange }: PromoteDialogProps) {
  const isPromoting = participant.role === "member";

  const handleAction = () => {
    // TODO: Implement promote/demote logic
    toast.success(isPromoting ? "User promoted" : "User demoted", {
      description: `${participant.name} is now a ${isPromoting ? "moderator" : "member"}`,
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isPromoting ? "Promote to Moderator" : "Demote to Member"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPromoting
              ? `Give ${participant.name} moderator permissions? They will be able to manage participants.`
              : `Remove moderator permissions from ${participant.name}?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            {isPromoting ? "Promote" : "Demote"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
