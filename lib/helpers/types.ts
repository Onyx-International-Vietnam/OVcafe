export type Role = "viewer" | "participant" | "owner" | "admin";
export type Quality = "low" | "medium" | "high" | "auto";

export interface User {
  id: string;
  name: string;
  avatar?: string;   // URL ảnh đại diện
  online?: boolean;
}

export interface Slot {
  user?: User;
  role: Role;
}

export interface Room {
  id: string;
  title: string;
  isLive: boolean;
  thumb?: string;      // URL thumbnail phòng
  featured?: Slot;     // người được ghim
  participants: Slot[];// tối đa 6
  presetQuality?: Quality;
  isRecording?: boolean;
  viewerCount?: number;
}

export interface Media {
  id: string;
  kind: "recording" | "video" | "photo";
  title: string;
  visibility: "all" | "invited" | "selected";
  thumb?: string;      // URL thumbnail media
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
}

export interface ActiveSession {
  id: string;
  title: string;
  owner: string;
  viewers: number;
  disabled?: boolean;
}
