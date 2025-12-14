// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Star,
//   ShoppingCart,
//   Heart,
//   Share2,
//   Truck,
//   Shield,
//   RotateCcw,
//   ChevronRight,
//   Plus,
//   Minus,
//   Check,
// } from "lucide-react"
// import Link from "next/link"
// import { useParams, useRouter } from "next/navigation"
// import { useCart } from "@/contexts/CartContext"
// import { useToast } from "@/hooks/use-toast"
// import ProductImageGallery from "@/components/ProductImageGallery"
// import ProductReviews from "@/components/ProductReviews"
// import ProductSpecifications from "@/components/ProductSpecifications"
// import RelatedProducts from "@/components/RelatedProducts"

// interface Product {
//   id: string
//   name: string
//   price: number
//   originalPrice?: number
//   images: string[]
//   rating: number
//   reviewCount: number
//   category: string
//   brand: string
//   description: string
//   longDescription: string
//   features: string[]
//   specifications: Record<string, string>
//   inStock: boolean
//   stockCount: number
//   isNew?: boolean
//   isSale?: boolean
//   tags: string[]
//   variants?: {
//     color?: string[]
//     size?: string[]
//   }
// }

// export default function ProductDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const { addToCart } = useCart()
//   const { toast } = useToast()

//   const [product, setProduct] = useState<Product | null>(null)
//   const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
//   const [quantity, setQuantity] = useState(1)
//   const [isWishlisted, setIsWishlisted] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Mock product data - in real app, fetch from API
//     const mockProduct: Product = {
//       id: params.id as string,
//       name: "Premium Wireless Headphones",
//       price: 299.99,
//       originalPrice: 399.99,
//       images: [
//         "/placeholder.svg?height=600&width=600",
//         "/placeholder.svg?height=600&width=600",
//         "/placeholder.svg?height=600&width=600",
//         "/placeholder.svg?height=600&width=600",
//         "/placeholder.svg?height=600&width=600",
//       ],
//       rating: 4.8,
//       reviewCount: 124,
//       category: "Electronics",
//       brand: "AudioTech",
//       description:
//         "Experience premium sound quality with our flagship wireless headphones featuring active noise cancellation and 30-hour battery life.",
//       longDescription:
//         "Immerse yourself in crystal-clear audio with our Premium Wireless Headphones. Engineered with cutting-edge technology, these headphones deliver exceptional sound quality whether you're listening to music, taking calls, or enjoying multimedia content. The advanced active noise cancellation technology blocks out ambient noise, allowing you to focus on what matters most. With a comfortable over-ear design and premium materials, these headphones are built for extended listening sessions.",
//       features: [
//         "Active Noise Cancellation (ANC)",
//         "30-hour battery life with ANC off",
//         "Quick charge: 5 minutes = 3 hours playback",
//         "Premium leather ear cushions",
//         "Bluetooth 5.2 connectivity",
//         "Built-in microphone for calls",
//         "Foldable design for portability",
//         "Touch controls on ear cup",
//       ],
//       specifications: {
//         "Driver Size": "40mm dynamic drivers",
//         "Frequency Response": "20Hz - 20kHz",
//         Impedance: "32 ohms",
//         Sensitivity: "110 dB SPL",
//         "Battery Life": "30 hours (ANC off), 20 hours (ANC on)",
//         "Charging Time": "2 hours (full charge)",
//         Connectivity: "Bluetooth 5.2, 3.5mm jack",
//         Weight: "280g",
//         Dimensions: "190 x 165 x 80mm",
//         Warranty: "2 years international warranty",
//       },
//       inStock: true,
//       stockCount: 15,
//       isSale: true,
//       tags: ["wireless", "noise-cancelling", "premium", "bluetooth"],
//       variants: {
//         color: ["Black", "White", "Silver", "Navy Blue"],
//         size: ["Standard"],
//       },
//     }

//     setProduct(mockProduct)
//     setSelectedVariants({
//       color: mockProduct.variants?.color?.[0] || "",
//       size: mockProduct.variants?.size?.[0] || "",
//     })
//     setLoading(false)
//   }, [params.id])

//   const handleAddToCart = () => {
//     if (!product) return

//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.images[0],
//       quantity: quantity,
//     })

