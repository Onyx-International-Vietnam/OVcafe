"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/Sidebar"
import { useState } from "react"

export default function FriendRequests() {
  const [requests, setRequests] = useState([
    { id: 1, name: "Tom Wilson", avatar: "👨", mutualFriends: 3 },
    { id: 2, name: "Lisa Anderson", avatar: "👩", mutualFriends: 2 },
    { id: 3, name: "Chris Martin", avatar: "👨", mutualFriends: 5 },
  ])

  const handleAccept = (id: number) => {
    setRequests(requests.filter((req) => req.id !== id))
  }

  const handleReject = (id: number) => {
    setRequests(requests.filter((req) => req.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Friend Requests</h1>
            <p className="text-muted-foreground">{requests.length} pending requests</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{request.avatar}</div>
                  <CardTitle>{request.name}</CardTitle>
                  <CardDescription>{request.mutualFriends} mutual friends</CardDescription>
                </CardHeader>
                <div className="px-6 pb-4 flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => handleAccept(request.id)}>
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {requests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending friend requests</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
