import { UsersDataTable } from "@/components/ui/admin/UsersDataTable";
import { Card } from "@/components/ui/card";

export default async function AdminUsersPage() {
  // TODO: Fetch real users from database with pagination
  const users = [
    { id: "1", email: "user1@example.com", name: "Nguyen Van A", status: "active", createdAt: new Date("2024-01-15") },
    { id: "2", email: "user2@example.com", name: "Tran Thi B", status: "banned", createdAt: new Date("2024-02-01") },
    { id: "3", email: "user3@example.com", name: "Le Van C", status: "active", createdAt: new Date("2024-03-10") },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
            Admin • Quản lý Users
          </h1>
          <p className="text-sm text-muted-foreground">
            Xem, ban, hoặc xóa tài khoản người dùng.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
          Chế độ Admin
        </span>
      </div>

      <Card className="p-6">
        <UsersDataTable data={users} />
      </Card>
    </div>
  );
}
