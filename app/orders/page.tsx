"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Package, Truck, MapPin, Clock, CheckCircle, Search, Eye, Download, Star, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import OrderTracker from "@/components/OrderTracker"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "in_transit"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
  total: number
  items: OrderItem[]
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  trackingNumber?: string
  estimatedDelivery: string
  carrier?: string
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showTracker, setShowTracker] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/orders")
      return
    }

    // Mock orders data
    const mockOrders: Order[] = [
      {
        id: "ORD-2024-001",
        date: "2024-01-15",
        status: "in_transit",
        total: 299.99,
        items: [
          {
            id: "1",
            name: "Premium Wireless Headphones",
            price: 299.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
        trackingNumber: "TRK123456789",
        estimatedDelivery: "2024-01-18",
        carrier: "FedEx",
      },
      {
        id: "ORD-2024-002",
        date: "2024-01-10",
        status: "delivered",
        total: 199.99,
        items: [
          {
            id: "2",
            name: "Smart Fitness Watch",
            price: 199.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
        trackingNumber: "TRK987654321",
        estimatedDelivery: "2024-01-12",
        carrier: "UPS",
      },
      {
        id: "ORD-2024-003",
        date: "2024-01-08",
        status: "processing",
        total: 549.98,
        items: [
          {
            id: "3",
            name: "Luxury Leather Bag",
            price: 449.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: "5",
            name: "Designer Sunglasses",
            price: 99.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
        estimatedDelivery: "2024-01-15",
      },
      {
        id: "ORD-2024-004",
        date: "2024-01-05",
        status: "cancelled",
        total: 89.99,
        items: [
          {
            id: "8",
            name: "Organic Skincare Set",
            price: 89.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
        estimatedDelivery: "2024-01-08",
      },
    ]

    setOrders(mockOrders)
  }, [user, router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in_transit":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-indigo-100 text-indigo-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "in_transit":
      case "out_for_delivery":
        return <Truck className="h-4 w-4" />
      case "shipped":
        return <Package className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowTracker(true)
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Orders</h1>
        <p className="text-xl text-gray-600">Track and manage your orders</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search orders or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Order Tracker Modal */}
      {showTracker && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Track Order {selectedOrder.id}</h2>
              <Button variant="ghost" onClick={() => setShowTracker(false)}>
                ×
              </Button>
            </div>
            <div className="p-6">
              <OrderTracker order={selectedOrder} />
            </div>
          </div>
        </div>
      )}

      {/* Orders List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet or no orders match your search.</p>
              <Link href="/products">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{formatStatus(order.status)}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                        {order.trackingNumber && (
                          <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order)}>
                            <Truck className="mr-2 h-4 w-4" />
                            Track Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          Shipping Address
                        </h4>
                        <div className="text-sm text-gray-600">
                          <p>{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          Delivery Information
                        </h4>
                        <div className="text-sm text-gray-600">
                          <p>Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                          {order.carrier && <p>Carrier: {order.carrier}</p>}
                          {order.trackingNumber && <p>Tracking: {order.trackingNumber}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
                      <Link href={`/products/${order.items[0].id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Products
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Invoice
                      </Button>
                      {order.status === "delivered" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Star className="mr-2 h-4 w-4" />
                            Write Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <Package className="mr-2 h-4 w-4" />
                            Return Item
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Other tab contents would filter orders by status */}
        <TabsContent value="active">
          <div className="space-y-6">
            {filteredOrders
              .filter((order) =>
                ["pending", "confirmed", "processing", "shipped", "in_transit", "out_for_delivery"].includes(
                  order.status,
                ),
              )
              .map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  {/* Same card content as above */}
                  <CardHeader className="bg-gray-50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{formatStatus(order.status)}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                        {order.trackingNumber && (
                          <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order)}>
                            <Truck className="mr-2 h-4 w-4" />
                            Track Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered">
          <div className="space-y-6">
            {filteredOrders
              .filter((order) => order.status === "delivered")
              .map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  {/* Same card content */}
                  <CardHeader className="bg-green-50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <p className="text-sm text-gray-600">
                            Delivered on {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                          <span className="ml-1">Delivered</span>
                        </Badge>
                      </div>
                      <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled">
          <div className="space-y-6">
            {filteredOrders
              .filter((order) => order.status === "cancelled")
              .map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-red-50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <p className="text-sm text-gray-600">
                            Cancelled on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          <span className="ml-1">Cancelled</span>
                        </Badge>
                      </div>
                      <span className="text-lg font-bold text-gray-500">${order.total.toFixed(2)}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="returns">
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No returns</h3>
            <p className="text-gray-600">You haven't initiated any returns yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
