import { LogsDataTable } from "@/components/ui/admin/LogsDataTable";
import { Card } from "@/components/ui/card";

export default async function AdminLogsPage() {
  // TODO: Fetch real logs from database with pagination
  const logs = [
    {
      id: "1",
      timestamp: new Date("2024-03-15T14:30:00"),
      actor: "admin@example.com",
      action: "ban_user",
      target: "user123@example.com",
      meta: { reason: "Spam", duration: "30d" },
    },
    {
      id: "2",
      timestamp: new Date("2024-03-15T14:25:00"),
      actor: "admin@example.com",
      action: "shutdown_session",
      target: "room-456",
      meta: { roomName: "Cafe Talk", viewers: 45 },
    },
    {
      id: "3",
      timestamp: new Date("2024-03-15T14:20:00"),
      actor: "admin@example.com",
      action: "add_ip_ban",
      target: "192.168.1.100",
      meta: { reason: "Abuse", duration: "permanent" },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
            Admin • Activity Logs
          </h1>
          <p className="text-sm text-muted-foreground">
            Lịch sử hành động của admin trong hệ thống.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
          Chế độ Admin
        </span>
      </div>

      <Card className="p-6">
        <LogsDataTable data={logs} />
      </Card>
    </div>
  );
}
