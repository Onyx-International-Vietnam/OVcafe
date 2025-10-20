import { IpBansDataTable } from "@/components/ui/admin/IpBansDataTable";
import { AddIpBanDialog } from "@/components/ui/admin/AddIpBanDialog";
import { Card } from "@/components/ui/card";

export default async function AdminIpsPage() {
  // TODO: Fetch real IP bans from database
  const ipBans = [
    {
      id: "1",
      ip: "192.168.1.100",
      reason: "Spam",
      addedBy: "admin@example.com",
      expiresAt: new Date("2024-12-31"),
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      ip: "10.0.0.50",
      reason: "Abuse",
      addedBy: "admin@example.com",
      expiresAt: null,
      createdAt: new Date("2024-02-01"),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
            Admin • IP Bans
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý IP bị cấm truy cập hệ thống.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AddIpBanDialog />
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
            Chế độ Admin
          </span>
        </div>
      </div>

      <Card className="p-6">
        <IpBansDataTable data={ipBans} />
      </Card>
    </div>
  );
}
