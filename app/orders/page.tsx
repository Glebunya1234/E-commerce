"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { MapPin } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/orders");
      return;
    }

    const fetchOrders = async () => {
      // Получаем заказы пользователя
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.id)
        .order("date_created", { ascending: false });

      if (ordersError) {
        console.error(ordersError);
        return;
      }
      if (!ordersData) return;

      // Получаем товары по всем заказам
      const orderIds = ordersData.map((o) => o.id);
      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*, products(name, price)")
        .in("order_id", orderIds);

      if (itemsError) {
        console.error(itemsError);
        return;
      }

      // Формируем структуру
      const ordersMapped: Order[] = ordersData.map((order) => {
        const items = itemsData
          .filter((item) => item.order_id === order.id)
          .map((item) => ({
            id: item.product_id,
            name: item.products?.name || "",
            price: Number(item.price_at_moment),
            quantity: item.quantity,
            image: "/placeholder.svg",
          }));

        return {
          id: order.id,
          date: order.date_created,
          total: Number(order.total_amount),
          items,
          shippingAddress: {
            name: `${order.first_name || ""} ${order.last_name || ""}`.trim(),
            address: order.address || "",
            city: order.city || "",
            state: "",
            zipCode: order.postal_code || "",
          },
        };
      });

      setOrders(ordersMapped);
    };

    fetchOrders();
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="bg-gray-50 p-4">
              <CardTitle>Order #{order.id}</CardTitle>
              <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <Link href={`/products/${item.id}`}>
                    <Button size="sm" variant="outline">
                      View Product
                    </Button>
                  </Link>
                </div>
              ))}

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2 flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Shipping Address
                </h4>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
              </div>

              <div className="pt-4 border-t text-right">
                <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
