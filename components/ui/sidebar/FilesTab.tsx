"use client";

import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, FileImage, Download, Share2, Play } from "lucide-react";

export default function FilesTab() {
  const files = [
    {
      name: "Báo cáo tài chính Q4.pdf",
      size: "2.4 MB",
      type: "pdf",
      uploadedBy: "Nguyễn Văn A",
      uploadedAt: "2 giờ trước",
    },
    {
      name: "Kế hoạch Marketing 2024.docx",
      size: "856 KB",
      type: "docx",
      uploadedBy: "Trần Thị B",
      uploadedAt: "5 giờ trước",
    },
    {
      name: "Dữ liệu khách hàng.xlsx",
      size: "1.2 MB",
      type: "xlsx",
      uploadedBy: "Lê Văn C",
      uploadedAt: "1 ngày trước",
    },
    {
      name: "Logo mới.png",
      size: "342 KB",
      type: "image",
      uploadedBy: "Phạm Thị D",
      uploadedAt: "2 ngày trước",
    },
    {
      name: "Presentation slides.pdf",
      size: "5.8 MB",
      type: "pdf",
      uploadedBy: "Hoàng Văn E",
      uploadedAt: "3 ngày trước",
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "xlsx":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case "image":
        return <FileImage className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Chia sẻ tệp</h3>
          <p className="text-xs text-muted-foreground">{files.length} tệp tin</p>
        </div>
        <Button size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Tải lên
        </Button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2">
        {files.map((file, i) => (
          <div
            key={i}
            className="group rounded-lg border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">{getFileIcon(file.type)}</div>
              
              <div className="min-w-0 flex-1 space-y-1">
                <div className="truncate font-medium text-sm leading-tight">
                  {file.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span className="truncate">{file.uploadedBy}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {file.uploadedAt}
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 flex-1 gap-1.5 text-xs"
              >
                <Play className="h-3.5 w-3.5" />
                Phát
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 flex-1 gap-1.5 text-xs"
              >
                <Share2 className="h-3.5 w-3.5" />
                Chia sẻ
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
