"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/Sidebar"

export default function Settings() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile saved:", formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    console.log("Password changed")
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>

          <div className="space-y-6 max-w-2xl">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">First Name</label>
                      <Input name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      <Input name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} className="mt-1" />
                  </div>
                  {saveSuccess && <p className="text-sm text-green-600">Profile updated successfully!</p>}
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Current Password</label>
                    <Input
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">New Password</label>
                    <Input
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Confirm Password</label>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  {saveSuccess && <p className="text-sm text-green-600">Password changed successfully!</p>}
                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
