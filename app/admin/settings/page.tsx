import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
          Cài đặt hệ thống
        </h1>
        <p className="text-sm text-muted-foreground">
          Quản lý cấu hình và thiết lập hệ thống.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt chung</CardTitle>
            <CardDescription>
              Thông tin cơ bản về website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Tên website</Label>
              <Input id="siteName" placeholder="OVCafe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Mô tả</Label>
              <Textarea 
                id="siteDescription" 
                placeholder="Mô tả về website của bạn"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email liên hệ</Label>
              <Input id="contactEmail" type="email" placeholder="admin@ovcafe.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bảo mật</CardTitle>
            <CardDescription>
              Cấu hình bảo mật và quyền truy cập
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Yêu cầu xác thực email</Label>
                <p className="text-sm text-muted-foreground">
                  Người dùng mới phải xác thực email
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bật chế độ bảo trì</Label>
                <p className="text-sm text-muted-foreground">
                  Chỉ admin có thể truy cập
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Số lần đăng nhập tối đa</Label>
              <Input 
                id="maxLoginAttempts" 
                type="number" 
                defaultValue="5"
                className="w-24"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Streaming</CardTitle>
            <CardDescription>
              Cài đặt liên quan đến live streaming
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxBitrate">Bitrate tối đa (kbps)</Label>
              <Input 
                id="maxBitrate" 
                type="number" 
                defaultValue="6000"
                className="w-32"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxViewers">Số người xem tối đa/phòng</Label>
              <Input 
                id="maxViewers" 
                type="number" 
                defaultValue="100"
                className="w-32"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép tải lại stream</Label>
                <p className="text-sm text-muted-foreground">
                  Lưu stream để xem lại
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nội dung</CardTitle>
            <CardDescription>
              Kiểm duyệt và quản lý nội dung
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bật bộ lọc từ ngữ</Label>
                <p className="text-sm text-muted-foreground">
                  Tự động chặn từ ngữ không phù hợp
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="bannedWords">Danh sách từ cấm</Label>
              <Textarea 
                id="bannedWords" 
                placeholder="Nhập các từ cấm, mỗi từ một dòng"
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Hủy</Button>
          <Button>Lưu thay đổi</Button>
        </div>
      </div>
    </div>
  );
}
