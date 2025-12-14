"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, MapPin, CheckCircle, Clock, Factory, Plane, Home } from "lucide-react"

interface Order {
  id: string
  status: string
  trackingNumber?: string
  carrier?: string
  estimatedDelivery: string
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}

interface TrackingStep {
  id: number
  title: string
  description: string
  completed: boolean
  current: boolean
  timestamp?: string
  location?: string
  icon: React.ReactNode
}

interface OrderTrackerProps {
  order: Order
}

export default function OrderTracker({ order }: OrderTrackerProps) {
  const [trackingSteps, setTrackingSteps] = useState<TrackingStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Define tracking steps based on order status
    const steps: TrackingStep[] = [
      {
        id: 1,
        title: "Order Confirmed",
        description: "Your order has been received and confirmed",
        completed: true,
        current: false,
        timestamp: "2024-01-15 10:30 AM",
        location: "EliteStore Warehouse",
        icon: <CheckCircle className="w-6 h-6" />,
      },
      {
        id: 2,
        title: "Processing",
        description: "Your order is being prepared for shipment",
        completed: true,
        current: false,
        timestamp: "2024-01-15 2:45 PM",
        location: "EliteStore Warehouse",
        icon: <Factory className="w-6 h-6" />,
      },
      {
        id: 3,
        title: "Shipped",
        description: "Your order has been shipped",
        completed: true,
        current: false,
        timestamp: "2024-01-16 9:15 AM",
        location: "New York Distribution Center",
        icon: <Package className="w-6 h-6" />,
      },
      {
        id: 4,
        title: "In Transit",
        description: "Your package is on the way",
        completed: true,
        current: order.status === "in_transit",
        timestamp: "2024-01-17 11:20 AM",
        location: "Philadelphia Hub",
        icon: <Truck className="w-6 h-6" />,
      },
      {
        id: 5,
        title: "Out for Delivery",
        description: "Your package is out for delivery",
        completed: order.status === "delivered",
        current: order.status === "out_for_delivery",
        timestamp: order.status === "delivered" ? "2024-01-18 8:30 AM" : undefined,
        location: "Local Delivery Center",
        icon: <Plane className="w-6 h-6" />,
      },
      {
        id: 6,
        title: "Delivered",
        description: "Package delivered successfully",
        completed: order.status === "delivered",
        current: false,
        timestamp: order.status === "delivered" ? "2024-01-18 2:15 PM" : undefined,
        location: order.shippingAddress.address,
        icon: <Home className="w-6 h-6" />,
      },
    ]

    setTrackingSteps(steps)

    // Find current step
    const current = steps.findIndex((step) => step.current)
    setCurrentStep(current >= 0 ? current : steps.findIndex((step) => !step.completed))
  }, [order.status, order.shippingAddress.address])

  return (
    <div className="space-y-8">
      {/* Order Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Order Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Order ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                </p>
                <p>
                  <span className="font-medium">Carrier:</span> {order.carrier}
                </p>
                <p>
                  <span className="font-medium">Estimated Delivery:</span>{" "}
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Delivery Address</h3>
              <div className="text-sm text-gray-600">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animated Delivery Truck */}
      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 overflow-hidden">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Your Package is on the Way!</h3>
          <Badge className="bg-blue-100 text-blue-800">
            <Truck className="mr-2 h-4 w-4" />
            In Transit
          </Badge>
        </div>

        {/* Animated Delivery Truck */}
        <div className="relative h-24 bg-gray-200 rounded-lg mb-4 overflow-hidden">
          <div className="absolute top-1/2 transform -translate-y-1/2 animate-pulse">
            <div className="flex items-center">
              {/* Road */}
              <div className="w-full h-1 bg-gray-400 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Animated Truck */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 animate-bounce"
            style={{
              left: `${Math.min(75, (currentStep / (trackingSteps.length - 1)) * 100)}%`,
              transition: "left 2s ease-in-out",
            }}
          >
            <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg">
              <Truck className="w-8 h-8" />
            </div>
          </div>

          {/* Destination */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="bg-green-600 text-white p-2 rounded-lg shadow-lg">
              <Home className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Estimated arrival: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Tracking Timeline</h3>

        <div className="relative">
          {trackingSteps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4 pb-8 last:pb-0">
              {/* Timeline Line */}
              {index < trackingSteps.length - 1 && (
                <div
                  className={`absolute left-6 top-12 w-0.5 h-16 ${step.completed ? "bg-green-500" : "bg-gray-200"}`}
                />
              )}

              {/* Step Icon */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  step.completed
                    ? "bg-green-500 text-white"
                    : step.current
                      ? "bg-blue-500 text-white animate-pulse"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.icon}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4
                    className={`font-semibold ${
                      step.completed ? "text-gray-900" : step.current ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h4>
                  {step.current && <Badge className="bg-blue-100 text-blue-800">Current</Badge>}
                </div>

                <p
                  className={`text-sm mb-2 ${
                    step.completed ? "text-gray-600" : step.current ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.description}
                </p>

                {step.timestamp && (
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {step.timestamp}
                    </p>
                    {step.location && (
                      <p className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {step.location}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Instructions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Delivery Instructions</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Package will be delivered to the address provided</p>
            <p>• Signature may be required upon delivery</p>
            <p>• If you're not available, the package will be left in a safe location</p>
            <p>• You'll receive an email notification once delivered</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
