"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/chat-rooms", label: "Chat Rooms", icon: "📹" },
    { href: "/my-videos", label: "My Videos", icon: "🎬" },
    { href: "/my-photos", label: "My Photos", icon: "📸" },
    { href: "/friends", label: "Friends", icon: "👥" },
    { href: "/messages", label: "Messages", icon: "💬" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold">OV</span>
          </div>
          <span className="text-lg font-bold">CAFE</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                pathname === item.href
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent bg-transparent"
        >
          Logout
        </Button>
      </div>
    </aside>
  )
}
