"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLastOrder } from "@/contexts/LastOrderContext";

export default function OrderSuccessPage() {
  const { lastOrder } = useLastOrder();

  // 🔒 защита от прямого захода
  if (!lastOrder) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <p className="text-gray-600 mb-6">
          This page is available only after placing an order.
        </p>
        <Link href="/products">
          <Button>Go to shop</Button>
        </Link>
      </div>
    );
  }

  const [trackingSteps, setTrackingSteps] = useState([
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your order has been received",
      completed: true,
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "Processing",
      description: "We are preparing your items",
      completed: false,
      date: "",
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your order is on the way",
      completed: false,
      date: "",
    },
    {
      id: 4,
      title: "Delivered",
      description: "Package delivered successfully",
      completed: false,
      date: "",
    },
  ]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setTrackingSteps((prev) =>
        prev.map((step) =>
          step.id === 2
            ? {
                ...step,
                completed: true,
                date: new Date().toLocaleDateString(),
              }
            : step
        )
      );
    }, 3000);

    const timer2 = setTimeout(() => {
      setTrackingSteps((prev) =>
        prev.map((step) =>
          step.id === 3
            ? {
                ...step,
                completed: true,
                date: new Date(Date.now() + 86400000).toLocaleDateString(),
              }
            : step
        )
      );
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* ✅ Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order is being processed.
          </p>
        </div>

        {/* 📦 Order details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold">#{lastOrder.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-semibold">
                  {new Date(Date.now() + 5 * 86400000).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
              <div className="text-sm">
                <p>
                  {lastOrder.firstName} {lastOrder.lastName}
                </p>
                <p>{lastOrder.address}</p>
                <p>
                  {lastOrder.city}, {lastOrder.postalCode}
                </p>
                <p>{lastOrder.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🛒 Ordered items */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ordered Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lastOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="flex justify-between font-semibold text-lg pt-4 border-t">
              <span>Total</span>
              <span>${lastOrder.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {trackingSteps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-start space-x-4 relative"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <div className="w-2 h-2 bg-current rounded-full" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p
                      className={`font-medium ${
                        step.completed ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                    {step.date && (
                      <span className="text-xs text-gray-500">{step.date}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>

                {index < trackingSteps.length - 1 && (
                  <div
                    className={`absolute left-4 top-10 h-6 w-px ${
                      step.completed ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 🔜 Next steps */}
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <Clock className="text-blue-600" />
              <p className="text-sm">
                You’ll receive an email confirmation shortly.
              </p>
            </div>
            <div className="flex gap-3">
              <Truck className="text-green-600" />
              <p className="text-sm">
                Tracking info will be sent when shipped.
              </p>
            </div>
            <div className="flex gap-3">
              <MapPin className="text-purple-600" />
              <p className="text-sm">
                Track your order anytime using your order number.
              </p>
            </div>
            <div className="flex gap-3">
              <Package className="text-orange-600" />
              <p className="text-sm">Delivery in 3–5 business days.</p>
            </div>
          </CardContent>
        </Card>

        {/* 🔘 Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/orders">
            <Button size="lg">View All Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
