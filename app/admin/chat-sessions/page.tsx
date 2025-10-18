"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/AdminSidebar"


export default function ChatSessions() {
  const [sessions, setSessions] = useState([
    { id: 1, roomName: "Gaming Night", owner: "John Doe", participants: 5, status: "active" },
    { id: 2, roomName: "Study Group", owner: "Jane Smith", participants: 3, status: "active" },
    { id: 3, roomName: "Music Jam", owner: "Mike Johnson", participants: 6, status: "active" },
    { id: 4, roomName: "Movie Night", owner: "Sarah Williams", participants: 7, status: "full" },
  ])

  const handleDisableSession = (id: number) => {
    setSessions(sessions.filter((session) => session.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Active Chat Sessions</h1>
            <p className="text-muted-foreground">Monitor and manage live chat rooms</p>
          </div>

          <div className="grid gap-6">
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{session.roomName}</CardTitle>
                      <CardDescription>Owner: {session.owner}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{session.participants} participants</p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${
                          session.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      View Details
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDisableSession(session.id)}>
                      Disable Session
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
