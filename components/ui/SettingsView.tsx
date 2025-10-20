"use client";

import { useState } from "react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Settings2, Lock, Shield, Wrench, Trash2, AlertTriangle, Menu, X } from "lucide-react";
import Button from "../common/Button";

type SettingsTab = "general" | "permissions" | "moderation" | "advanced";

interface SettingsViewProps {
  roomId: string;
  activeTab: SettingsTab;
  inSidebar?: boolean; // Thêm prop để biết có đang render trong sidebar không
}

export default function SettingsView({ roomId, activeTab: initialTab, inSidebar = false }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settings, setSettings] = useState({
    roomName: "My Awesome Room",
    description: "A collaborative space for team meetings",
    maxParticipants: 50,
    isPublic: true,
    allowRecording: true,
    allowScreenShare: true,
    requireApproval: false,
    muteOnEntry: false,
  });

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: "general", label: "General", icon: <Settings2 className="w-5 h-5" /> },
    { id: "permissions", label: "Permissions", icon: <Lock className="w-5 h-5" /> },
    { id: "moderation", label: "Moderation", icon: <Shield className="w-5 h-5" /> },
    { id: "advanced", label: "Advanced", icon: <Wrench className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Room Name</label>
              <Input
                type="text"
                value={settings.roomName}
                onChange={(e) => setSettings({ ...settings, roomName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <Textarea
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Max Participants</label>
              <Input
                type="number"
                value={settings.maxParticipants}
                onChange={(e) => setSettings({ ...settings, maxParticipants: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Public Room</div>
                <div className="text-xs text-gray-500">Anyone can join</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <Input
                  type="checkbox"
                  checked={settings.isPublic}
                  onChange={(e) => setSettings({ ...settings, isPublic: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );

      case "permissions":
        return (
          <div className="space-y-3">
            {[
              { id: "allowRecording", label: "Allow Recording", desc: "Members can record sessions" },
              { id: "allowScreenShare", label: "Allow Screen Share", desc: "Members can share their screen" },
              { id: "requireApproval", label: "Require Approval", desc: "Host must approve new members" },
            ].map((perm) => (
              <div key={perm.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <div className="font-medium text-sm">{perm.label}</div>
                  <div className="text-xs text-gray-500">{perm.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-3">
                  <Input
                    type="checkbox"
                    checked={settings[perm.id as keyof typeof settings] as boolean}
                    onChange={(e) => setSettings({ ...settings, [perm.id]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        );

      case "moderation":
        return (
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm mb-1">Moderation Tools</h4>
                <p className="text-xs text-gray-600">Control participant behavior and content</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium text-sm">Mute on Entry</div>
                <div className="text-xs text-gray-500">Auto-mute new participants</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <Input
                  type="checkbox"
                  checked={settings.muteOnEntry}
                  onChange={(e) => setSettings({ ...settings, muteOnEntry: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button className="w-full px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Ban List Management
            </button>
          </div>
        );

      case "advanced":
        return (
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs font-medium text-gray-600 mb-1">Room ID</div>
              <div className="font-mono text-sm">{roomId}</div>
            </div>
            <div className="p-3 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-600 text-sm">Danger Zone</h4>
              </div>
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                Delete Room
              </button>
            </div>
          </div>
        );
    }
  };

  // Nếu render trong sidebar của RoomView, chỉ hiện nội dung compact
  if (inSidebar) {
    return (
      <div className="h-full bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-3 border-b flex-shrink-0">
          <h3 className="font-semibold text-sm">Room Settings</h3>
        </div>
        
        {/* Tabs horizontal scroll */}
        <div className="flex gap-1 p-2 border-b overflow-x-auto flex-shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {renderContent()}
        </div>

        {/* Buttons */}
        <div className="flex-shrink-0 bg-white border-t p-2 flex gap-2">
          <button className="flex-1 px-3 py-1.5 border rounded-lg hover:bg-gray-50 transition-colors text-xs">
            Cancel
          </button>
          <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs">
            Save
          </button>
        </div>
      </div>
    );
  }

  // Render full page version (existing code)
  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50 flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden p-4 bg-white border-b flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Room Settings</h1>
          <p className="text-xs text-gray-600">Configure your room</p>
        </div>
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`
          fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
          transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Backdrop for mobile */}
        <div
          className="absolute inset-0 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />

        <div className="relative w-64 sm:w-72 lg:w-56 bg-white border-r flex-shrink-0 flex flex-col overflow-hidden h-full">
          {/* Desktop Header */}
          <div className="p-4 border-b flex-shrink-0 hidden lg:block">
            <h1 className="text-lg font-bold">Room Settings</h1>
            <p className="text-xs text-gray-600 mt-0.5">Configure your room</p>
          </div>

          {/* Mobile Header in Sidebar */}
          <div className="p-4 border-b flex-shrink-0 flex lg:hidden items-center justify-between">
            <div>
              <h1 className="text-lg font-bold">Settings</h1>
              <p className="text-xs text-gray-600">Choose a category</p>
            </div>
            <Button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Close sidebar on mobile after selecting
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              {renderContent()}
            </div>
          </div>
        </div>
        
        {/* Save Button - Fixed at bottom */}
        <div className="flex-shrink-0 bg-white border-t p-3 sm:p-4">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
            <button className="w-full sm:w-auto px-5 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm order-2 sm:order-1">
              Cancel
            </button>
            <button className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm order-1 sm:order-2">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
