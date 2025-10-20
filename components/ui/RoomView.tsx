"use client";

import { useState } from "react";
import type { SidebarTab } from "@/lib/helpers/constants";
import { 
  MessageCircle, 
  Users, 
  Video, 
  FileText, 
  PenTool, 
  BarChart3, 
  Settings,
  Send,
  Download,
  Circle,
  X,
  Menu
} from "lucide-react";
import Button from "../common/Button";
import SettingsView from "./SettingsView";

interface RoomViewProps {
  roomId: string;
  initialTab: SidebarTab;
}

// Fake data
const FAKE_MESSAGES = [
  { id: 1, user: "Alice", avatar: "A", message: "Hello everyone!", time: "10:30 AM" },
  { id: 2, user: "Bob", avatar: "B", message: "Hi Alice! How are you?", time: "10:32 AM" },
  { id: 3, user: "Charlie", avatar: "C", message: "Great to be here!", time: "10:35 AM" },
];

const FAKE_PARTICIPANTS = [
  { id: 1, name: "Alice", status: "online", avatar: "A", role: "Host" },
  { id: 2, name: "Bob", status: "online", avatar: "B", role: "Member" },
  { id: 3, name: "Charlie", status: "away", avatar: "C", role: "Member" },
  { id: 4, name: "Diana", status: "offline", avatar: "D", role: "Member" },
];

const FAKE_FILES = [
  { id: 1, name: "presentation.pdf", size: "2.4 MB", user: "Alice", date: "Today" },
  { id: 2, name: "report.docx", size: "1.2 MB", user: "Bob", date: "Yesterday" },
  { id: 3, name: "image.png", size: "856 KB", user: "Charlie", date: "2 days ago" },
];

export default function RoomView({ roomId, initialTab }: RoomViewProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>(initialTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
    { id: "chat", label: "Chat", icon: <MessageCircle className="w-5 h-5" /> },
    { id: "participants", label: "Participants", icon: <Users className="w-5 h-5" /> },
    { id: "media", label: "Media", icon: <Video className="w-5 h-5" /> },
    { id: "files", label: "Files", icon: <FileText className="w-5 h-5" /> },
    { id: "whiteboard", label: "Whiteboard", icon: <PenTool className="w-5 h-5" /> },
    { id: "data", label: "Data", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-3">
                {FAKE_MESSAGES.map((msg) => (
                  <div key={msg.id} className="flex gap-2 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-xs">{msg.user}</span>
                        <span className="text-[10px] text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-xs mt-0.5 break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case "participants":
        return (
          <div className="p-3 h-full overflow-y-auto">
            <h3 className="font-semibold text-sm mb-3">Participants ({FAKE_PARTICIPANTS.length})</h3>
            <div className="space-y-1.5">
              {FAKE_PARTICIPANTS.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-semibold">
                    {participant.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs truncate">{participant.name}</div>
                    <div className="text-[10px] text-gray-500">{participant.role}</div>
                  </div>
                  <Circle className={`w-2 h-2 fill-current ${
                    participant.status === "online" ? "text-green-500" :
                    participant.status === "away" ? "text-yellow-500" : "text-gray-300"
                  }`} />
                </div>
              ))}
            </div>
          </div>
        );

      case "files":
        return (
          <div className="p-3 h-full overflow-y-auto">
            <h3 className="font-semibold text-sm mb-3">Shared Files</h3>
            <div className="space-y-1.5">
              {FAKE_FILES.map((file) => (
                <div key={file.id} className="flex items-center gap-2 p-2 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs truncate">{file.name}</div>
                    <div className="text-[10px] text-gray-500">{file.size} • {file.user}</div>
                  </div>
                  <Button className="text-blue-500 hover:text-blue-700">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      case "media":
        return (
          <div className="p-3 h-full overflow-y-auto">
            <h3 className="font-semibold text-sm mb-3">Media Gallery</h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg" />
              ))}
            </div>
          </div>
        );

      case "whiteboard":
        return (
          <div className="p-3 h-full flex items-center justify-center">
            <div className="text-center">
              <PenTool className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <h3 className="font-semibold text-sm mb-1">Whiteboard</h3>
              <p className="text-gray-500 text-xs">Collaborative drawing</p>
            </div>
          </div>
        );

      case "data":
        return (
          <div className="p-3 h-full overflow-y-auto">
            <h3 className="font-semibold text-sm mb-3">Room Analytics</h3>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold">128</div>
                <div className="text-[10px] text-gray-600">Total Messages</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold">4</div>
                <div className="text-[10px] text-gray-600">Active Users</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold">12</div>
                <div className="text-[10px] text-gray-600">Files Shared</div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="h-full overflow-hidden">
            <SettingsView roomId={roomId} activeTab="general" inSidebar />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-gray-50 overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white min-w-0 order-1">
        {/* Header with mobile menu button */}
        <div className="p-3 border-b flex-shrink-0 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold truncate">Room: {roomId}</h2>
            <p className="text-xs text-gray-500">Video conference</p>
          </div>
          {/* Mobile menu toggle */}
          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Video Area */}
        <div className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden">
          <div className="text-center px-4">
            <Video className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 text-indigo-600" />
            <h3 className="text-base sm:text-lg font-semibold">Video Conference</h3>
            <p className="text-xs sm:text-sm text-gray-600">Camera feed will appear here</p>
          </div>
        </div>
      </div>

      {/* Sidebar - Mobile overlay / Desktop fixed */}
      <div
        className={`
          fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
          w-full lg:w-80 
          flex overflow-hidden
          transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          order-2
        `}
      >
        {/* Backdrop for mobile */}
        <div
          className="absolute inset-0 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Sidebar content */}
        <div className="relative ml-auto w-full sm:w-96 lg:w-80 border-l flex overflow-hidden bg-white h-full">
          {/* Close button for mobile */}
          <Button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-3 right-3 lg:hidden z-10 p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Tab Navigation */}
          <div className="w-14 sm:w-14 border-r bg-gray-50 flex flex-col py-2 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Không đóng sidebar khi chọn tab
                }}
                className={`flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title={tab.label}
              >
                {tab.icon}
                <span className="mt-1 text-[10px] hidden sm:block">{tab.label.slice(0, 4)}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 bg-white flex flex-col overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
