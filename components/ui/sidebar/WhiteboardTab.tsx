"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Maximize2, 
  Users, 
  Download, 
  Trash2, 
  PenTool,
  Square,
  Circle,
  Type,
  Eraser
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SavedBoard {
  id: string;
  name: string;
  thumbnail: string;
  date: string;
  participants: number;
}

export default function WhiteboardTab() {
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>("pen");

  // Fake data cho boards đã lưu
  const savedBoards: SavedBoard[] = [
    {
      id: "1",
      name: "Meeting Notes - 15/01",
      thumbnail: "bg-gradient-to-br from-blue-100 to-blue-200",
      date: "15/01/2024",
      participants: 5
    },
    {
      id: "2",
      name: "Brainstorm Session",
      thumbnail: "bg-gradient-to-br from-purple-100 to-purple-200",
      date: "12/01/2024",
      participants: 3
    },
    {
      id: "3",
      name: "Project Diagram",
      thumbnail: "bg-gradient-to-br from-green-100 to-green-200",
      date: "10/01/2024",
      participants: 7
    }
  ];

  const tools = [
    { id: "pen", icon: PenTool, label: "Bút vẽ" },
    { id: "square", icon: Square, label: "Hình vuông" },
    { id: "circle", icon: Circle, label: "Hình tròn" },
    { id: "text", icon: Type, label: "Văn bản" },
    { id: "eraser", icon: Eraser, label: "Tẩy" }
  ];

  return (
    <div className="space-y-4">
      {/* Canvas Preview Area */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">
                {isBoardOpen ? "Board đang mở" : "Board đã đóng"}
              </span>
            </div>
            {isSharing && (
              <Badge variant="secondary" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                Đang chia sẻ
              </Badge>
            )}
          </div>
          
          {/* Canvas placeholder */}
          <div className="bg-white dark:bg-slate-950 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 aspect-video flex items-center justify-center">
            {isBoardOpen ? (
              <div className="text-center space-y-2">
                <PenTool className="h-8 w-8 mx-auto text-blue-500" />
                <p className="text-sm text-muted-foreground">Canvas vẽ sẽ xuất hiện ở đây</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nhấn &ldquo;Mở Board&rdquo; để bắt đầu</p>
            )}
          </div>
        </div>

        {/* Tools bar */}
        {isBoardOpen && (
          <div className="p-3 border-t bg-background">
            <div className="flex items-center gap-1">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setSelectedTool(tool.id)}
                  title={tool.label}
                >
                  <tool.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={isBoardOpen ? "secondary" : "default"}
          className="w-full"
          onClick={() => setIsBoardOpen(!isBoardOpen)}
        >
          <Maximize2 className="h-4 w-4 mr-2" />
          {isBoardOpen ? "Đóng" : "Mở Board"}
        </Button>
        <Button
          variant={isSharing ? "secondary" : "outline"}
          className="w-full"
          onClick={() => setIsSharing(!isSharing)}
          disabled={!isBoardOpen}
        >
          <Users className="h-4 w-4 mr-2" />
          Chia sẻ
        </Button>
        <Button variant="outline" className="w-full" disabled={!isBoardOpen}>
          <Download className="h-4 w-4 mr-2" />
          Lưu
        </Button>
      </div>

      {/* Saved Boards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Boards đã lưu</h3>
          <Badge variant="secondary" className="text-xs">
            {savedBoards.length}
          </Badge>
        </div>
        
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {savedBoards.map((board) => (
              <Card key={board.id} className="p-3 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex gap-3">
                  <div className={`w-16 h-16 rounded ${board.thumbnail} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{board.name}</h4>
                    <p className="text-xs text-muted-foreground">{board.date}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{board.participants}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
