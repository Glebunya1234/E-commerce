"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Heart, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  status: string;
  seller_id: number | null;
  inStock: boolean;
  mini_description?: string;
  image?: string;
  category?: string;
}

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const decodedCategoryName = decodeURIComponent(categorySlug);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("name", decodedCategoryName)
        .single();
      if (error) {
        console.error(error);
        setCategory(null);
        return;
      }
      setCategory(data);
    };
    fetchCategory();
  }, [categorySlug]);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      const { data: subcategories, error: subError } = await supabase
        .from("categories")
        .select("id, name")
        .eq("parent_id", category.id);

      if (subError) {
        console.error(subError);
        setProducts([]);
        return;
      }

      const subcategoryIds = subcategories?.map((c) => c.id) || [];

      const categoryIds = [category.id, ...subcategoryIds];

      const { data: productCats, error: pcError } = await supabase
        .from("product_categories")
        .select("product_id, category_id")
        .in("category_id", categoryIds);

      if (pcError) {
        console.error(pcError);
        setProducts([]);
        return;
      }

      const uniqueProductIds = Array.from(
        new Set(productCats?.map((p) => p.product_id))
      );

      if (uniqueProductIds.length === 0) {
        setProducts([]);
        return;
      }

      const { data: productsData, error: prodError } = await supabase
        .from("products")
        .select("*")
        .in("id", uniqueProductIds);

      if (prodError) {
        console.error(prodError);
        setProducts([]);
        return;
      }

      const mappedProducts: Product[] = productsData.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        quantity: p.quantity,
        status: p.status,
        seller_id: p.seller_id,
        mini_description: p.mini_description || "",
        inStock: p.quantity > 0 && p.status === "free",
        image: "/placeholder.svg",
        category:
          subcategories.find((c) =>
            productCats.some(
              (pc) => pc.product_id === p.id && pc.category_id === c.id
            )
          )?.name || category.name,
      }));

      setProducts(mappedProducts);
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast({
        title: "Out of stock",
        description: `${product.name} is not available.`,
        variant: "destructive",
      });
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      seller_id: product.seller_id || 0,
      image: product.image || "",
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (!category) return <div>Loading...</div>;

  return (
    <>
      <div className="relative h-60 my-10 bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden">
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-4xl text-white lg:text-7xl font-bold mb-4">
            {category.name}
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group transition-all duration-300 hover:shadow-xl border-0 shadow-md"
            >
              <CardContent className="p-0">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {!product.inStock && (
                      <Badge className="absolute top-4 left-4 bg-gray-500">
                        Out of Stock
                      </Badge>
                    )}

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white text-black hover:bg-gray-100">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  {product.category && (
                    <span className="text-sm text-purple-600 font-medium capitalize mb-2 block">
                      {product.category}
                    </span>
                  )}
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.mini_description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex w-full gap-2 justify-center">
                    <Link href={`/products/${product.id}`} className="w-full">
                      <Button variant="outline">
                        <Eye className="h-4 w-5" />
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </>
  );
}
