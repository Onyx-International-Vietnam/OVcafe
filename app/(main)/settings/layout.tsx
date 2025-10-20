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
    <div className="container max-w-4xl py-6">
      <h1 className="text-3xl font-bold mb-6">Cài đặt</h1>
      
      <Tabs value={currentTab} onValueChange={(value) => router.push(`/settings/${value}`)}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="privacy">Riêng tư</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        </TabsList>
        
        <Card className="p-6">
          {children}
        </Card>
      </Tabs>
    </div>
  );
}
