"use client";

import { mockUser } from "@/lib/helpers/mock";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, UserCheck, UserPlus, Users, Settings, Video, Images, Image as ImageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, use } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const user = mockUser(userId, `User ${userId}`);
  
  const currentUserId = "1";
  const isOwnProfile = userId === currentUserId;
  
  const [friendStatus, setFriendStatus] = useState<"none" | "pending" | "friends">("none");
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

  const handleFriendAction = () => {
    if (friendStatus === "none") {
      setFriendStatus("pending");
    } else if (friendStatus === "pending") {
      setFriendStatus("none");
    } else {
      setFriendStatus("none");
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

  // Mock albums data
  const albums = [...Array(8)].map((_, i) => ({
    id: i,
    name: `Album ${i + 1}`,
    photoCount: Math.floor(Math.random() * 50) + 10,
    coverPhoto: `https://picsum.photos/seed/${userId}-album-${i}/400/400`,
    photos: [...Array(Math.floor(Math.random() * 20) + 5)].map((_, j) => ({
      id: j,
      url: `https://picsum.photos/seed/${userId}-album-${i}-photo-${j}/400/400`,
      name: `Photo ${j + 1}`
    }))
  }));

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64 bg-muted overflow-hidden group">
          <Image 
            src={`https://picsum.photos/seed/cover-${userId}/1200/400`}
            alt="Cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          {isOwnProfile && (
            <Button 
              variant="secondary" 
              size="sm"
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="h-4 w-4 mr-2" />
              Chỉnh sửa ảnh bìa
            </Button>
          )}
        </div>

        <div className="relative px-6 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            <div className="-mt-16 h-32 w-32 rounded-full border-4 border-background bg-muted overflow-hidden flex-shrink-0 group relative">
              <Image 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`}
                alt={user.name}
                fill
                className="object-cover"
              />
              {isOwnProfile && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold truncate">{user.name}</h1>
              <p className="text-sm text-muted-foreground">@user{userId}</p>
            </div>

            <div className="flex gap-2">
              {isOwnProfile ? (
                <Link href="/settings/profile">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Chỉnh sửa trang cá nhân
                  </Button>
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="album" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="album" className="flex items-center gap-2">
            <Images className="h-4 w-4" />
            Album
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video
          </TabsTrigger>
        </TabsList>

        {/* Album Tab */}
        <TabsContent value="album" className="mt-4">
          <Card className="p-4">
            {selectedAlbum === null ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Album của tôi</h2>
                  {isOwnProfile && (
                    <Button variant="ghost" size="sm">
                      Tạo album mới
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {albums.map((album) => (
                    <div 
                      key={album.id} 
                      className="aspect-square rounded-lg overflow-hidden bg-muted group relative cursor-pointer"
                      onClick={() => setSelectedAlbum(album.id)}
                    >
                      <Image 
                        src={album.coverPhoto}
                        alt={album.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 left-2 text-white">
                          <p className="font-semibold text-sm">{album.name}</p>
                          <p className="text-xs text-white/80">{album.photoCount} ảnh</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedAlbum(null)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                    </Button>
                    <div>
                      <h2 className="text-lg font-semibold">{albums[selectedAlbum].name}</h2>
                      <p className="text-sm text-muted-foreground">{albums[selectedAlbum].photoCount} ảnh</p>
                    </div>
                  </div>
                  {isOwnProfile && (
                    <Button variant="ghost" size="sm">
                      Thêm ảnh
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {albums[selectedAlbum].photos.map((photo) => (
                    <div 
                      key={photo.id} 
                      className="aspect-square rounded-lg overflow-hidden bg-muted group relative cursor-pointer"
                    >
                      <Image 
                        src={photo.url}
                        alt={photo.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="mt-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Tất cả ảnh</h2>
              {isOwnProfile && (
                <Button variant="ghost" size="sm">
                  Tải ảnh lên
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted group relative cursor-pointer">
                  <Image 
                    src={`https://picsum.photos/seed/${userId}-photo-${i}/400/400`}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Video Tab */}
        <TabsContent value="video" className="mt-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Video của tôi</h2>
              {isOwnProfile && (
                <Button variant="ghost" size="sm">
                  Tải video lên
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-video rounded-lg overflow-hidden bg-muted group relative cursor-pointer">
                  <Image 
                    src={`https://picsum.photos/seed/${userId}-video-${i}/800/450`}
                    alt={`Video ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="h-6 w-6 text-primary ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(Math.random() * 10)}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
