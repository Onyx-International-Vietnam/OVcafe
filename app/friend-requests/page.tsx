"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import { useState } from "react"

export default function Friends() {
  const [searchTerm, setSearchTerm] = useState("")
  const [friends] = useState([
    { id: 1, name: "John Doe", status: "online", avatar: "👨" },
    { id: 2, name: "Jane Smith", status: "online", avatar: "👩" },
    { id: 3, name: "Mike Johnson", status: "offline", avatar: "👨" },
    { id: 4, name: "Sarah Williams", status: "online", avatar: "👩" },
    { id: 5, name: "Alex Brown", status: "offline", avatar: "👨" },
    { id: 6, name: "Emma Davis", status: "online", avatar: "👩" },
  ])

  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Friends</h1>
              <p className="text-muted-foreground">Manage your friends list</p>
            </div>
            <Link href="/friend-requests">
              <Button variant="outline">Friend Requests</Button>
            </Link>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.map((friend) => (
              <Card key={friend.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{friend.avatar}</div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        friend.status === "online"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {friend.status}
                    </span>
                  </div>
                  <CardTitle>{friend.name}</CardTitle>
                  <CardDescription>Friend since 2 months ago</CardDescription>
                </CardHeader>
                <div className="px-6 pb-4 flex gap-2">
                  <Link href={`/messages/${friend.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      Message
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Remove
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
