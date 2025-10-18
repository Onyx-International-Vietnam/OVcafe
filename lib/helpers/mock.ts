import type {
    Room,
    Slot,
    User,
    Media,
    Conversation,
    ActiveSession,
  } from "./types";
  
  /* ---------- helpers ---------- */
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  
  const pick = <T,>(arr: T[]) => arr[rand(0, arr.length - 1)];
  
  const userAvatar = (id: string, size = 128) =>
    `https://i.pravatar.cc/${size}?u=${encodeURIComponent(id)}`;
  
  const roomThumb = (seed: string, w = 1280, h = 720) =>
    `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  
  const mediaThumb = (seed: string, w = 640, h = 360) =>
    `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  
  const names = [
    "An","Bình","Châu","Dung","Duy","Hà","Hiếu","Hương","Khánh","Lan",
    "Long","Linh","Minh","My","Nam","Ngọc","Phát","Phương","Quân","Quỳnh",
    "Thảo","Thịnh","Trang","Trung","Trâm","Tuấn","Tú","Vy","Yến",
  ];
  
  /* ---------- users ---------- */
  export const mockUser = (id?: string, name?: string): User => {
    const uid = id ?? `u_${Math.random().toString(36).slice(2, 8)}`;
    const uname = name ?? `${pick(names)} ${rand(1, 99)}`;
    return {
      id: uid,
      name: uname,
      avatar: userAvatar(uid),
      online: Math.random() > 0.5,
    };
  };
  
  /* ---------- rooms ---------- */
  export const mockRoom = (id = "room-1"): Room => {
    const owner = mockUser(`owner_${id}`, `Host ${id.toUpperCase()}`);
    const featured: Slot = { role: "owner", user: owner };
    const count = rand(3, 6);
    const participants: Slot[] = Array.from({ length: count }, (_, i) => ({
      role: "participant",
      user: mockUser(`p_${id}_${i + 1}`),
    }));
  
    return {
      id,
      title: `OVCAFE • Room ${id}`,
      isLive: true,
      thumb: roomThumb(`room-${id}`, 1280, 720),
      featured,
      participants,
      presetQuality: "auto",
      isRecording: false,
      viewerCount: rand(800, 3200),
    };
  };
  
  export const mockRooms = (n: number): Room[] =>
    Array.from({ length: n }, (_, i) => mockRoom(`r${i + 1}`));
  
  /** mutate-style tick to make a room feel alive */
  export const mockRoomTick = (room: Room): Room => {
    const delta = rand(-8, 24);
    const viewerCount = Math.max(0, (room.viewerCount ?? 0) + delta);
  
    let featured = room.featured;
    let participants = [...room.participants];
    if (Math.random() < 0.1 && participants.length > 0) {
      const idx = rand(0, participants.length - 1);
      const pickP = participants[idx];
      participants[idx] = featured ?? pickP;
      featured = pickP;
    }
    if (participants.length < 6 && Math.random() < 0.25) {
      participants.push({ role: "participant", user: mockUser() });
    }
    if (participants.length > 2 && Math.random() < 0.12) {
      participants.splice(rand(0, participants.length - 1), 1);
    }
  
    const isRecording =
      Math.random() < 0.05 ? !room.isRecording : room.isRecording;
  
    return { ...room, viewerCount, featured, participants, isRecording };
  };
  
  /* ---------- media ---------- */
  export const mockMedia = (kind: Media["kind"], n: number): Media[] =>
    Array.from({ length: n }, (_, i) => {
      const id = `${kind}-${i + 1}`;
      const isSquare = kind === "photo";
      const thumb = isSquare ? mediaThumb(id, 512, 512) : mediaThumb(id, 640, 360);
      return {
        id,
        kind,
        title: `${kind.toUpperCase()} #${i + 1}`,
        visibility: (i % 3 === 0 ? "all" : i % 3 === 1 ? "invited" : "selected") as Media["visibility"],
        thumb,
      };
    });
  
  /* ---------- friends / messages / admin ---------- */
  export const mockFriends = (n: number) =>
    Array.from({ length: n }, (_, i) => mockUser(`f${i + 1}`, `Friend ${i + 1}`));
  
  export const mockConversations = (n: number): Conversation[] =>
    Array.from({ length: n }, (_, i) => ({
      id: `c${i + 1}`,
      name: `Friend ${i + 1}`,
      lastMessage: `Last message snippet ${i + 1}…`,
    }));
  
  export const mockActiveSessions = (n: number): ActiveSession[] =>
    Array.from({ length: n }, (_, i) => ({
      id: `s${i + 1}`,
      title: `Room r${i + 1}`,
      owner: `Owner ${i + 1}`,
      viewers: 100 + i * 7,
      disabled: i % 4 === 0,
    }));
  