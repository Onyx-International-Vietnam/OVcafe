"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/Sidebar"

export default function ChatRoom({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Array<{ id: number; user: string; text: string }>>([
    { id: 1, user: "John Doe", text: "Hey everyone!" },
    { id: 2, user: "Jane Smith", text: "Hi! How's it going?" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: "You", text: newMessage }])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border p-4 bg-card">
          <h1 className="text-xl font-bold text-foreground">Gaming Night</h1>
          <p className="text-sm text-muted-foreground">5/7 participants</p>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {/* Featured Streamer */}
            <div className="md:col-span-2 md:row-span-2">
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-border flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">📹</span>
                  <p className="text-foreground font-semibold mt-2">John Doe (Featured)</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            {[
              { name: "Jane Smith", icon: "👩" },
              { name: "Mike Johnson", icon: "👨" },
              { name: "Sarah Williams", icon: "👩" },
              { name: "Alex Brown", icon: "👨" },
            ].map((participant, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-border flex items-center justify-center h-32"
              >
                <div className="text-center">
                  <span className="text-4xl">{participant.icon}</span>
                  <p className="text-sm text-foreground font-semibold mt-1">{participant.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-2 justify-center mb-6">
            <Button variant="outline" size="sm">
              🔊 Mute
            </Button>
            <Button variant="outline" size="sm">
              📹 Camera Off
            </Button>
            <Button variant="outline" size="sm">
              🖥️ Share Screen
            </Button>
            <Button variant="outline" size="sm">
              ⚙️ Settings
            </Button>
            <Button variant="destructive" size="sm">
              📞 Leave Room
            </Button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-h-32 overflow-y-auto mb-3 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <span className="font-semibold text-primary">{msg.user}:</span>
                <span className="text-foreground ml-2">{msg.text}</span>
              </div>
            ))}
          </div>
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
