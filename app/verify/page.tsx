import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>Xác nhận email</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Chúng tôi đã gửi một liên kết xác nhận tới email của bạn. Hãy mở email và
          click vào liên kết để kích hoạt tài khoản.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="outline">Gửi lại email</Button>
          <Button>
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
