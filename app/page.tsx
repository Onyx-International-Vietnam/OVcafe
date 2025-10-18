import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">OV</span>
          </div>
          <span className="text-xl font-bold text-foreground">CAFE</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Connect with Friends Through Live Video
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Create your own live video chat rooms, share moments with friends, and build your community in real-time.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-lg">
              Get Started Free
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg bg-transparent">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">📹</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Live Video Chat</h3>
            <p className="text-muted-foreground">Create and join live video chat rooms with up to 7 participants</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Friends Network</h3>
            <p className="text-muted-foreground">Connect with friends and send private messages instantly</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">📸</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Share Content</h3>
            <p className="text-muted-foreground">Upload and share videos and photos with your community</p>
          </div>
        </div>
      </section>
    </main>
  )
}
