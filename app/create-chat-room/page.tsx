"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/Sidebar"

export default function CreateChatRoom() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
    isPrivate: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate room creation
    setTimeout(() => {
      console.log("Room created:", formData)
      setLoading(false)
      router.push("/chat-room/1")
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Chat Room</h1>
            <p className="text-muted-foreground">Set up your own live video chat room</p>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
              <CardDescription>Configure your chat room settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground">Room Name</label>
                  <Input
                    name="roomName"
                    value={formData.roomName}
                    onChange={handleChange}
                    placeholder="e.g., Gaming Night"
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
                    placeholder="Describe your chat room..."
                    className="w-full mt-2 p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Input
                    type="checkbox"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-border"
                  />
                  <label className="text-sm font-medium text-foreground">Make this room private</label>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Room Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Up to 7 video participants</li>
                    <li>✓ Screen sharing capability</li>
                    <li>✓ Chat messaging</li>
                    <li>✓ Recording option</li>
                    <li>✓ User management controls</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Room"}
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
