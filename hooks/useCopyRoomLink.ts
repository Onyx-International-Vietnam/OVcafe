export default function useCopyRoomLink(roomId?: string) {
    return async () => {
      const url = roomId ? `${location.origin}/rooms/${roomId}` : location.href;
      await navigator.clipboard.writeText(url);
      alert("Đã copy link phòng");
    };
  }
  