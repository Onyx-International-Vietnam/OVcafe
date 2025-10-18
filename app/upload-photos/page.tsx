"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/Sidebar"

export default function UploadVideo() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublic: true,
  })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate upload
    setTimeout(() => {
      console.log("Video uploaded:", formData, file)
      setLoading(false)
      router.push("/my-videos")
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Upload Video</h1>
            <p className="text-muted-foreground">Share your video with the community</p>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>Fill in the information about your video</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground">Video File</label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-input"
                    />
                    <label htmlFor="video-input" className="cursor-pointer">
                      <div className="text-4xl mb-2">📹</div>
                      <p className="text-foreground font-semibold">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-muted-foreground">MP4, WebM, or OGG (max 500MB)</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., My Gaming Highlights"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your video..."
                    className="w-full mt-2 p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-border"
                  />
                  <label className="text-sm font-medium text-foreground">Make this video public</label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading || !file}>
                    {loading ? "Uploading..." : "Upload Video"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
