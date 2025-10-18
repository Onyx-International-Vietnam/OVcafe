import type { Quality, Role } from "./types";

export const BRAND_NAME = "OVCAFE" as const;

/** Max seats in the participant grid (excluding the featured slot). */
export const MAX_PARTICIPANTS = 6 as const;

/** Key used for the highlighted/featured slot. */
export const FEATURED_KEY = "featured" as const;

/** Allowed qualities & defaults for media. */
export const QUALITIES: Quality[] = ["auto", "high", "medium", "low"];
export const DEFAULT_QUALITY: Quality = "auto";

/** Supported roles (kept in one place for UI filters, etc.). */
export const ROLES: Role[] = ["viewer", "participant", "owner", "admin"];

/** Room defaults */
export const DEFAULT_ROOM_IS_LIVE = true;
export const DEFAULT_ROOM_VIEWER_COUNT = 0;

/** Right sidebar tabs (for routing/state sync if needed). */
export const SIDEBAR_TABS = [
  "chat",
  "participants",
  "media",
  "files",
  "whiteboard",
  "data",
] as const;
export type SidebarTab = (typeof SIDEBAR_TABS)[number];

/** UI constants */
export const UI = {
  sidebarWidth: 360,
  radius: 12,
} as const;
