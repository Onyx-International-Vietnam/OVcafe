"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/AdminSidebar"

export default function Reports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      reportedUser: "John Doe",
      reporter: "Jane Smith",
      reason: "Inappropriate content",
      status: "pending",
      reportedAt: "1 hour ago",
    },
    {
      id: 2,
      reportedUser: "Mike Johnson",
      reporter: "Sarah Williams",
      reason: "Harassment",
      status: "investigating",
      reportedAt: "3 hours ago",
    },
    {
      id: 3,
      reportedUser: "Alex Brown",
      reporter: "Emma Davis",
      reason: "Spam",
      status: "resolved",
      reportedAt: "1 day ago",
    },
  ])

  const handleResolveReport = (id: number) => {
    setReports(reports.map((report) => (report.id === id ? { ...report, status: "resolved" } : report)))
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">User Reports</h1>
            <p className="text-muted-foreground">Review and manage user complaints</p>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Report from {report.reporter}</CardTitle>
                      <CardDescription>Against: {report.reportedUser}</CardDescription>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        report.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : report.status === "investigating"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">Reason:</span> {report.reason}
                    </p>
                    <p className="text-xs text-muted-foreground">Reported {report.reportedAt}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => handleResolveReport(report.id)}>
                      Mark as Resolved
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
