"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Heart, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  status: string;
  categories: string[];
  seller_id: number | null;
  mini_description: string;
  image?: string;
  inStock: boolean;
}

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, Category>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setCategories(data);
        const map: Record<number, Category> = {};
        data.forEach((c) => {
          map[c.id] = c;
        });
        setCategoryMap(map);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: productCats, error: pcError } = await supabase
        .from("product_categories")
        .select("*");

      if (pcError) {
        console.error(pcError);
        return;
      }

      const { data: productsData, error: prodError } = await supabase
        .from("products")
        .select(
          "id, name, price, quantity, status, seller_id, mini_description"
        );

      if (prodError) {
        console.error(prodError);
        return;
      }

      const mappedProducts: Product[] = (productsData || []).map((p: any) => {
        const productCategoryIds =
          productCats
            ?.filter((pc) => pc.product_id === p.id)
            .map((pc) => pc.category_id) || [];

        const parentCategories: string[] = [];
        const childCategories: string[] = [];

        productCategoryIds.forEach((id) => {
          const cat = categoryMap[id];
          if (!cat) return;

          if (cat.parent_id === null) {
            if (!parentCategories.includes(cat.name))
              parentCategories.push(cat.name);
          } else {
            if (!childCategories.includes(cat.name))
              childCategories.push(cat.name);
            const parent = categoryMap[cat.parent_id];
            if (parent && !parentCategories.includes(parent.name))
              parentCategories.push(parent.name);
          }
        });

        const allCategories = [
          ...parentCategories,
          ...childCategories.filter((c) => !parentCategories.includes(c)),
        ];

        return {
          id: p.id,
          name: p.name,
          price: Number(p.price),
          quantity: Number(p.quantity),
          status: p.status,
          inStock: p.quantity > 0 && p.status === "free",
          categories: allCategories,
          mini_description: p.mini_description || "No description available",
          image: "/placeholder.svg",
          seller_id: p.seller_id || null,
        };
      });

      setProducts(mappedProducts);
      setFilteredProducts(mappedProducts);
    };

    if (Object.keys(categoryMap).length > 0) {
      fetchProducts();
    }
  }, [categoryMap]);

  // Фильтры по поиску, категории и цене
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) =>
        p.categories.includes(selectedCategory)
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock.",
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
      image: product.image || "/placeholder.svg",
    });

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-xl text-gray-600">
          Discover our complete collection of premium products
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories
                .filter((c) => c.parent_id === null)
                .map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Price:</span>
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-24 rounded border px-2 py-1 text-sm"
            />
            <span className="text-sm text-gray-600">to</span>
            <input
              type="number"
              min={minPrice}
              max={10000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 rounded border px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <span className="absolute top-4 left-4 bg-gray-500 text-white px-2 py-1 text-sm rounded">
                      Out of Stock
                    </span>
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
                <div className="mb-2">
                  {product.categories.map((cat, index) => (
                    <span
                      key={cat}
                      className="text-sm text-purple-600 font-medium capitalize"
                    >
                      {cat}
                      {index < product.categories.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.mini_description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </div>

                <div className="flex w-full gap-2 justify-center">
                  <Link href={`/products/${product.id}`} className="w-full">
                    <Button variant="outline">
                      <Eye className="h-4 w-5" />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.inStock}
                    className="bg-gradient-to-r  from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <ShoppingCart className="mr-2 h-4 w-5" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
