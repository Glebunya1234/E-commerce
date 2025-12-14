// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Star,
//   ShoppingCart,
//   Heart,
//   Eye,
//   Search,
//   Grid,
//   List,
//   ArrowLeft,
// } from "lucide-react";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import { useCart } from "@/contexts/CartContext";
// import { useToast } from "@/hooks/use-toast";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   rating: number;
//   reviews: number;
//   category: string;
//   description: string;
//   isNew?: boolean;
//   isSale?: boolean;
//   inStock: boolean;
// }

// const categoryData = {
//   electronics: {
//     title: "Electronics",
//     description: "Discover the latest in technology and electronics",
//     banner: "/placeholder.svg?height=300&width=1200",
//     products: [
//       {
//         id: "1",
//         name: "Premium Wireless Headphones",
//         price: 299.99,
//         originalPrice: 399.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.8,
//         reviews: 124,
//         category: "electronics",
//         description: "High-quality wireless headphones with noise cancellation",
//         isSale: true,
//         inStock: true,
//       },
//       {
//         id: "2",
//         name: "Smart Fitness Watch",
//         price: 199.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.6,
//         reviews: 89,
//         category: "electronics",
//         description: "Advanced fitness tracking with heart rate monitoring",
//         isNew: true,
//         inStock: true,
//       },
//       {
//         id: "4",
//         name: "Professional Camera",
//         price: 899.99,
//         originalPrice: 1099.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.7,
//         reviews: 156,
//         category: "electronics",
//         description: "Professional-grade camera with advanced features",
//         isSale: true,
//         inStock: true,
//       },
//       {
//         id: "6",
//         name: "Smart Home Speaker",
//         price: 129.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.4,
//         reviews: 78,
//         category: "electronics",
//         description: "Voice-controlled smart speaker with high-quality audio",
//         inStock: true,
//       },
//     ],
//   },
//   fashion: {
//     title: "Fashion & Apparel",
//     description: "Trendy clothing, shoes, and accessories for all occasions",
//     banner: "/placeholder.svg?height=300&width=1200",
//     products: [
//       {
//         id: "3",
//         name: "Luxury Leather Bag",
//         price: 449.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.9,
//         reviews: 67,
//         category: "fashion",
//         description: "Handcrafted leather bag with premium materials",
//         inStock: true,
//       },
//       {
//         id: "5",
//         name: "Designer Sunglasses",
//         price: 159.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.5,
//         reviews: 43,
//         category: "fashion",
//         description: "Stylish designer sunglasses with UV protection",
//         inStock: true,
//       },
//     ],
//   },
//   home: {
//     title: "Home & Garden",
//     description: "Furniture, decor, kitchen essentials, and garden supplies",
//     banner: "/placeholder.svg?height=300&width=1200",
//     products: [
//       {
//         id: "home-1",
//         name: "Modern Coffee Table",
//         price: 299.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.6,
//         reviews: 45,
//         category: "home",
//         description: "Sleek modern coffee table with storage",
//         inStock: true,
//       },
//       {
//         id: "home-2",
//         name: "Decorative Plant Set",
//         price: 89.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.8,
//         reviews: 32,
//         category: "home",
//         description: "Beautiful indoor plants for home decoration",
//         isNew: true,
//         inStock: true,
//       },
//     ],
//   },
//   sports: {
//     title: "Sports & Fitness",
//     description: "Exercise equipment, sportswear, and outdoor gear",
//     banner: "/placeholder.svg?height=300&width=1200",
//     products: [
//       {
//         id: "7",
//         name: "Yoga Mat Premium",
//         price: 79.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.7,
//         reviews: 92,
//         category: "sports",
//         description: "Non-slip premium yoga mat with extra cushioning",
//         isNew: true,
//         inStock: true,
//       },
//       {
//         id: "sports-1",
//         name: "Resistance Bands Set",
//         price: 39.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.5,
//         reviews: 67,
//         category: "sports",
//         description: "Complete resistance bands set for home workouts",
//         inStock: true,
//       },
//     ],
//   },
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   const categorySlug = params.category as string;
//   const category = categoryData[categorySlug as keyof typeof categoryData];

//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("featured");
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

//   useEffect(() => {
//     if (category) {
//       setProducts(category.products);
//       setFilteredProducts(category.products);
//     }
//   }, [category]);

//   useEffect(() => {
//     let filtered = products;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Sort products
//     switch (sortBy) {
//       case "price-low":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         filtered.sort((a, b) => b.rating - a.rating);
//         break;
//       case "newest":
//         filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
//         break;
//       default:
//         // Keep original order for "featured"
//         break;
//     }

