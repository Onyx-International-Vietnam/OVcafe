"use client"

import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/Sidebar"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to OVCAFE</h1>
            <p className="text-muted-foreground">Start connecting with friends through live video</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/chat-rooms">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">📹</span>
                  </div>
                  <CardTitle>Browse Chat Rooms</CardTitle>
                  <CardDescription>Join active video chat rooms</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/create-chat-room">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">➕</span>
                  </div>
                  <CardTitle>Create Chat Room</CardTitle>
                  <CardDescription>Start your own live video chat</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/friends">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <CardTitle>Friends</CardTitle>
                  <CardDescription>Manage your friends list</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/my-videos">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>My Videos</CardTitle>
                  <CardDescription>View and manage your uploaded videos</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/my-photos">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>My Photos</CardTitle>
                  <CardDescription>Organize your photo albums</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

