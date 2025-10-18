"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/Sidebar"

export default function Album({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [photos] = useState([
    { id: 1, emoji: "🏖️", title: "Beach Sunset" },
    { id: 2, emoji: "🌅", title: "Morning View" },
    { id: 3, emoji: "🏝️", title: "Island Paradise" },
    { id: 4, emoji: "🌊", title: "Ocean Waves" },
    { id: 5, emoji: "🌴", title: "Palm Trees" },
    { id: 6, emoji: "⛱️", title: "Beach Umbrella" },
    { id: 7, emoji: "🏄", title: "Surfing" },
    { id: 8, emoji: "🤿", title: "Snorkeling" },
  ])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => router.back()}>
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Vacation 2024</h1>
              <p className="text-muted-foreground">{photos.length} photos</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-border flex items-center justify-center text-5xl hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-5xl group-hover:scale-110 transition-transform">{photo.emoji}</div>
                  <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
