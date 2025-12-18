"use client";

import Footer from "@/components/common/Footer";
import TopNav from "@/components/common/TopNav";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const specialPages = ["/login", "/register", "/create-room"];
  const isSpecialPage = specialPages.includes(pathname);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TopNav />

        <main
          className={
            isSpecialPage
              ? "flex-1 w-full bg-gradient-to-r from-[#171F31] via-[#3D4453] to-[#696E7A]"
              : "flex-1 container p-3 md:p-6 mx-auto max-w-7xl"
          }
        >
          {children}
        </main>

        {!isSpecialPage && <Footer />}
      </div>
    </>
  );
}
