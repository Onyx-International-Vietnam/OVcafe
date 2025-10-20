import { Home, Users, Calendar, Video, Image, FolderOpen, Bell, Settings, Menu } from "lucide-react";
// ...existing code...

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Friends", href: "/friends", icon: Users },
  { name: "Events", href: "/events", icon: Calendar },
  {
    name: "Library",
    icon: FolderOpen,
    children: [
      { name: "Videos", href: "/library/videos", icon: Video },
      { name: "Photos", href: "/library/photos", icon: Image },
    ],
  },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

// ...existing code...