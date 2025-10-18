import type { Role } from "./types";

export const canBan = (role: Role) => role === "owner" || role === "admin";
export const canRecord = (role: Role) => role === "owner";
export const canPresetQuality = (role: Role) => role === "owner";
export const canJoinSeat = (role: Role) => role === "viewer";
