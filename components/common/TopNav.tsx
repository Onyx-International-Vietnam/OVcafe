"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/helpers/utils";
import { Settings, User, LogOut, Bell, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Discover" },
  { href: "/rooms", label: "My Rooms" },
  { href: "/library/videos", label: "Videos" },
  { href: "/library/photos", label: "Photos" },
  { href: "/friends", label: "Friends" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 md:px-6">
        <Link href="/" className="font-extrabold tracking-tight text-lg md:text-xl">
          OVCAFE
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((i) => {
            const active = pathname === i.href;
            return (
              <Link
                key={i.href}
                href={i.href}
                className={cn(
                  "rounded-[var(--radius)] px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                  active && "bg-accent text-accent-foreground font-medium"
                )}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/create-room">Create Room</Link>
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9" asChild>
            <Link href="/notifications">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-red-500 text-[9px] md:text-[10px] font-bold text-white">
                3
              </span>
            </Link>
          </Button>
          
          {/* User Menu Dropdown - Hidden on mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hidden sm:flex">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile/1" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ của tôi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px] px-3">
              <div className="flex flex-col gap-4 py-4">
                {/* User info in mobile */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">User Name</span>
                    <span className="text-sm text-muted-foreground">user@example.com</span>
                  </div>
                </div>

                {/* Create Room Button - Mobile */}
                <Button asChild className="w-full">
                  <Link href="/create-room" onClick={() => setMobileMenuOpen(false)}>
                    Create Room
                  </Link>
                </Button>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1">
                  {NAV.map((i) => {
                    const active = pathname === i.href;
                    return (
                      <Link
                        key={i.href}
                        href={i.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "rounded-[var(--radius)] px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                          active && "bg-accent text-accent-foreground font-medium"
                        )}
                      >
                        {i.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* User Menu Items */}
                <div className="flex flex-col gap-1 pt-4 border-t">
                  <Link
                    href="/profile/1"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-[var(--radius)] px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Hồ sơ của tôi
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-[var(--radius)] px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Cài đặt
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-[var(--radius)] px-3 py-2.5 text-sm text-red-600 hover:bg-accent hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Đăng xuất
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
