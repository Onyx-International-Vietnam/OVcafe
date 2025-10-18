"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmailConfirmation() {
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    // Simulate email confirmation
    const timer = setTimeout(() => {
      setConfirmed(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl">{confirmed ? "✓" : "📧"}</span>
            </div>
          </div>
          <CardTitle className="text-2xl">{confirmed ? "Email Confirmed!" : "Confirm Your Email"}</CardTitle>
          <CardDescription>
            {confirmed ? "Your account is ready to use" : "We sent a confirmation link to your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {confirmed ? (
            <Link href="/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          ) : (
            <p className="text-sm text-muted-foreground">Checking your email...</p>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
