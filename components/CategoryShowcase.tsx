"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CategoryShowcase() {
  const categories = [
    {
      name: "Electronics",
      image: "/placeholder.svg?height=300&width=400",
      count: "120+ Products",
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Fashion",
      image: "/placeholder.svg?height=300&width=400",
      count: "200+ Products",
      color: "from-pink-500 to-rose-600",
    },
    {
      name: "Home & Garden",
      image: "/placeholder.svg?height=300&width=400",
      count: "150+ Products",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Sports",
      image: "/placeholder.svg?height=300&width=400",
      count: "80+ Products",
      color: "from-orange-500 to-red-600",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`}>
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-0 relative">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
