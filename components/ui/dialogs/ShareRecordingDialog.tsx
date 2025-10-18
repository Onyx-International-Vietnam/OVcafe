"use client";

import * as React from "react";
import type { Media } from "@/lib/helpers/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Visibility = Media["visibility"];

type Props = {
  open?: boolean;
  onClose?: () => void;
  initial?: Visibility;
  onShare?: (v: Visibility) => void;
};

export default function ShareRecordingDialog({
  open,
  onClose,
  initial = "all",
  onShare,
}: Props) {
  const [value, setValue] = React.useState<Visibility>(initial);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose?.(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chia sẻ bản ghi</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <Select value={value} onValueChange={(v) => setValue(v as Visibility)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn phạm vi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
              <SelectItem value="selected">Selected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button
            onClick={() => {
              onShare?.(value);
              onClose?.();
            }}
          >
            Chia sẻ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