//     toast({
//       title: "Added to cart!",
//       description: `${quantity} x ${product.name} added to your cart.`,
//     })
//   }

//   const handleQuantityChange = (change: number) => {
//     const newQuantity = quantity + change
//     if (newQuantity >= 1 && newQuantity <= (product?.stockCount || 1)) {
//       setQuantity(newQuantity)
//     }
//   }

//   const handleVariantChange = (type: string, value: string) => {
//     setSelectedVariants((prev) => ({ ...prev, [type]: value }))
//   }

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: product?.name,
//           text: product?.description,
//           url: window.location.href,
//         })
//       } catch (error) {
//         console.log("Error sharing:", error)
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.href)
//       toast({
//         title: "Link copied!",
//         description: "Product link copied to clipboard.",
//       })
//     }
//   }

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="animate-pulse">
//           <div className="grid lg:grid-cols-2 gap-8">
//             <div className="aspect-square bg-gray-200 rounded-lg"></div>
//             <div className="space-y-4">
//               <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               <div className="h-6 bg-gray-200 rounded w-1/4"></div>
//               <div className="space-y-2">
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
//         <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
//         <Link href="/products">
//           <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
//             Browse Products
//           </Button>
//         </Link>
//       </div>
//     )
//   }

//   const discountPercentage = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4">
//           <nav className="flex items-center space-x-2 text-sm text-gray-600">
//             <Link href="/" className="hover:text-purple-600">
//               Home
//             </Link>
//             <ChevronRight className="h-4 w-4" />
//             <Link href="/products" className="hover:text-purple-600">
//               Products
//             </Link>
//             <ChevronRight className="h-4 w-4" />
//             <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-purple-600">
//               {product.category}
//             </Link>
//             <ChevronRight className="h-4 w-4" />
//             <span className="text-gray-900 font-medium truncate">{product.name}</span>
//           </nav>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Main Product Section */}
//         <div className="grid lg:grid-cols-2 gap-12 mb-16">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <ProductImageGallery images={product.images} productName={product.name} />
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             {/* Header */}
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <Badge variant="secondary" className="text-purple-600 bg-purple-100">
//                   {product.brand}
//                 </Badge>
//                 {product.isNew && <Badge className="bg-green-500">New</Badge>}
//                 {product.isSale && <Badge className="bg-red-500">Sale</Badge>}
//               </div>

//               <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

