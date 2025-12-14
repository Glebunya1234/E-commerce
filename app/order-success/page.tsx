"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "ORD-123456789"
  const [trackingSteps, setTrackingSteps] = useState([
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your order has been received",
      completed: true,
      date: new Date().toLocaleDateString(),
    },
    { id: 2, title: "Processing", description: "We are preparing your items", completed: false, date: "" },
    { id: 3, title: "Shipped", description: "Your order is on the way", completed: false, date: "" },
    { id: 4, title: "Delivered", description: "Package delivered successfully", completed: false, date: "" },
  ])

  useEffect(() => {
    // Simulate order processing
    const timer1 = setTimeout(() => {
      setTrackingSteps((prev) =>
        prev.map((step) =>
          step.id === 2 ? { ...step, completed: true, date: new Date().toLocaleDateString() } : step,
        ),
      )
    }, 3000)

    const timer2 = setTimeout(() => {
      setTrackingSteps((prev) =>
        prev.map((step) =>
          step.id === 3
            ? { ...step, completed: true, date: new Date(Date.now() + 86400000).toLocaleDateString() }
            : step,
        ),
      )
    }, 6000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order is being processed.</p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Confirmed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-semibold">{new Date(Date.now() + 5 * 86400000).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
              <div className="text-sm">
                <p>John Doe</p>
                <p>123 Main Street</p>
                <p>New York, NY 10001</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <div className="w-2 h-2 bg-current rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                        {step.title}
                      </h3>
                      {step.date && <span className="text-xs text-gray-500">{step.date}</span>}
                    </div>
                    <p className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
                      {step.description}
                    </p>
                  </div>

                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-4 mt-8 w-px h-6 ${step.completed ? "bg-green-500" : "bg-gray-200"}`}
                      style={{ marginLeft: "15px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Order Confirmation</h3>
                  <p className="text-sm text-gray-600">
                    You'll receive an email confirmation shortly with your order details.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Shipping Updates</h3>
                  <p className="text-sm text-gray-600">We'll send you tracking information once your order ships.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Track Your Order</h3>
                  <p className="text-sm text-gray-600">Use your order number to track the delivery status anytime.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Package className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Delivery</h3>
                  <p className="text-sm text-gray-600">Your package will be delivered within 3-5 business days.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link href="/products">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/orders">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              View All Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
