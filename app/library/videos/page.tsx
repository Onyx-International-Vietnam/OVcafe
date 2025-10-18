import { mockMedia } from "@/lib/helpers/mock";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default async function Page() {
  const items = mockMedia("video", 8);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold md:text-2xl">Thư viện video</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              {v.thumb && (
                <Image
                  src={v.thumb}
                  alt={v.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <CardContent className="p-3">
              <div className="truncate text-sm font-medium">{v.title}</div>
              <div className="text-xs text-muted-foreground">
                {v.visibility.toUpperCase()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
