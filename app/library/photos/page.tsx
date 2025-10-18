import { mockMedia } from "@/lib/helpers/mock";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default async function Page() {
  const items = mockMedia("photo", 12);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold md:text-2xl">Ảnh & Albums</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div className="relative aspect-square bg-muted">
              {p.thumb && (
                <Image
                  src={p.thumb}
                  alt={p.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <CardContent className="p-2 text-xs">
              <div className="truncate font-medium">{p.title}</div>
              <div className="text-muted-foreground">
                {p.visibility.toUpperCase()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
