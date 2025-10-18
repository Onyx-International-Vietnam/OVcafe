export default function EmptyState({ title, hint }: { title: string; hint?: string }) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed p-10 text-center text-slate-500">
        <div className="text-lg font-semibold text-slate-700">{title}</div>
        {hint && <p className="mt-1 text-sm">{hint}</p>}
      </div>
    );
  }
  