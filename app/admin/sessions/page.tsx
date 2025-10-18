import { mockActiveSessions } from "@/lib/helpers/mock";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default async function Page() {
  const sessions = mockActiveSessions(7);
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
            Admin • Phiên đang chạy
          </h1>
          <p className="text-sm text-muted-foreground">
            Tắt phiên, ban chủ phòng, hoặc khôi phục.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
          Chế độ Admin
        </span>
      </div>

      <Card className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>Phòng</TableHead>
              <TableHead>Chủ phòng</TableHead>
              <TableHead>Viewers</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell>{s.owner}</TableCell>
                <TableCell>{s.viewers}</TableCell>
                <TableCell>
                  {s.disabled ? (
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
                      Disabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                      Active
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-2">
                    <Button variant="outline">Tắt phiên</Button>
                    <Button variant="outline">Ban Owner</Button>
                    <Button>Khôi phục</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
