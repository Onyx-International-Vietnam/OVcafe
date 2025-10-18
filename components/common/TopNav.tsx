"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/helpers/utils";

const NAV = [
  { href: "/", label: "Discover" },
  { href: "/rooms", label: "My Rooms" },
  { href: "/library/videos", label: "Videos" },
  { href: "/friends", label: "Friends" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 md:px-6">
        <Link href="/" className="font-extrabold tracking-tight">OVCAFE</Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((i) => {
            const active = pathname === i.href;
            return (
              <Link
                key={i.href}
                href={i.href}
                className={cn(
                  "rounded-[var(--radius)] px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                  active && "bg-accent text-accent-foreground"
                )}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/create-room">Create Room</Link>
          </Button>
          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden" asChild>
            <Link href="/">≡</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
