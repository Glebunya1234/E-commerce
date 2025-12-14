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
// } from "lucide-react";
// import Link from "next/link";
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

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortBy, setSortBy] = useState("featured");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   const categories = [
//     "all",
//     "electronics",
//     "fashion",
//     "home",
//     "sports",
//     "beauty",
//     "books",
//   ];

//   useEffect(() => {
//     // Mock products data
//     const mockProducts: Product[] = [
//       {
//         id: "1",
//         name: "Premium Wireless Headphones",
//         price: 299.99,
//         originalPrice: 399.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.8,
//         reviews: 124,
//         category: "electronics",
//         description:
//           "High-quality wireless headphones with noise cancellation and premium sound quality.",
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
//         description:
//           "Advanced fitness tracking with heart rate monitoring and GPS functionality.",
//         isNew: true,
//         inStock: true,
//       },
//       {
//         id: "3",
//         name: "Luxury Leather Bag",
//         price: 449.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.9,
//         reviews: 67,
//         category: "fashion",
//         description:
//           "Handcrafted leather bag with premium materials and elegant design.",
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
//         description:
//           "Professional-grade camera with advanced features for photography enthusiasts.",
//         isSale: true,
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
//         description:
//           "Stylish designer sunglasses with UV protection and premium frames.",
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
//         description:
//           "Voice-controlled smart speaker with high-quality audio and smart home integration.",
//         inStock: false,
//       },
//       {
//         id: "7",
//         name: "Yoga Mat Premium",
//         price: 79.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.7,
//         reviews: 92,
//         category: "sports",
//         description:
//           "Non-slip premium yoga mat with extra cushioning for comfortable practice.",
//         isNew: true,
//         inStock: true,
//       },
//       {
//         id: "8",
//         name: "Organic Skincare Set",
//         price: 89.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.6,
//         reviews: 134,
//         category: "beauty",
//         description:
//           "Complete organic skincare routine with natural ingredients and eco-friendly packaging.",
//         inStock: true,
//       },
//     ];
//     setProducts(mockProducts);
//     setFilteredProducts(mockProducts);
//   }, []);

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

//     // Filter by category
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     // Filter by price range
//     filtered = filtered.filter(
//       (product) => product.price >= minPrice && product.price <= maxPrice
//     );

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
//   }, [products, searchTerm, selectedCategory, sortBy, minPrice, maxPrice]);

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent navigation when clicking add to cart
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

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
//         <p className="text-xl text-gray-600">
//           Discover our complete collection of premium products
//         </p>
//       </div>

//       {/* Filters and Search */}
//       <div className="mb-8 space-y-4">
//         <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//           {/* Search */}
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           {/* View Mode Toggle */}
//           <div className="flex items-center space-x-2">
//             <Button
//               variant={viewMode === "grid" ? "default" : "outline"}
//               size="sm"
//               onClick={() => setViewMode("grid")}
//             >
//               <Grid className="h-4 w-4" />
//             </Button>
//             <Button
//               variant={viewMode === "list" ? "default" : "outline"}
//               size="sm"
//               onClick={() => setViewMode("list")}
//             >
//               <List className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Filters Row */}
//         <div className="flex flex-col lg:flex-row gap-4 items-center">
//           <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//             <SelectTrigger className="w-full lg:w-48">
//               <SelectValue placeholder="Category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((category) => (
//                 <SelectItem key={category} value={category}>
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={sortBy} onValueChange={setSortBy}>
//             <SelectTrigger className="w-full lg:w-48">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="featured">Featured</SelectItem>
//               <SelectItem value="newest">Newest</SelectItem>
//               <SelectItem value="price-low">Price: Low to High</SelectItem>
//               <SelectItem value="price-high">Price: High to Low</SelectItem>
//               <SelectItem value="rating">Highest Rated</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Price range */}
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">Price:</span>
//             <input
//               type="number"
//               min={0}
//               max={maxPrice}
//               value={minPrice}
//               onChange={(e) => setMinPrice(Number(e.target.value))}
//               className="w-24 rounded border px-2 py-1 text-sm"
//             />
//             <span className="text-sm text-gray-600">to</span>
//             <input
//               type="number"
//               min={minPrice}
//               max={10000}
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               className="w-24 rounded border px-2 py-1 text-sm"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-6">
//         <p className="text-gray-600">
//           Showing {filteredProducts.length} of {products.length} products
//         </p>
//       </div>

//       {/* Products Grid/List */}
//       <div
//         className={
//           viewMode === "grid"
//             ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//             : "space-y-4"
//         }
//       >
//         {filteredProducts.map((product) => (
//           <Card
//             key={product.id}
//             className={`group transition-all duration-300 hover:shadow-xl border-0 shadow-md ${
//               viewMode === "list"
//                 ? "flex flex-row overflow-hidden"
//                 : "hover:-translate-y-2"
//             }`}
//             onMouseEnter={() => setHoveredProduct(product.id)}
//             onMouseLeave={() => setHoveredProduct(null)}
//           >
//             <CardContent className="p-0">
//               {viewMode === "grid" ? (
//                 // Grid View
//                 <>
//                   <Link href={`/products/${product.id}`} className="block">
//                     <div className="relative overflow-hidden rounded-t-lg">
//                       <img
//                         src={product.image || "/placeholder.svg"}
//                         alt={product.name}
//                         className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
//                       />

//                       {/* Badges */}
//                       <div className="absolute top-4 left-4 flex flex-col gap-2">
//                         {product.isNew && (
//                           <Badge className="bg-green-500 hover:bg-green-600">
//                             New
//                           </Badge>
//                         )}
//                         {product.isSale && (
//                           <Badge className="bg-red-500 hover:bg-red-600">
//                             Sale
//                           </Badge>
//                         )}
//                         {!product.inStock && (
//                           <Badge className="bg-gray-500">Out of Stock</Badge>
//                         )}
//                       </div>

//                       {/* Quick Actions */}
//                       <div className="absolute top-4 right-4 flex flex-col gap-2">
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                           }}
//                         >
//                           <Heart className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       {/* View Details Overlay */}
//                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                         <Button className="bg-white text-black hover:bg-gray-100">
//                           <Eye className="mr-2 h-4 w-4" />
//                           View Details
//                         </Button>
//                       </div>
//                     </div>
//                   </Link>

