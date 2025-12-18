"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const currentTab = pathname.split('/').pop() || 'profile';

  return (
    <div className="container w-full py-4 px-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Cài đặt</h1>
      
      <Tabs value={currentTab} onValueChange={(value) => router.push(`/settings/${value}`)}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 md:mb-6 h-auto">
          <TabsTrigger value="profile" className="text-sm md:text-base cursor-pointer">Hồ sơ</TabsTrigger>
          <TabsTrigger value="security" className="text-sm md:text-base cursor-pointer">Bảo mật</TabsTrigger>
          <TabsTrigger value="privacy" className="text-sm md:text-base cursor-pointer">Riêng tư</TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm md:text-base cursor-pointer">Thông báo</TabsTrigger>
        </TabsList>
        
        <Card className="p-4 md:p-6">
          {children}
        </Card>
      </Tabs>
    </div>
  );
}
