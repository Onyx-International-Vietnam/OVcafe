"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2, AlertCircle, Clock, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

type VerificationState = "sent" | "rate-limited" | "already-verified" | "expired" | "idle";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isResending, setIsResending] = useState(false);
  const [verificationState, setVerificationState] = useState<VerificationState>("sent");
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (verificationState === "rate-limited") {
      setVerificationState("idle");
    }
  }, [countdown, verificationState]);

  const handleResend = async () => {
    setIsResending(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate different responses
      const randomState = Math.random();
      if (randomState < 0.7) {
        setVerificationState("sent");
        setCountdown(60);
      } else if (randomState < 0.85) {
        setVerificationState("rate-limited");
        setCountdown(120);
        setError("Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.");
      } else if (randomState < 0.95) {
        setVerificationState("already-verified");
      } else {
        setVerificationState("expired");
        setError("Link xác nhận đã hết hạn. Vui lòng đăng ký lại.");
      }
    } catch (err) {
      setError("Không thể gửi lại email. Vui lòng thử lại sau.");
    } finally {
      setIsResending(false);
    }
  };

  const getStateAlert = () => {
    switch (verificationState) {
      case "sent":
        return (
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Email đã được gửi!</AlertTitle>
            <AlertDescription>
              Vui lòng kiểm tra hộp thư của bạn. Email xác nhận có thể mất vài phút để đến.
            </AlertDescription>
          </Alert>
        );
      case "already-verified":
        return (
          <Alert className="border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Email đã được xác nhận!</AlertTitle>
            <AlertDescription>
              Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập ngay bây giờ.
            </AlertDescription>
          </Alert>
        );
      case "rate-limited":
        return (
          <Alert variant="destructive">
            <Clock className="h-4 w-4" />
            <AlertTitle>Vui lòng chờ</AlertTitle>
            <AlertDescription>
              Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau {countdown} giây.
            </AlertDescription>
          </Alert>
        );
      case "expired":
        return (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Link đã hết hạn</AlertTitle>
            <AlertDescription>
              Link xác nhận đã hết hiệu lực. Vui lòng đăng ký lại để nhận link mới.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Xác nhận email</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Chúng tôi đã gửi link xác nhận đến email của bạn
        </p>
      </div>

      {getStateAlert()}

      {error && verificationState !== "rate-limited" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Kiểm tra email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-sm font-medium break-all">{email || "Không có email"}</p>
          </div>

          <div className="space-y-2 rounded-lg border bg-card p-4 text-sm">
            <p className="font-medium">Hướng dẫn:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Kiểm tra cả thư mục spam/junk</li>
              <li>• Link xác nhận có hiệu lực trong 24 giờ</li>
              <li>• Nhấp vào link trong email để kích hoạt tài khoản</li>
              <li>• Sau khi xác nhận, bạn có thể đăng nhập</li>
            </ul>
          </div>

          {verificationState === "already-verified" ? (
            <Button className="w-full" asChild>
              <a href="/login">Đăng nhập ngay</a>
            </Button>
          ) : verificationState === "expired" ? (
            <Button className="w-full" variant="default" asChild>
              <a href="/register">Đăng ký lại</a>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={isResending || countdown > 0 || verificationState === "rate-limited"}
            >
              {isResending
                ? "Đang gửi..."
                : countdown > 0
                ? `Gửi lại sau ${countdown}s`
                : "Gửi lại email xác nhận"}
            </Button>
          )}

          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <a
              className="font-medium underline underline-offset-4 hover:text-primary"
              href="/login"
            >
              Quay lại đăng nhập
            </a>
            <span>•</span>
            <a
              className="font-medium underline underline-offset-4 hover:text-primary"
              href="/support"
            >
              Cần hỗ trợ?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="text-center">
        <Skeleton className="mx-auto mb-4 h-16 w-16 rounded-full" />
        <Skeleton className="mx-auto h-8 w-48" />
        <Skeleton className="mx-auto mt-2 h-4 w-64" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="mx-auto h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
