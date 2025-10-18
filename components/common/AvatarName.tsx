export default function AvatarName({ name, src }: { name: string; src?: string }) {
    return (
      <div className="flex min-w-0 items-center gap-2">
        <div className="h-7 w-7 overflow-hidden rounded-full bg-slate-200">
          {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : null}
        </div>
        <span className="truncate text-sm font-medium">{name}</span>
      </div>
    );
  }
  