//                   <div className="p-6">
//                     <div className="mb-2">
//                       <span className="text-sm text-purple-600 font-medium capitalize">
//                         {product.category}
//                       </span>
//                     </div>

//                     <Link href={`/products/${product.id}`}>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
//                         {product.name}
//                       </h3>
//                     </Link>

//                     <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                       {product.description}
//                     </p>

//                     <div className="flex items-center mb-3">
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`h-4 w-4 ${
//                               i < Math.floor(product.rating)
//                                 ? "text-yellow-400 fill-current"
//                                 : "text-gray-300"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-gray-600 ml-2">
//                         ({product.reviews})
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center gap-2">
//                         <span className="text-xl font-bold text-gray-900">
//                           ${product.price}
//                         </span>
//                         {product.originalPrice && (
//                           <span className="text-sm text-gray-500 line-through">
//                             ${product.originalPrice}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-2">
//                       <Link href={`/products/${product.id}`} className="flex-1">
//                         <Button
//                           variant="outline"
//                           className="w-full bg-transparent"
//                         >
//                           View Details
//                         </Button>
//                       </Link>
//                       <Button
//                         onClick={(e) => handleAddToCart(product, e)}
//                         className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                         disabled={!product.inStock}
//                       >
//                         <ShoppingCart className="mr-2 h-4 w-4" />
//                         {product.inStock ? "Add to Cart" : "Out of Stock"}
//                       </Button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 // List View
//                 <div className="flex w-full">
//                   <Link
//                     href={`/products/${product.id}`}
//                     className="w-48 h-48 flex-shrink-0"
//                   >
//                     <img
//                       src={product.image || "/placeholder.svg"}
//                       alt={product.name}
//                       className="w-full h-full object-cover hover:opacity-90 transition-opacity"
//                     />
//                   </Link>
//                   <div className="flex-1 p-6">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <span className="text-sm text-purple-600 font-medium capitalize">
//                           {product.category}
//                         </span>
//                         <Link href={`/products/${product.id}`}>
//                           <h3 className="text-xl font-semibold text-gray-900 mt-1 hover:text-purple-600 transition-colors">
//                             {product.name}
//                           </h3>
//                         </Link>
//                       </div>
//                       <div className="flex gap-2">
//                         {product.isNew && (
//                           <Badge className="bg-green-500">New</Badge>
//                         )}
//                         {product.isSale && (
//                           <Badge className="bg-red-500">Sale</Badge>
//                         )}
//                         {!product.inStock && (
//                           <Badge className="bg-gray-500">Out of Stock</Badge>
//                         )}
//                       </div>
//                     </div>

//                     <p className="text-gray-600 mb-4">{product.description}</p>

//                     <div className="flex items-center mb-4">
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`h-4 w-4 ${
//                               i < Math.floor(product.rating)
//                                 ? "text-yellow-400 fill-current"
//                                 : "text-gray-300"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-gray-600 ml-2">
//                         ({product.reviews} reviews)
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <span className="text-2xl font-bold text-gray-900">
//                           ${product.price}
//                         </span>
//                         {product.originalPrice && (
//                           <span className="text-lg text-gray-500 line-through">
//                             ${product.originalPrice}
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex gap-2">
//                         <Button variant="outline" size="sm">
//                           <Heart className="h-4 w-4" />
//                         </Button>
//                         <Link href={`/products/${product.id}`}>
//                           <Button variant="outline" size="sm">
//                             <Eye className="h-4 w-4" />
//                             View Details
//                           </Button>
//                         </Link>
//                         <Button
//                           onClick={(e) => handleAddToCart(product, e)}
//                           disabled={!product.inStock}
//                           className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                         >
//                           <ShoppingCart className="mr-2 h-4 w-4" />
//                           {product.inStock ? "Add to Cart" : "Out of Stock"}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* No Results */}
//       {filteredProducts.length === 0 && (
//         <div className="text-center py-16">
//           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Search className="w-12 h-12 text-gray-400" />
//           </div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-2">
//             No products found
//           </h3>
//           <p className="text-gray-600 mb-6">
//             Try adjusting your search or filter criteria
//           </p>
//           <Button
//             onClick={() => {
//               setSearchTerm("");
//               setSelectedCategory("all");
//               setMinPrice(0);
//               setMaxPrice(1000);
//             }}
//             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//           >
//             Clear Filters
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }
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
  description: string;
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

  // Загружаем категории и строим мапу id -> объект категории
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

  // Загружаем продукты с категориями
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
        .select("*");

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
          description: "No description available",
          image: "/placeholder.svg",
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
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
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
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </div>

                <div className="flex w-full gap-2 justify-between">
                  <Link href={`/products/${product.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-5" />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.inStock}
                    className="bg-gradient-to-r w-full from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
