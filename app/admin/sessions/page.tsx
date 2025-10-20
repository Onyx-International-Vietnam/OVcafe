import { SessionsDataTable } from "@/components/ui/admin/SessionsDataTable";
import { Card } from "@/components/ui/card";

export default async function Page() {
  // TODO: Fetch real sessions from database
  const sessions = [
    { id: "1", roomId: "room-1", title: "Cafe Talk", owner: "user1@example.com", viewers: 45, startedAt: new Date("2024-03-15T10:00:00"), disabled: false },
    { id: "2", roomId: "room-2", title: "Study Session", owner: "user2@example.com", viewers: 12, startedAt: new Date("2024-03-15T11:30:00"), disabled: false },
    { id: "3", roomId: "room-3", title: "Music Lounge", owner: "user3@example.com", viewers: 78, startedAt: new Date("2024-03-15T09:15:00"), disabled: true },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
          Phiên đang chạy
        </h1>
        <p className="text-sm text-muted-foreground">
          Tắt phiên, ban chủ phòng, hoặc khôi phục.
        </p>
      </div>

      <Card className="p-6">
        <SessionsDataTable data={sessions} />
      </Card>
    </div>
  );
}
