"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Users, Bell, Check, X } from "lucide-react";

type NotificationType = "friend_request" | "room_invite" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionData?: {
    userId?: string;
    roomId?: string;
  };
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "friend_request",
    title: "Lời mời kết bạn",
    message: "Nguyễn Văn A muốn kết bạn với bạn",
    timestamp: "5 phút trước",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
    actionData: { userId: "user2" },
  },
  {
    id: "2",
    type: "room_invite",
    title: "Lời mời vào phòng",
    message: "Trần Thị B mời bạn tham gia phòng 'Chill Vibes'",
    timestamp: "1 giờ trước",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3",
    actionData: { roomId: "room1" },
  },
  {
    id: "3",
    type: "system",
    title: "Thông báo hệ thống",
    message: "Cập nhật phiên bản mới với nhiều tính năng thú vị",
    timestamp: "2 giờ trước",
    read: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [loading] = useState(false);

  const handleAccept = (id: string) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "friend_request":
        return <UserPlus className="h-5 w-5" />;
      case "room_invite":
        return <Users className="h-5 w-5" />;
      case "system":
        return <Bell className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32 sm:w-40" />
        </div>
        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-3 sm:p-4">
              <div className="flex gap-3 sm:gap-4">
                <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold">Thông báo</h1>
        {notifications.length > 0 && (
          <Button 
            variant="outline" 
            onClick={handleMarkAllRead}
            className="text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Đánh dấu tất cả đã đọc</span>
            <span className="sm:hidden">Đã đọc</span>
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="p-8 sm:p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-muted">
            <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-base sm:text-lg font-semibold">Không có thông báo mới</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bạn đã xem hết tất cả thông báo
          </p>
        </Card>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-3 sm:p-4 transition-colors ${
                !notification.read ? "bg-accent/50" : ""
              }`}
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  {notification.avatar ? (
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback>
                        {getIcon(notification.type)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-muted">
                      {getIcon(notification.type)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base">{notification.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </span>

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {notification.type === "friend_request" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleAccept(notification.id)}
                            className="flex-1 sm:flex-none text-xs"
                          >
                            <Check className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            Chấp nhận
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDismiss(notification.id)}
                            className="flex-1 sm:flex-none text-xs"
                          >
                            <X className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            Từ chối
                          </Button>
                        </>
                      )}
                      {notification.type === "room_invite" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleAccept(notification.id)}
                            className="flex-1 sm:flex-none text-xs"
                          >
                            Tham gia
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDismiss(notification.id)}
                            className="flex-1 sm:flex-none text-xs"
                          >
                            Bỏ qua
                          </Button>
                        </>
                      )}
                      {notification.type === "system" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDismiss(notification.id)}
                          className="w-full sm:w-auto text-xs"
                        >
                          Bỏ qua
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
