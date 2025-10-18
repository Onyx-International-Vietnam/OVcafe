"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/AdminSidebar"

export default function IPBlocking() {
  const [blockedIPs, setBlockedIPs] = useState([
    { id: 1, ip: "192.168.1.100", reason: "Spam", blockedAt: "2 days ago" },
    { id: 2, ip: "10.0.0.50", reason: "Harassment", blockedAt: "1 week ago" },
    { id: 3, ip: "172.16.0.1", reason: "Abuse", blockedAt: "2 weeks ago" },
  ])
  const [newIP, setNewIP] = useState("")
  const [reason, setReason] = useState("")

  const handleBlockIP = (e: React.FormEvent) => {
    e.preventDefault()
    if (newIP.trim()) {
      setBlockedIPs([
        ...blockedIPs,
        {
          id: blockedIPs.length + 1,
          ip: newIP,
          reason: reason || "No reason provided",
          blockedAt: "Just now",
        },
      ])
      setNewIP("")
      setReason("")
    }
  }

  const handleUnblockIP = (id: number) => {
    setBlockedIPs(blockedIPs.filter((item) => item.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">IP Blocking</h1>
            <p className="text-muted-foreground">Block or unblock IP addresses</p>
          </div>

          {/* Add New IP */}
          <Card className="mb-8 max-w-2xl">
            <CardHeader>
              <CardTitle>Block New IP Address</CardTitle>
              <CardDescription>Add an IP address to the blocklist</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBlockIP} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">IP Address</label>
                  <Input
                    value={newIP}
                    onChange={(e) => setNewIP(e.target.value)}
                    placeholder="e.g., 192.168.1.100"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Reason</label>
                  <Input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g., Spam, Harassment"
                    className="mt-1"
                  />
                </div>
                <Button type="submit">Block IP</Button>
              </form>
            </CardContent>
          </Card>

          {/* Blocked IPs List */}
          <Card>
            <CardHeader>
              <CardTitle>Blocked IP Addresses</CardTitle>
              <CardDescription>{blockedIPs.length} IPs currently blocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">IP Address</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Reason</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Blocked At</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockedIPs.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground font-mono">{item.ip}</td>
                        <td className="py-3 px-4 text-muted-foreground">{item.reason}</td>
                        <td className="py-3 px-4 text-muted-foreground">{item.blockedAt}</td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                            onClick={() => handleUnblockIP(item.id)}
                          >
                            Unblock
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
