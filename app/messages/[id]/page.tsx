"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/Sidebar"

export default function MessageDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", text: "Hey, how are you?", timestamp: "10:30 AM", isOwn: false },
    { id: 2, sender: "You", text: "I'm doing great! How about you?", timestamp: "10:31 AM", isOwn: true },
    {
      id: 3,
      sender: "John Doe",
      text: "Pretty good! Want to join the chat room later?",
      timestamp: "10:32 AM",
      isOwn: false,
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOwn: true,
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border p-4 bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => router.back()}>
              ←
            </Button>
            <div className="text-4xl">👨</div>
            <div>
              <h1 className="text-lg font-bold text-foreground">John Doe</h1>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            Call
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.isOwn
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4 bg-card">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} size="sm">
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
