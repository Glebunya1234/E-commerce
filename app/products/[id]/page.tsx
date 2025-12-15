"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductImageGallery from "@/components/ProductImageGallery";
import RelatedProducts from "@/components/RelatedProducts";
import { supabase } from "@/lib/supabase";

interface Attribute {
  name: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  category: string;
  parentCategoryId: number;
  brand: string;
  description: string;
  miniDescription: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isSale?: boolean;
  tags: string[];
  variants?: {
    color?: string[];
    size?: string[];
  };
  seller?: {
    full_name: string;
    phone: string;
    address: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart, updateQuantity } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [parentCategories, setParentCategories] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const productId = params.id ? Number(params.id) : null;
      if (!productId) {
        setLoading(false);
        return;
      }

      // 1. Получаем продукт с продавцом
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select(
          `
        id, 
        name, 
        price, 
        quantity, 
        status, 
        description, 
        mini_description,
        seller_id,
        customers!products_seller_id_fkey (full_name, phone, address)
      `
        )
        .eq("id", productId)
        .single();

      if (productError || !productData) {
        console.error("Error fetching product:", productError);
        setLoading(false);
        return;
      }

      // 2. Получаем атрибуты продукта
      const { data: attrData, error: attrError } = await supabase
        .from("product_attributes")
        .select(`value, attribute_id (name)`)
        .eq("product_id", productId);

      if (attrError) console.error("Error fetching attributes:", attrError);

      const fetchedAttributes: Attribute[] =
        attrData?.map((a: any) => ({
          name: a.attribute_id.name,
          value: a.value,
        })) || [];

      setAttributes(fetchedAttributes);

      // 3. Получаем категории продукта
      const { data: productCategories } = await supabase
        .from("product_categories")
        .select("category_id")
        .eq("product_id", productId);

      const categoryIds = productCategories?.map((c) => c.category_id) || [];

      // 4. Получаем родительские категории
      let parentCats: { id: number; name: string }[] = [];
      let parentCategoryId = 0; // <- добавляем переменную для RelatedProducts

      for (const catId of categoryIds) {
        const { data: categoryData } = await supabase
          .from("categories")
          .select("id, name, parent_id")
          .eq("id", catId)
          .single();

        if (categoryData) {
          if (!categoryData.parent_id) {
            // родительская категория
            parentCats.push({ id: categoryData.id, name: categoryData.name });
            parentCategoryId = categoryData.id; // <- берем id родителя
          } else {
            // получаем родителя
            const { data: parentData } = await supabase
              .from("categories")
              .select("id, name")
              .eq("id", categoryData.parent_id)
              .single();
            if (parentData) {
              parentCats.push({ id: parentData.id, name: parentData.name });
              parentCategoryId = parentData.id; // <- берем id родителя
            }
          }
        }
      }

      setParentCategories(parentCats);

      // 5. Устанавливаем продукт
      setProduct({
        id: productData.id,
        name: productData.name,
        price: Number(productData.price),
        images: ["/placeholder.svg"],
        rating: 0,
        reviewCount: 0,
        category: "—",
        parentCategoryId: parentCategoryId,
        brand: productData.customers?.full_name || "Unknown seller",
        description: productData.description || "",
        miniDescription: productData.mini_description || "",
        features: [],
        specifications: {},
        inStock: productData.quantity > 0 && productData.status === "free",
        stockCount: productData.quantity,
        tags: [],
        seller: productData.customers
          ? {
              full_name: productData.customers.full_name,
              phone: productData.customers.phone,
              address: productData.customers.address,
            }
          : undefined,
      });

      setLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  const colorOptions = attributes
    .filter((a) => a.name.toLowerCase() === "color")
    .map((a) => a.value);

  useEffect(() => {
    if (colorOptions.length > 0 && !selectedVariants.color) {
      setSelectedVariants((prev) => ({ ...prev, color: colorOptions[0] }));
    }
  }, [colorOptions]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      variant: selectedVariants.color,
    });

    updateQuantity(product.id, quantity);

    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name}${
        selectedVariants.color ? ` (${selectedVariants.color})` : ""
      } added to your cart.`,
    });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stockCount || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: value }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product?.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!" });
    }
  };

  if (loading || !product) return null;

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.parentCategoryId === product.parentCategoryId && p.id !== product.id
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />

            <Link href="/products" className="hover:text-purple-600">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />

            {parentCategories.map((cat, index) => (
              <span key={cat.id} className="flex items-center space-x-2">
                <Link
                  href={`/categories/${cat.name}`}
                  className="hover:text-purple-600"
                >
                  {cat.name}
                </Link>
                {index < parentCategories.length - 1 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>
            ))}
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">
              {product?.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />

          <div className="space-y-6">
            <div>
              <Badge
                variant="secondary"
                className="text-purple-600 bg-purple-100"
              >
                {product.brand}
              </Badge>

              <h1 className="text-4xl font-bold text-gray-900 my-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="line-through text-gray-500">
                      ${product.originalPrice}
                    </span>
                    <Badge className="bg-red-100 text-red-800">
                      Save {discountPercentage}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Color + Quantity + Buttons */}
            <div className="space-y-6">
              {/* Color selection */}
              {product.miniDescription && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.miniDescription}
                </p>
              )}

              {colorOptions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Color:{" "}
                    <span className="text-purple-600">
                      {selectedVariants.color}
                    </span>
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleVariantChange("color", color)}
                        className={`px-4 py-2 border rounded-lg transition-all text-sm ${
                          selectedVariants.color === color
                            ? "border-purple-600 bg-purple-50 text-purple-600"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-12 w-12 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-lg font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                    className="h-12 w-12 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  {product.stockCount <= 10 && (
                    <span className="text-orange-600 font-medium">
                      Only {product.stockCount} left in stock
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`h-12 w-12 p-0 ${
                    isWishlisted ? "text-red-500 border-red-500" : ""
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="h-12 w-12 p-0 bg-transparent"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Card className="mb-16">
          <CardContent className="p-0">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3 border-b">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="seller">Seller Info</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-8">
                <p className="text-lg text-gray-700">{product.description}</p>
              </TabsContent>

              <TabsContent value="specifications" className="p-8">
                <div className="flex flex-col gap-6">
                  {Object.entries(
                    attributes.reduce((acc, attr) => {
                      if (!acc[attr.name]) acc[attr.name] = [];
                      acc[attr.name].push(attr.value);
                      return acc;
                    }, {} as Record<string, string[]>)
                  ).map(([name, values]) => (
                    <div
                      key={name}
                      className="flex justify-between border-b pb-2"
                    >
                      <span className="font-medium">{name}</span>
                      <span className="text-gray-600">{values.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="seller" className="p-8">
                {product.seller ? (
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {product.seller.full_name}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {product.seller.phone}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {product.seller.address}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Seller information not available.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {product && product.parentCategoryId !== 0 && (
          <RelatedProducts
            currentProductId={product.id}
            categoryId={product.parentCategoryId}
            categoryName={parentCategories[0]?.name || "Uncategory"}
          />
        )}
      </div>
    </div>
  );
}