//               {/* Rating */}
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-5 w-5 ${
//                         i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
//                       }`}
//                     />
//                   ))}
//                   <span className="ml-2 text-lg font-medium">{product.rating}</span>
//                 </div>
//                 <span className="text-gray-600">({product.reviewCount} reviews)</span>
//               </div>

//               {/* Price */}
//               <div className="flex items-center gap-4 mb-6">
//                 <span className="text-4xl font-bold text-gray-900">${product.price}</span>
//                 {product.originalPrice && (
//                   <>
//                     <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
//                     <Badge className="bg-red-100 text-red-800">Save {discountPercentage}%</Badge>
//                   </>
//                 )}
//               </div>

//               <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
//             </div>

//             {/* Variants */}
//             {product.variants && (
//               <div className="space-y-4">
//                 {product.variants.color && (
//                   <div>
//                     <h3 className="text-lg font-semibold mb-3">Color: {selectedVariants.color}</h3>
//                     <div className="flex gap-2">
//                       {product.variants.color.map((color) => (
//                         <button
//                           key={color}
//                           onClick={() => handleVariantChange("color", color)}
//                           className={`px-4 py-2 border rounded-lg transition-all ${
//                             selectedVariants.color === color
//                               ? "border-purple-600 bg-purple-50 text-purple-600"
//                               : "border-gray-300 hover:border-gray-400"
//                           }`}
//                         >
//                           {color}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {product.variants.size && product.variants.size.length > 1 && (
//                   <div>
//                     <h3 className="text-lg font-semibold mb-3">Size: {selectedVariants.size}</h3>
//                     <div className="flex gap-2">
//                       {product.variants.size.map((size) => (
//                         <button
//                           key={size}
//                           onClick={() => handleVariantChange("size", size)}
//                           className={`px-4 py-2 border rounded-lg transition-all ${
//                             selectedVariants.size === size
//                               ? "border-purple-600 bg-purple-50 text-purple-600"
//                               : "border-gray-300 hover:border-gray-400"
//                           }`}
//                         >
//                           {size}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Quantity & Actions */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center border rounded-lg">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleQuantityChange(-1)}
//                     disabled={quantity <= 1}
//                     className="h-12 w-12 p-0"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="px-4 py-2 text-lg font-medium min-w-[3rem] text-center">{quantity}</span>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleQuantityChange(1)}
//                     disabled={quantity >= product.stockCount}
//                     className="h-12 w-12 p-0"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>

//                 <div className="text-sm text-gray-600">
//                   {product.stockCount <= 10 && (
//                     <span className="text-orange-600 font-medium">Only {product.stockCount} left in stock</span>
//                   )}
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <Button
//                   onClick={handleAddToCart}
//                   disabled={!product.inStock}
//                   className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg"
//                 >
//                   <ShoppingCart className="mr-2 h-5 w-5" />
//                   {product.inStock ? "Add to Cart" : "Out of Stock"}
//                 </Button>

//                 <Button
//                   variant="outline"
//                   onClick={() => setIsWishlisted(!isWishlisted)}
//                   className={`h-12 w-12 p-0 ${isWishlisted ? "text-red-500 border-red-500" : ""}`}
//                 >
//                   <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
//                 </Button>

//                 <Button variant="outline" onClick={handleShare} className="h-12 w-12 p-0 bg-transparent">
//                   <Share2 className="h-5 w-5" />
//                 </Button>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="bg-white p-6 rounded-lg border">
//               <h3 className="text-lg font-semibold mb-4">Key Features</h3>
//               <ul className="space-y-2">
//                 {product.features.slice(0, 4).map((feature, index) => (
//                   <li key={index} className="flex items-center">
//                     <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
//                     <span className="text-gray-700">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Trust Badges */}
//             <div className="grid grid-cols-3 gap-4">
//               <div className="flex items-center p-4 bg-white rounded-lg border">
//                 <Truck className="h-8 w-8 text-green-600 mr-3" />
//                 <div>
//                   <p className="font-medium text-sm">Free Shipping</p>
//                   <p className="text-xs text-gray-600">On orders over $50</p>
//                 </div>
//               </div>

//               <div className="flex items-center p-4 bg-white rounded-lg border">
//                 <Shield className="h-8 w-8 text-blue-600 mr-3" />
//                 <div>
//                   <p className="font-medium text-sm">2 Year Warranty</p>
//                   <p className="text-xs text-gray-600">International coverage</p>
//                 </div>
//               </div>

//               <div className="flex items-center p-4 bg-white rounded-lg border">
//                 <RotateCcw className="h-8 w-8 text-purple-600 mr-3" />
//                 <div>
//                   <p className="font-medium text-sm">30-Day Returns</p>
//                   <p className="text-xs text-gray-600">Hassle-free returns</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <Card className="mb-16">
//           <CardContent className="p-0">
//             <Tabs defaultValue="description" className="w-full">
//               <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
//                 <TabsTrigger value="description" className="text-lg py-4">
//                   Description
//                 </TabsTrigger>
//                 <TabsTrigger value="specifications" className="text-lg py-4">
//                   Specifications
//                 </TabsTrigger>
//                 <TabsTrigger value="reviews" className="text-lg py-4">
//                   Reviews ({product.reviewCount})
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="description" className="p-8">
//                 <div className="prose max-w-none">
//                   <h3 className="text-2xl font-bold mb-4">Product Description</h3>
//                   <p className="text-lg text-gray-700 leading-relaxed mb-6">{product.longDescription}</p>

//                   <h4 className="text-xl font-semibold mb-4">Features & Benefits</h4>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {product.features.map((feature, index) => (
//                       <div key={index} className="flex items-start">
//                         <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="specifications" className="p-8">
//                 <ProductSpecifications specifications={product.specifications} />
//               </TabsContent>

//               <TabsContent value="reviews" className="p-8">
//                 <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>

//         {/* Related Products */}
//         <RelatedProducts currentProductId={product.id} category={product.category} />
//       </div>
//     </div>
//   )
// }

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
                  href={`/products/category/${cat.id}`}
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
