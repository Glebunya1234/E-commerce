"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Premium Collection 2025",
      subtitle: "Discover Luxury Redefined",
      description: "Explore our curated selection of premium products designed for the modern lifestyle",
      image: "/hero-image2.png",
      cta: "Shop Collection",
    },
    {
      title: "Tech Innovation",
      subtitle: "Future is Here",
      description: "Experience cutting-edge technology that transforms your daily routine",
      image: "/hero1.jpg",
      cta: "Explore Tech",
    },
    {
      title: "Sustainable Living",
      subtitle: "Eco-Friendly Choices",
      description: "Make a difference with our environmentally conscious product line",
      image: "/hero-image3.png",
      cta: "Go Green",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="text-white space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="text-purple-300 font-medium tracking-wide uppercase text-sm">
                {slides[currentSlide].subtitle}
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">{slides[currentSlide].description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full transition-all duration-300 bg-transparent"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                View Cart
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <img
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt="Hero Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