//     setFilteredProducts(filtered);
//   }, [products, searchTerm, sortBy]);

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!product.inStock) {
//       toast({
//         title: "Out of stock",
//         description: "This product is currently out of stock.",
//         variant: "destructive",
//       });
//       return;
//     }

//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//     });
//     toast({
//       title: "Added to cart!",
//       description: `${product.name} has been added to your cart.`,
//     });
//   };

//   // If category doesn't exist, show coming soon page
//   if (!category) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Breadcrumb */}
//         <div className="bg-white border-b">
//           <div className="container mx-auto px-4 py-4">
//             <Link
//               href="/categories"
//               className="inline-flex items-center text-purple-600 hover:text-purple-700"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Categories
//             </Link>
//           </div>
//         </div>

//         {/* Coming Soon Content */}
//         <div className="container mx-auto px-4 py-16">
//           <div className="max-w-2xl mx-auto text-center">
//             <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8">
//               <span className="text-4xl">🚀</span>
//             </div>

//             <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
//               {categorySlug?.replace("-", " ")} Category
//             </h1>

//             <p className="text-xl text-gray-600 mb-8">
//               We're working hard to bring you amazing products in this category.
//               Stay tuned for exciting updates!
//             </p>

//             <div className="bg-white p-8 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//                 Coming Soon!
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 This category is currently under development. We're curating the
//                 best products just for you.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="/categories">
//                   <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
//                     Browse Other Categories
//                   </Button>
//                 </Link>
//                 <Link href="/products">
//                   <Button variant="outline">View All Products</Button>
//                 </Link>
//               </div>
//             </div>

//             <div className="text-sm text-gray-500">
//               <p>Want to be notified when this category launches?</p>
//               <Link
//                 href="/contact"
//                 className="text-purple-600 hover:text-purple-700 underline"
//               >
//                 Contact us to stay updated
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4">
//           <nav className="flex items-center space-x-2 text-sm text-gray-600">
//             <Link href="/" className="hover:text-purple-600">
//               Home
//             </Link>
//             <span>/</span>
//             <Link href="/categories" className="hover:text-purple-600">
//               Categories
//             </Link>
//             <span>/</span>
//             <span className="text-gray-900 font-medium">{category.title}</span>
//           </nav>
//         </div>
//       </div>

//       {/* Category Banner */}
//       <div className="relative h-64 bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="relative container mx-auto px-4 h-full flex items-center">
//           <div className="text-white">
//             <h1 className="text-4xl lg:text-5xl font-bold mb-4">
//               {category.title}
//             </h1>
//             <p className="text-xl opacity-90">{category.description}</p>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Filters and Search */}
//         <div className="mb-8 space-y-4">
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             {/* View Mode Toggle */}
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant={viewMode === "grid" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setViewMode("grid")}
//               >
//                 <Grid className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant={viewMode === "list" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setViewMode("list")}
//               >
//                 <List className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           {/* Sort */}
//           <div className="flex items-center justify-between">
//             <p className="text-gray-600">
//               Showing {filteredProducts.length} of {products.length} products
//             </p>

//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="featured">Featured</SelectItem>
//                 <SelectItem value="newest">Newest</SelectItem>
//                 <SelectItem value="price-low">Price: Low to High</SelectItem>
//                 <SelectItem value="price-high">Price: High to Low</SelectItem>
//                 <SelectItem value="rating">Highest Rated</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Products Grid/List */}
//         <div
//           className={
//             viewMode === "grid"
//               ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//               : "space-y-4"
//           }
//         >
//           {filteredProducts.map((product) => (
//             <Card
//               key={product.id}
//               className={`group transition-all duration-300 hover:shadow-xl border-0 shadow-md ${
//                 viewMode === "list"
//                   ? "flex flex-row overflow-hidden"
//                   : "hover:-translate-y-2"
//               }`}
//               onMouseEnter={() => setHoveredProduct(product.id)}
//               onMouseLeave={() => setHoveredProduct(null)}
//             >
//               <CardContent className="p-0">
//                 {viewMode === "grid" ? (
//                   // Grid View
//                   <>
//                     <Link href={`/products/${product.id}`} className="block">
//                       <div className="relative overflow-hidden rounded-t-lg">
//                         <img
//                           src={product.image || "/placeholder.svg"}
//                           alt={product.name}
//                           className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
//                         />

//                         {/* Badges */}
//                         <div className="absolute top-4 left-4 flex flex-col gap-2">
//                           {product.isNew && (
//                             <Badge className="bg-green-500 hover:bg-green-600">
//                               New
//                             </Badge>
//                           )}
//                           {product.isSale && (
//                             <Badge className="bg-red-500 hover:bg-red-600">
//                               Sale
//                             </Badge>
//                           )}
//                           {!product.inStock && (
//                             <Badge className="bg-gray-500">Out of Stock</Badge>
//                           )}
//                         </div>

//                         {/* Quick Actions */}
//                         <div className="absolute top-4 right-4 flex flex-col gap-2">
//                           <Button
//                             size="sm"
//                             variant="secondary"
//                             className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                             }}
//                           >
//                             <Heart className="h-4 w-4" />
//                           </Button>
//                         </div>

//                         {/* View Details Overlay */}
//                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                           <Button className="bg-white text-black hover:bg-gray-100">
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
//                           </Button>
//                         </div>
//                       </div>
//                     </Link>

//                     <div className="p-6">
//                       <Link href={`/products/${product.id}`}>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
//                           {product.name}
//                         </h3>
//                       </Link>

//                       <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                         {product.description}
//                       </p>

//                       <div className="flex items-center mb-3">
//                         <div className="flex items-center">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 ${
//                                 i < Math.floor(product.rating)
//                                   ? "text-yellow-400 fill-current"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                         <span className="text-sm text-gray-600 ml-2">
//                           ({product.reviews})
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-2">
//                           <span className="text-xl font-bold text-gray-900">
//                             ${product.price}
//                           </span>
//                           {product.originalPrice && (
//                             <span className="text-sm text-gray-500 line-through">
//                               ${product.originalPrice}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex gap-2">
//                         <Link
//                           href={`/products/${product.id}`}
//                           className="flex-1"
//                         >
//                           <Button
//                             variant="outline"
//                             className="w-full bg-transparent"
//                           >
//                             View Details
//                           </Button>
//                         </Link>
//                         <Button
//                           onClick={(e) => handleAddToCart(product, e)}
//                           className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                           disabled={!product.inStock}
//                         >
//                           <ShoppingCart className="mr-2 h-4 w-4" />
//                           {product.inStock ? "Add to Cart" : "Out of Stock"}
//                         </Button>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   // List View
//                   <div className="flex w-full">
//                     <Link
//                       href={`/products/${product.id}`}
//                       className="w-48 h-48 flex-shrink-0"
//                     >
//                       <img
//                         src={product.image || "/placeholder.svg"}
//                         alt={product.name}
//                         className="w-full h-full object-cover hover:opacity-90 transition-opacity"
//                       />
//                     </Link>
//                     <div className="flex-1 p-6">
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <Link href={`/products/${product.id}`}>
//                             <h3 className="text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors">
//                               {product.name}
//                             </h3>
//                           </Link>
//                         </div>
//                         <div className="flex gap-2">
//                           {product.isNew && (
//                             <Badge className="bg-green-500">New</Badge>
//                           )}
//                           {product.isSale && (
//                             <Badge className="bg-red-500">Sale</Badge>
//                           )}
//                           {!product.inStock && (
//                             <Badge className="bg-gray-500">Out of Stock</Badge>
//                           )}
//                         </div>
//                       </div>

//                       <p className="text-gray-600 mb-4">
//                         {product.description}
//                       </p>

//                       <div className="flex items-center mb-4">
//                         <div className="flex items-center">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 ${
//                                 i < Math.floor(product.rating)
//                                   ? "text-yellow-400 fill-current"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                         <span className="text-sm text-gray-600 ml-2">
//                           ({product.reviews} reviews)
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <span className="text-2xl font-bold text-gray-900">
//                             ${product.price}
//                           </span>
//                           {product.originalPrice && (
//                             <span className="text-lg text-gray-500 line-through">
//                               ${product.originalPrice}
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex gap-2">
//                           <Button variant="outline" size="sm">
//                             <Heart className="h-4 w-4" />
//                           </Button>
//                           <Link href={`/products/${product.id}`}>
//                             <Button variant="outline" size="sm">
//                               <Eye className="h-4 w-4" />
//                               View Details
//                             </Button>
//                           </Link>
//                           <Button
//                             onClick={(e) => handleAddToCart(product, e)}
//                             disabled={!product.inStock}
//                             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                           >
//                             <ShoppingCart className="mr-2 h-4 w-4" />
//                             {product.inStock ? "Add to Cart" : "Out of Stock"}
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* No Results */}
//         {filteredProducts.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Search className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-900 mb-2">
//               No products found
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Try adjusting your search criteria
//             </p>
//             <Button
//               onClick={() => setSearchTerm("")}
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//             >
//               Clear Search
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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

  // Получаем категорию по slug (имя)
  useEffect(() => {
    const fetchCategory = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("name", categorySlug)
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
      // 1. Получаем подкатегории выбранной категории
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

      // Добавляем саму главную категорию
      const categoryIds = [category.id, ...subcategoryIds];

      // 2. Получаем product_id из таблицы product_categories для этих категорий
      const { data: productCats, error: pcError } = await supabase
        .from("product_categories")
        .select("product_id, category_id")
        .in("category_id", categoryIds);

      if (pcError) {
        console.error(pcError);
        setProducts([]);
        return;
      }

      // Убираем дубликаты product_id
      const uniqueProductIds = Array.from(
        new Set(productCats?.map((p) => p.product_id))
      );

      if (uniqueProductIds.length === 0) {
        setProducts([]);
        return;
      }

      // 3. Получаем продукты по этим уникальным ID
      const { data: productsData, error: prodError } = await supabase
        .from("products")
        .select("*")
        .in("id", uniqueProductIds);

      if (prodError) {
        console.error(prodError);
        setProducts([]);
        return;
      }

      // 4. Мапим продукты
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
