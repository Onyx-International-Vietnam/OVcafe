"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/Sidebar"
import { useState } from "react"

export default function MyPhotos() {
  const [albums] = useState([
    {
      id: 1,
      name: "Vacation 2024",
      photoCount: 24,
      coverPhoto: "🏖️",
      createdAt: "2 weeks ago",
    },
    {
      id: 2,
      name: "Friends Hangout",
      photoCount: 18,
      coverPhoto: "👥",
      createdAt: "1 month ago",
    },
    {
      id: 3,
      name: "Food Photography",
      photoCount: 42,
      coverPhoto: "🍕",
      createdAt: "2 months ago",
    },
    {
      id: 4,
      name: "Nature Shots",
      photoCount: 31,
      coverPhoto: "🌲",
      createdAt: "3 months ago",
    },
  ])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Photos</h1>
              <p className="text-muted-foreground">Organize your photos into albums</p>
            </div>
            <Link href="/upload-photos">
              <Button>Upload Photos</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                    {album.coverPhoto}
                  </div>
                  <CardHeader>
                    <CardTitle>{album.name}</CardTitle>
                    <CardDescription>
                      <div className="flex justify-between text-xs mt-2">
                        <span>{album.photoCount} photos</span>
                        <span>{album.createdAt}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
