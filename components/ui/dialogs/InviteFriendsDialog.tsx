"use client";

type Props = { open?: boolean; onClose?: () => void };
export default function InviteFriendsDialog({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-full max-w-md rounded-xl border bg-white p-4">
        <div className="text-base font-semibold">Mời bạn vào phòng</div>
        <p className="help mt-1">Chọn bạn bè để gửi lời mời.</p>
        <div className="mt-3 grid gap-2">
          {[...Array(6)].map((_, i) => (
            <label key={i} className="flex items-center justify-between rounded-md border p-2 text-sm">
              <span>Friend {i + 1}</span>
              <button className="btn btn-outline">Mời</button>
            </label>
          ))}
        </div>
        <div className="mt-4 text-right">
          <button className="btn btn-primary" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}
