"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/Sidebar"
import { useState } from "react"

export default function MyVideos() {
  const [videos] = useState([
    {
      id: 1,
      title: "Gaming Highlights",
      duration: "12:34",
      views: 234,
      uploadedAt: "2 days ago",
      thumbnail: "🎮",
    },
    {
      id: 2,
      title: "Cooking Tutorial",
      duration: "8:45",
      views: 156,
      uploadedAt: "1 week ago",
      thumbnail: "👨‍🍳",
    },
    {
      id: 3,
      title: "Music Performance",
      duration: "5:20",
      views: 89,
      uploadedAt: "2 weeks ago",
      thumbnail: "🎵",
    },
    {
      id: 4,
      title: "Travel Vlog",
      duration: "15:10",
      views: 412,
      uploadedAt: "3 weeks ago",
      thumbnail: "✈️",
    },
  ])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Videos</h1>
              <p className="text-muted-foreground">Manage and share your uploaded videos</p>
            </div>
            <Link href="/upload-video">
              <Button>Upload Video</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-5xl">
                  {video.thumbnail}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>
                    <div className="flex justify-between text-xs mt-2">
                      <span>{video.duration}</span>
                      <span>{video.views} views</span>
                    </div>
                    <p className="text-xs mt-1">{video.uploadedAt}</p>
                  </CardDescription>
                </CardHeader>
                <div className="px-6 pb-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
