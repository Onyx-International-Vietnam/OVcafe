"use client";

import { mockUser } from "@/lib/helpers/mock";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, UserCheck, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const user = mockUser(userId, `User ${userId}`);
  
  const [friendStatus, setFriendStatus] = useState<"none" | "pending" | "friends">("none");

  const handleFriendAction = () => {
    if (friendStatus === "none") {
      setFriendStatus("pending");
      // TODO: Call API to send friend request
    } else if (friendStatus === "pending") {
      setFriendStatus("none");
      // TODO: Call API to cancel friend request
    } else {
      setFriendStatus("none");
      // TODO: Call API to unfriend
    }
  };

  const getFriendButtonProps = () => {
    switch (friendStatus) {
      case "pending":
        return {
          text: "Hủy lời mời",
          icon: <UserCheck className="h-4 w-4" />,
          variant: "secondary" as const
        };
      case "friends":
        return {
          text: "Bạn bè",
          icon: <Users className="h-4 w-4" />,
          variant: "secondary" as const
        };
      default:
        return {
          text: "Kết bạn",
          icon: <UserPlus className="h-4 w-4" />,
          variant: "default" as const
        };
    }
  };

  const buttonProps = getFriendButtonProps();

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-48 md:h-64 bg-muted overflow-hidden group">
          <img 
            src={`https://picsum.photos/seed/cover-${userId}/1200/400`}
            alt="Cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <Button 
            variant="secondary" 
            size="sm"
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="h-4 w-4 mr-2" />
            Chỉnh sửa ảnh bìa
          </Button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            {/* Avatar */}
            <div className="-mt-16 h-32 w-32 rounded-full border-4 border-background bg-muted overflow-hidden flex-shrink-0 group relative">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`}
                alt={user.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            
            {/* Name & Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold truncate">{user.name}</h1>
              <p className="text-sm text-muted-foreground">@user{userId}</p>
              <p className="mt-2 text-sm">
                ☕ Coffee enthusiast | 📸 Photography lover | 🌏 Traveler
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link href={`/messages?userId=${userId}`}>
                <Button variant="outline">Nhắn tin</Button>
              </Link>
              <Button 
                variant={buttonProps.variant}
                onClick={handleFriendAction}
              >
                {buttonProps.icon}
                <span className="ml-2">{buttonProps.text}</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 flex gap-6 border-t pt-4">
            <div>
              <div className="text-xl font-bold">142</div>
              <div className="text-xs text-muted-foreground">Bài viết</div>
            </div>
            <div>
              <div className="text-xl font-bold">1.2K</div>
              <div className="text-xs text-muted-foreground">Người theo dõi</div>
            </div>
            <div>
              <div className="text-xl font-bold">856</div>
              <div className="text-xs text-muted-foreground">Đang theo dõi</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Photos Grid */}
      <Card className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Ảnh</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted group relative cursor-pointer">
              <img 
                src={`https://picsum.photos/seed/${userId}-photo-${i}/400/400`}
                alt={`Photo ${i + 1}`}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
