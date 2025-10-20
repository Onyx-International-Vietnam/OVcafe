import RoomView from "@/components/ui/RoomView";
import SettingsView from "@/components/ui/SettingsView";
import type { SidebarTab } from "@/lib/helpers/constants";

const TABS: readonly SidebarTab[] = [
  "chat",
  "participants",
  "media",
  "files",
  "whiteboard",
  "data",
  "settings",
] as const;

function parseTabFromPath(seg?: string[]): SidebarTab {
  const v = seg?.[0] ?? "chat";
  return (TABS as readonly string[]).includes(v) ? (v as SidebarTab) : "chat";
}

export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string; tab?: string[] }>;
}) {
  const { roomId, tab } = await params;
  const initialTab = parseTabFromPath(tab);

  // If settings tab, render full-page settings instead of RoomView
  if (initialTab === "settings") {
    return <SettingsView roomId={roomId} activeTab="general" />;
  }

  return <RoomView roomId={roomId} initialTab={initialTab} />;
}
