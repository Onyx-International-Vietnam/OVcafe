"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/Sidebar"
import { useState } from "react"

export default function ChatRooms() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const chatRooms = [
    {
      id: 1,
      name: "Gaming Night",
      owner: "John Doe",
      participants: 5,
      maxParticipants: 7,
      status: "active",
    },
    {
      id: 2,
      name: "Study Group",
      owner: "Jane Smith",
      participants: 3,
      maxParticipants: 7,
      status: "active",
    },
    {
      id: 3,
      name: "Music Jam Session",
      owner: "Mike Johnson",
      participants: 6,
      maxParticipants: 7,
      status: "active",
    },
    {
      id: 4,
      name: "Movie Night",
      owner: "Sarah Williams",
      participants: 7,
      maxParticipants: 7,
      status: "full",
    },
    {
      id: 5,
      name: "Cooking Show",
      owner: "Alex Brown",
      participants: 2,
      maxParticipants: 7,
      status: "active",
    },
    {
      id: 6,
      name: "Tech Talk",
      owner: "Emma Davis",
      participants: 4,
      maxParticipants: 7,
      status: "active",
    },
  ]

  const filteredRooms = chatRooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Chat Rooms</h1>
              <p className="text-muted-foreground">Browse and join active video chat rooms</p>
            </div>
            <Link href="/create-chat-room">
              <Button>Create Room</Button>
            </Link>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Search chat rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Link key={room.id} href={`/chat-room/${room.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle>{room.name}</CardTitle>
                        <CardDescription>by {room.owner}</CardDescription>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          room.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {room.status === "active" ? "Active" : "Full"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>👥</span>
                      <span>
                        {room.participants}/{room.maxParticipants} participants
                      </span>
                    </div>
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
