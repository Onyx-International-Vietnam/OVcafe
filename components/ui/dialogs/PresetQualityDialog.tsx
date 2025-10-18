"use client";

import * as React from "react";
import type { Quality } from "@/lib/helpers/types";
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

type Props = {
  open?: boolean;
  onClose?: () => void;
  initial?: Quality;
  onSave?: (q: Quality) => void;
};

export default function PresetQualityDialog({
  open,
  onClose,
  initial = "auto",
  onSave,
}: Props) {
  const [value, setValue] = React.useState<Quality>(initial);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose?.(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preset chất lượng phòng</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <Select value={value} onValueChange={(v) => setValue(v as Quality)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn chất lượng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button
            onClick={() => {
              onSave?.(value);
              onClose?.();
            }}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
