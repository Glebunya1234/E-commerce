"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, ArrowRight, Clock, Star, Zap } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      })
      return
    }

    // Simulate subscription
    setIsSubscribed(true)
    setEmail("")
    toast({
      title: "Successfully subscribed!",
      description: "We'll notify you when this feature launches.",
    })
  }

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Carefully curated products from top brands",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping worldwide",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-16">
            <Badge className="mb-6 bg-purple-100 text-purple-800 px-4 py-2">Coming Soon</Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Something Amazing is
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Coming Soon
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're working hard to bring you an incredible new experience. Get ready for something that will
              revolutionize the way you shop online.
            </p>

            {/* Countdown or Progress */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Be the First to Know</h2>

              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 px-8"
                  >
                    Notify Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">You're on the list!</h3>
                  <p className="text-gray-600">We'll send you an email as soon as we launch.</p>
                </div>
              )}
            </div>
          </div>

          {/* Features Preview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What to Expect</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Can't Wait?</h2>
            <p className="text-xl mb-8 opacity-90">
              Explore our current collection while you wait for the new features
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4">
                  Browse Products
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 bg-transparent"
                >
                  View Categories
                </Button>
              </Link>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Join thousands of customers who trust EliteStore</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-2xl font-bold">25+</div>
            </div>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 mt-2">
              <span>Happy Customers</span>
              <span>Products Sold</span>
              <span>Countries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
