import RoomView from "@/components/ui/RoomView";
import type { SidebarTab } from "@/lib/helpers/constants";

const TABS: readonly SidebarTab[] = [
  "chat",
  "participants",
  "media",
  "files",
  "whiteboard",
  "data",
] as const;

function parseTabFromPath(seg?: string[]): SidebarTab {
  const v = seg?.[0] ?? "chat";
  return (TABS as readonly string[]).includes(v) ? (v as SidebarTab) : "chat";
}

export default function Page({
  params,
}: {
  params: { roomId: string; tab?: string[] };
}) {
  const { roomId, tab } = params;
  const initialTab = parseTabFromPath(tab);

  return <RoomView roomId={roomId} initialTab={initialTab} />;
}
