import "./globals.css";
import TopNav from "@/components/common/TopNav";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "OVCAFE",
  description: "Realtime video chat • 1 featured + 6 participants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <TopNav />
        <main className="container mx-auto max-w-7xl p-3 md:p-6">{children}</main>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
