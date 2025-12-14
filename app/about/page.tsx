"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart, Target, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Products Sold", value: "1M+", icon: Award },
    { label: "Countries Served", value: "25+", icon: Globe },
    { label: "Years of Excellence", value: "10+", icon: Heart },
  ]

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description:
        "We carefully curate every product to ensure it meets our high standards of quality and craftsmanship.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We stay ahead of trends and continuously innovate to bring you the latest and greatest products.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Your privacy and security are our top priorities. Shop with confidence knowing your data is protected.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "We pride ourselves on quick and reliable shipping to get your orders to you as fast as possible.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Visionary leader with 15+ years in e-commerce",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Tech innovator passionate about user experience",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Creative director with an eye for beautiful products",
    },
    {
      name: "David Kim",
      role: "Operations Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Logistics expert ensuring smooth operations",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">About EliteStore</Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Redefining Premium Shopping
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              We're more than just an e-commerce platform. We're your trusted partner in discovering exceptional
              products that enhance your lifestyle and bring joy to your everyday moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold"
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full font-semibold bg-transparent"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-purple-100 text-purple-800">Our Story</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Built with Passion, Driven by Excellence</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2014, EliteStore began as a small startup with a big dream: to create the most intuitive and
                enjoyable online shopping experience. What started in a garage has grown into a global platform serving
                customers in over 25 countries.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our journey has been marked by continuous innovation, unwavering commitment to quality, and an obsession
                with customer satisfaction. Every product we feature is carefully selected, every feature we build is
                user-tested, and every decision we make is guided by our core values.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <img src="/placeholder.svg?height=500&width=600" alt="Our Story" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Our Values</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Drives Us Forward</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values aren't just words on a wall—they're the principles that guide every decision we make and every
              interaction we have with our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Our Team</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet the People Behind EliteStore</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of passionate individuals works tirelessly to bring you the best shopping experience
              possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made EliteStore their go-to destination for premium products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold"
              >
                Start Shopping
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full font-semibold bg-transparent"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
