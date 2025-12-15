"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  miniDescription: string;
  seller_id?: number | null;
}

interface RelatedProductsProps {
  currentProductId: number;
  categoryId: number;
  categoryName: string;
}

export default function RelatedProducts({
  currentProductId,
  categoryId,
  categoryName,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryId) return;

      const { data: subCategories, error: catErr } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", categoryId);

      if (catErr) {
        console.error("Error fetching subcategories:", catErr);
        return;
      }

      const allCategoryIds = [
        categoryId,
        ...(subCategories?.map((c) => c.id) || []),
      ];

      const { data: categoryLinks, error: linkErr } = await supabase
        .from("product_categories")
        .select("product_id")
        .in("category_id", allCategoryIds)
        .neq("product_id", currentProductId);

      if (linkErr) {
        console.error("Error fetching product-category links:", linkErr);
        return;
      }

      const productIds = categoryLinks?.map((c) => c.product_id) || [];
      if (productIds.length === 0) return;

      // Получаем продукты с мини-описанием
      const { data: productsData, error: productsErr } = await supabase
        .from("products")
        .select("id, name, price, seller_id, mini_description")
        .in("id", productIds);

      if (productsErr) {
        console.error("Error fetching products:", productsErr);
        return;
      }

      const allProducts: Product[] = (productsData || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        image: "/placeholder.svg",
        miniDescription: p.mini_description || "", // добавляем мини-описание
      }));

      setProducts(allProducts.sort(() => 0.5 - Math.random()).slice(0, 4));
    };

    fetchRelatedProducts();
  }, [currentProductId, categoryId]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      seller_id: product.seller_id || 0,
      quantity: 1,
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          You Might Also Like
        </h2>
        <p className="text-xl text-gray-600">
          Discover more products in this category
        </p>
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
                <div
                  className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Link href={`/products/${product.id}`}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-10 h-10 p-0 rounded-full"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
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
                  <span className="text-sm text-purple-600 font-medium">
                    {categoryName}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.miniDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
