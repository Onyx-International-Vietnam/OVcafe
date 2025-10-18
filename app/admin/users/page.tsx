"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminSidebar } from "@/components/AdminSidebar"

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", joinedAt: "2 months ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", joinedAt: "1 month ago" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "banned", joinedAt: "3 weeks ago" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", status: "active", joinedAt: "1 week ago" },
    { id: 5, name: "Alex Brown", email: "alex@example.com", status: "suspended", joinedAt: "5 days ago" },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleBanUser = (id: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: "banned" } : user)))
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-foreground">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : user.status === "banned"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.joinedAt}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => handleBanUser(user.id)}
                      >
                        Ban
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
