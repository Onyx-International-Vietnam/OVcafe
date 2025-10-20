"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function NotificationsSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    newFollower: true,
    newComment: true,
    newLike: false,
    newMessage: true,
    mentions: true,
    friendRequest: true,
  });

  const [appNotifications, setAppNotifications] = useState({
    newFollower: true,
    newComment: true,
    newLike: true,
    newMessage: true,
    mentions: true,
    friendRequest: true,
  });

  const handleEmailToggle = (key: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAppToggle = (key: keyof typeof appNotifications) => {
    setAppNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // TODO: Call API to save notification settings
    console.log({ emailNotifications, appNotifications });
  };

  const notificationTypes = [
    { key: "newFollower", label: "Người theo dõi mới", description: "Khi có người theo dõi bạn" },
    { key: "newComment", label: "Bình luận mới", description: "Khi có người bình luận bài viết của bạn" },
    { key: "newLike", label: "Lượt thích mới", description: "Khi có người thích bài viết của bạn" },
    { key: "newMessage", label: "Tin nhắn mới", description: "Khi có tin nhắn mới" },
    { key: "mentions", label: "Đề cập", description: "Khi có người nhắc đến bạn" },
    { key: "friendRequest", label: "Lời mời kết bạn", description: "Khi có lời mời kết bạn mới" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Thông báo</h2>
        <p className="text-sm text-muted-foreground">
          Quản lý cách bạn nhận thông báo
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="col-span-1" />
          <div className="text-center">
            <Label className="text-xs font-medium">Email</Label>
          </div>
          <div className="text-center">
            <Label className="text-xs font-medium">Ứng dụng</Label>
          </div>
        </div>

        {notificationTypes.map(({ key, label, description }) => (
          <div key={key} className="grid grid-cols-3 gap-4 items-center">
            <div className="col-span-1">
              <Label className="font-normal">{label}</Label>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <div className="flex justify-center">
              <Switch
                checked={emailNotifications[key as keyof typeof emailNotifications]}
                onCheckedChange={() => handleEmailToggle(key as keyof typeof emailNotifications)}
              />
            </div>
            <div className="flex justify-center">
              <Switch
                checked={appNotifications[key as keyof typeof appNotifications]}
                onCheckedChange={() => handleAppToggle(key as keyof typeof appNotifications)}
              />
            </div>
          </div>
        ))}
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
