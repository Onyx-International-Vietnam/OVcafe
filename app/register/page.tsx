import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Đăng ký</h1>
        <p className="text-sm text-muted-foreground">
          Đăng ký xong, kiểm tra email để xác nhận.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên hiển thị</Label>
              <Input id="name" placeholder="OV User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full">Tạo tài khoản</Button>
            <p className="text-xs text-muted-foreground">
              Đã có tài khoản?{" "}
              <a className="underline" href="/login">
                Đăng nhập
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
