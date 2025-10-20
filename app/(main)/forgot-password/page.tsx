"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.2) {
        setError("Email không tồn tại trong hệ thống.");
      } else if (random < 0.3) {
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      } else {
        setSuccess(true);
        setEmail("");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quên mật khẩu</h1>
        <p className="text-sm text-muted-foreground">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Khôi phục mật khẩu</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  We emailed you a link. Vui lòng kiểm tra hộp thư của bạn.
                </AlertDescription>
              </Alert>
              <Button className="w-full" asChild>
                <Link href="/login">Quay lại đăng nhập</Link>
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Gửi liên kết"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                <Link className="underline" href="/login">
                  Quay lại đăng nhập
                </Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
