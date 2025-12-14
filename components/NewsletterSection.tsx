"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate newsletter signup
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
            offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-sm mt-4 opacity-75">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
