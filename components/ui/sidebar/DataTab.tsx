"use client";

import { Card } from "@/components/ui/card";
import { Activity, FileText, Download, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Fake data
const dataStreams = [
  { id: 1, type: "Analytics", value: "1,234 requests/min", status: "active", timestamp: "2 min ago" },
  { id: 2, type: "Database", value: "89% capacity", status: "warning", timestamp: "5 min ago" },
  { id: 3, type: "API Calls", value: "456 calls/sec", status: "active", timestamp: "1 min ago" },
  { id: 4, type: "Storage", value: "23.4 GB used", status: "normal", timestamp: "10 min ago" },
];

const filesList = [
  { id: 1, name: "report_2024.pdf", size: "2.4 MB", type: "PDF", modified: "2 hours ago" },
  { id: 2, name: "data_export.csv", size: "856 KB", type: "CSV", modified: "5 hours ago" },
  { id: 3, name: "presentation.pptx", size: "12.3 MB", type: "PPTX", modified: "1 day ago" },
  { id: 4, name: "analytics.json", size: "124 KB", type: "JSON", modified: "3 days ago" },
];

export default function DataTab() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "warning": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  return (
    <div className="space-y-4">
      {/* Data Stream Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <Activity className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Data Streams</h3>
        </div>
        <Card className="p-3">
          <ScrollArea className="h-[180px]">
            <div className="space-y-2">
              {dataStreams.map((stream) => (
                <div
                  key={stream.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{stream.type}</span>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusColor(stream.status)}`}>
                        {stream.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{stream.value}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{stream.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Files Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Recent Files</h3>
        </div>
        <Card className="p-3">
          <ScrollArea className="h-[180px]">
            <div className="space-y-2">
              {filesList.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.modified}</span>
                      </div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
