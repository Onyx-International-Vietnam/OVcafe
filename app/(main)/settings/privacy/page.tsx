"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function PrivacySettingsPage() {
  const [postVisibility, setPostVisibility] = useState("public");
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [allowMessages, setAllowMessages] = useState(true);
  const [allowTagging, setAllowTagging] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  const handleSave = () => {
    // TODO: Call API to save privacy settings
    console.log({
      postVisibility,
      profileVisibility,
      allowMessages,
      allowTagging,
      showOnlineStatus,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Riêng tư</h2>
        <p className="text-sm text-muted-foreground">
          Kiểm soát ai có thể xem nội dung và thông tin của bạn
        </p>
      </div>

      <Separator />

      {/* Post Visibility */}
      <div className="space-y-2">
        <Label htmlFor="postVisibility">Chế độ hiển thị bài viết mặc định</Label>
        <Select value={postVisibility} onValueChange={setPostVisibility}>
          <SelectTrigger id="postVisibility">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Công khai</SelectItem>
            <SelectItem value="friends">Bạn bè</SelectItem>
            <SelectItem value="private">Chỉ mình tôi</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Áp dụng cho các bài viết mới
        </p>
      </div>

      {/* Profile Visibility */}
      <div className="space-y-2">
        <Label htmlFor="profileVisibility">Ai có thể xem hồ sơ của bạn</Label>
        <Select value={profileVisibility} onValueChange={setProfileVisibility}>
          <SelectTrigger id="profileVisibility">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Mọi người</SelectItem>
            <SelectItem value="friends">Chỉ bạn bè</SelectItem>
            <SelectItem value="private">Không ai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Messaging */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Cho phép nhắn tin</Label>
          <p className="text-xs text-muted-foreground">
            Người khác có thể gửi tin nhắn cho bạn
          </p>
        </div>
        <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
      </div>

      {/* Tagging */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Cho phép gắn thẻ</Label>
          <p className="text-xs text-muted-foreground">
            Người khác có thể gắn thẻ bạn trong bài viết
          </p>
        </div>
        <Switch checked={allowTagging} onCheckedChange={setAllowTagging} />
      </div>

      {/* Online Status */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Hiển thị trạng thái trực tuyến</Label>
          <p className="text-xs text-muted-foreground">
            Cho phép người khác biết khi bạn đang online
          </p>
        </div>
        <Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
      </div>

      <Separator />

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Hủy</Button>
        <Button onClick={handleSave}>Lưu thay đổi</Button>
      </div>
    </div>
  );
}
