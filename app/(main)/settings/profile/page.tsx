"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Link as LinkIcon, Plus, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProfileSettingsPage() {
  const [displayName, setDisplayName] = useState("Your Name");
  const [bio, setBio] = useState("☕ Coffee enthusiast | 📸 Photography lover | 🌏 Traveler");
  const [links, setLinks] = useState([
    { id: 1, url: "https://example.com" },
  ]);
  const [avatarPreview, setAvatarPreview] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=user1");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    setLinks([...links, { id: Date.now(), url: "" }]);
  };

  const removeLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (id: number, url: string) => {
    setLinks(links.map(link => link.id === id ? { ...link, url } : link));
  };

  const handleSave = () => {
    // TODO: Call API to save profile changes
    console.log({ displayName, bio, links, avatar: avatarPreview });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Hồ sơ cá nhân</h2>
        <p className="text-sm text-muted-foreground">
          Cập nhật ảnh đại diện và thông tin cá nhân của bạn
        </p>
      </div>

      <Separator />

      {/* Avatar Upload */}
      <div className="space-y-2">
        <Label>Ảnh đại diện</Label>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24 rounded-full overflow-hidden group cursor-pointer">
            <Image 
              src={avatarPreview}
              alt="Avatar"
              fill
              className="object-cover"
            />
            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera className="h-6 w-6 text-white" />
              <Input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className="flex-1">
            <label htmlFor="avatar-upload">
              <Button variant="outline" size="sm" asChild>
                <span className="cursor-pointer">
                  <Camera className="h-4 w-4 mr-2" />
                  Tải ảnh lên
                </span>
              </Button>
            </label>
            <input 
              id="avatar-upload"
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarChange}
            />
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG hoặc GIF. Tối đa 2MB.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Display Name */}
      <div className="space-y-2">
        <Label htmlFor="displayName">Tên hiển thị</Label>
        <Input 
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Nhập tên hiển thị"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Tiểu sử</Label>
        <Textarea 
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Viết vài dòng về bản thân bạn..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          {bio.length}/200 ký tự
        </p>
      </div>

      <Separator />

      {/* Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Liên kết</Label>
          <Button 
            variant="outline" 
            size="sm"
            onClick={addLink}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm liên kết
          </Button>
        </div>
        
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  value={link.url}
                  onChange={(e) => updateLink(link.id, e.target.value)}
                  placeholder="https://example.com"
                  className="pl-10"
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeLink(link.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
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
