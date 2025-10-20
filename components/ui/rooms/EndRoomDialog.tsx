"use client";

import { useRouter } from "next/navigation";
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

interface EndRoomDialogProps {
  roomId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EndRoomDialog({ roomId, open, onOpenChange }: EndRoomDialogProps) {
  const router = useRouter();

  const handleEndRoom = () => {
    // TODO: Implement end room logic
    router.push("/rooms");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>End Room</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to end this room? All participants will be
            disconnected and the room will be closed permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleEndRoom}
            className="bg-destructive hover:bg-destructive/90"
          >
            End Room
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
