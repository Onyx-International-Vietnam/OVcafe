"use client"

import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/Sidebar"
import { useState } from "react"

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [conversations] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      timestamp: "5 min ago",
      unread: 2,
      avatar: "👨",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "See you tomorrow!",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "👩",
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Thanks for the help",
      timestamp: "2 hours ago",
      unread: 1,
      avatar: "👨",
    },
    {
      id: 4,
      name: "Sarah Williams",
      lastMessage: "Let's catch up soon",
      timestamp: "1 day ago",
      unread: 0,
      avatar: "👩",
    },
  ])

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
            <p className="text-muted-foreground">Your private conversations</p>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-3 max-w-2xl">
            {filteredConversations.map((conv) => (
              <Link key={conv.id} href={`/messages/${conv.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{conv.avatar}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{conv.name}</CardTitle>
                          <CardDescription className="truncate">{conv.lastMessage}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{conv.timestamp}</p>
                        {conv.unread > 0 && (
                          <span className="inline-block mt-1 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                            {conv.unread}
                          </span>
                        )}
                      </div>
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
