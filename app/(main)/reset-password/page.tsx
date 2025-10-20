"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<"valid" | "invalid" | "expired" | "checking">("checking");

  useEffect(() => {
    // Simulate token validation
    if (!token) {
      setTokenStatus("invalid");
      return;
    }

    setTimeout(() => {
      const random = Math.random();
      if (random < 0.2) {
        setTokenStatus("expired");
      } else if (random < 0.3) {
        setTokenStatus("invalid");
      } else {
        setTokenStatus("valid");
      }
    }, 1000);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate passwords
    if (newPassword.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.1) {
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      } else {
        setSuccess(true);
        setNewPassword("");
        setConfirmPassword("");
      }
      setIsLoading(false);
    }, 1000);
  };

  if (tokenStatus === "checking") {
    return (
      <div className="mx-auto max-w-md space-y-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Đang xác thực...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tokenStatus === "invalid" || tokenStatus === "expired") {
    return (
      <div className="mx-auto max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Đặt lại mật khẩu</h1>
          <p className="text-sm text-muted-foreground">
            Có vấn đề với liên kết của bạn.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                {tokenStatus === "expired"
                  ? "Liên kết đã hết hạn. Vui lòng yêu cầu liên kết mới."
                  : "Liên kết không hợp lệ. Vui lòng kiểm tra lại email của bạn."}
              </AlertDescription>
            </Alert>
            <Button className="w-full" asChild>
              <Link href="/forgot-password">Yêu cầu liên kết mới</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Đặt lại mật khẩu</h1>
        <p className="text-sm text-muted-foreground">
          Nhập mật khẩu mới của bạn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tạo mật khẩu mới</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Mật khẩu của bạn đã được đặt lại thành công!
                </AlertDescription>
              </Alert>
              <Button className="w-full" asChild>
                <Link href="/login">Đăng nhập ngay</Link>
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
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Tối thiểu 8 ký tự
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
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
