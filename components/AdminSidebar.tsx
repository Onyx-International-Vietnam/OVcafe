"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/chat-sessions", label: "Chat Sessions", icon: "📹" },
    { href: "/admin/ip-blocking", label: "IP Blocking", icon: "🚫" },
    { href: "/admin/reports", label: "Reports", icon: "⚠️" },
  ]

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold">OV</span>
          </div>
          <span className="text-lg font-bold">ADMIN</span>
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
