"use client";

type Props = { open?: boolean; onClose?: () => void; userName?: string };
export default function BanUserDialog({ open, onClose, userName = "User" }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-full max-w-md rounded-xl border bg-white p-4">
        <div className="text-base font-semibold">Ban người dùng</div>
        <p className="help mt-1">Bạn có chắc muốn ban <b>{userName}</b>?</p>
        <div className="mt-3 grid gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="ban" defaultChecked /> Tạm thời
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="ban" /> Vĩnh viễn
          </label>
          <input className="input" placeholder="Lý do (tuỳ chọn)" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>Hủy</button>
          <button className="btn btn-primary" onClick={onClose}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
}
