"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Smartphone, Shirt, Home, Dumbbell, Sparkles, BookOpen, Car, Camera } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      description: "Latest gadgets, smartphones, laptops, and tech accessories",
      image: "/placeholder.svg?height=300&width=400",
      icon: Smartphone,
      productCount: 245,
      color: "from-blue-500 to-purple-600",
      featured: true,
    },
    {
      id: "fashion",
      name: "Fashion & Apparel",
      description: "Trendy clothing, shoes, and accessories for all occasions",
      image: "/placeholder.svg?height=300&width=400",
      icon: Shirt,
      productCount: 189,
      color: "from-pink-500 to-rose-600",
      featured: true,
    },
    {
      id: "home",
      name: "Home & Garden",
      description: "Furniture, decor, kitchen essentials, and garden supplies",
      image: "/placeholder.svg?height=300&width=400",
      icon: Home,
      productCount: 156,
      color: "from-green-500 to-emerald-600",
      featured: true,
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      description: "Exercise equipment, sportswear, and outdoor gear",
      image: "/placeholder.svg?height=300&width=400",
      icon: Dumbbell,
      productCount: 98,
      color: "from-orange-500 to-red-600",
      featured: false,
    },
    {
      id: "beauty",
      name: "Beauty & Personal Care",
      description: "Skincare, makeup, fragrances, and wellness products",
      image: "/placeholder.svg?height=300&width=400",
      icon: Sparkles,
      productCount: 134,
      color: "from-purple-500 to-pink-600",
      featured: false,
    },
    {
      id: "books",
      name: "Books & Media",
      description: "Books, e-books, audiobooks, and educational materials",
      image: "/placeholder.svg?height=300&width=400",
      icon: BookOpen,
      productCount: 67,
      color: "from-indigo-500 to-blue-600",
      featured: false,
    },
    {
      id: "automotive",
      name: "Automotive",
      description: "Car accessories, tools, and automotive maintenance products",
      image: "/placeholder.svg?height=300&width=400",
      icon: Car,
      productCount: 89,
      color: "from-gray-600 to-gray-800",
      featured: false,
    },
    {
      id: "photography",
      name: "Photography",
      description: "Cameras, lenses, tripods, and photography accessories",
      image: "/placeholder.svg?height=300&width=400",
      icon: Camera,
      productCount: 76,
      color: "from-yellow-500 to-orange-600",
      featured: false,
    },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const featuredCategories = categories.filter((category) => category.featured)
  const regularCategories = categories.filter((category) => !category.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">Product Categories</Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Explore Our Categories
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Discover thousands of premium products across diverse categories, carefully curated for quality and style
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Featured</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Our most popular product categories with the best selection</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {featuredCategories.map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                  <CardContent className="p-0 relative">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                      />

                      <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <category.icon className="w-6 h-6" />
                          </div>
                          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                            {category.productCount} products
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                          <p className="text-sm opacity-90 mb-4 line-clamp-2">{category.description}</p>
                          <div className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                            <span>Explore Category</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h2>
            <p className="text-xl text-gray-600">Browse our complete collection of product categories</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(searchTerm ? filteredCategories : regularCategories).map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-purple-600 font-medium">{category.productCount} products</span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {searchTerm && filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600 mb-6">Try searching with different keywords</p>
              <Button
                onClick={() => setSearchTerm("")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                View All Categories
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our product catalog is constantly growing. Contact us if you need help finding specific products or have
            suggestions for new categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold"
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full font-semibold bg-transparent"
              >
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
