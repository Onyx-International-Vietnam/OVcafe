import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-5">
      <div className="text-[#F5F5F5]">
        <h1 className="text-xl font-bold md:text-2xl">Tạo phòng chat video</h1>
        <p className="text-sm text-muted-foreground">
          Đặt tên, mô tả và chọn tính năng bạn cần. Có thể đổi sau.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin phòng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Tên phòng</Label>
              <Input id="title" placeholder="OVCAFE • Chill Talk" />
            </div>
            <div className="space-y-2">
              <Label>Quyền riêng tư</Label>
              <Select defaultValue="public">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chế độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Công khai</SelectItem>
                  <SelectItem value="unlisted">Không công khai (link)</SelectItem>
                  <SelectItem value="private">Riêng tư (mời)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Mô tả</Label>
            <Textarea id="desc" placeholder="Mô tả ngắn về phòng..." rows={5} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-lg border p-3">
              <Checkbox id="rec" />
              <span className="text-sm">Ghi hình (Recording)</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border p-3">
              <Checkbox id="files" />
              <span className="text-sm">Chia sẻ file</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border p-3">
              <Checkbox id="wb" />
              <span className="text-sm">Whiteboard</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border p-3">
              <Checkbox id="data" />
              <span className="text-sm">Data Stream</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="/rooms">Hủy</Link>
            </Button>
            <Button>Tạo phòng</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
