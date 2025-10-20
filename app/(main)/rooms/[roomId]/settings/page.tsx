import SettingsView from "@/components/ui/SettingsView";

type SettingsTab = "general" | "permissions" | "moderation" | "advanced";

const SETTINGS_TABS: readonly SettingsTab[] = [
  "general",
  "permissions",
  "moderation",
  "advanced",
] as const;

function parseSettingsTab(tab?: string): SettingsTab {
  return (SETTINGS_TABS as readonly string[]).includes(tab ?? "")
    ? (tab as SettingsTab)
    : "general";
}

export default async function SettingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { roomId } = await params;
  const { tab } = await searchParams;
  const activeTab = parseSettingsTab(tab);

  return <SettingsView roomId={roomId} activeTab={activeTab} />;
}
