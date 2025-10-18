import Image from 'next/image';

export default function AvatarName({ name, src }: { name: string; src?: string }) {
    return (
      <div className="flex min-w-0 items-center gap-2">
        <div className="relative h-7 w-7 overflow-hidden rounded-full bg-slate-200">
          {src ? <Image src={src} alt={name} fill className="object-cover" /> : null}
        </div>
        <span className="truncate text-sm font-medium">{name}</span>
      </div>
    );
  }
