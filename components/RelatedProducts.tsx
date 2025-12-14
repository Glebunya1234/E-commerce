"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  isNew?: boolean
  isSale?: boolean
}

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    // Mock related products data
    const mockProducts: Product[] = [
      {
        id: "2",
        name: "Smart Fitness Watch",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 89,
        category: "Electronics",
        isNew: true,
      },
      {
        id: "3",
        name: "Wireless Earbuds Pro",
        price: 149.99,
        originalPrice: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 156,
        category: "Electronics",
        isSale: true,
      },
      {
        id: "4",
        name: "Bluetooth Speaker",
        price: 89.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.4,
        reviews: 78,
        category: "Electronics",
      },
      {
        id: "5",
        name: "Gaming Headset",
        price: 129.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 92,
        category: "Electronics",
      },
    ]

    // Filter out current product and limit to 4 items
    const filteredProducts = mockProducts.filter((product) => product.id !== currentProductId).slice(0, 4)

    setProducts(filteredProducts)
  }, [currentProductId, category])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">You Might Also Like</h2>
        <p className="text-xl text-gray-600">Discover more products in the {category} category</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-md"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                  {product.isSale && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
                </div>

                {/* Quick Actions */}
                <div
                  className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Add to Cart Overlay */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-white text-black hover:bg-gray-100"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-purple-600 font-medium">{product.category}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href={`/categories/${category.toLowerCase()}`}>
          <Button
            variant="outline"
            size="lg"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            View All {category} Products
          </Button>
        </Link>
      </div>
    </div>
  )
}
