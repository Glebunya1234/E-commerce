// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
// import Link from "next/link";
// import { useCart } from "@/contexts/CartContext";
// import { useToast } from "@/hooks/use-toast";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   rating: number;
//   reviews: number;
//   category: string;
//   isNew?: boolean;
//   isSale?: boolean;
// }

// export default function FeaturedProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   useEffect(() => {
//     const mockProducts: Product[] = [
//       {
//         id: 1,
//         name: "Premium Wireless Headphones",
//         price: 299.99,
//         originalPrice: 399.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.8,
//         reviews: 124,
//         category: "Electronics",
//         isSale: true,
//       },
//       {
//         id: 2,
//         name: "Smart Fitness Watch",
//         price: 199.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.6,
//         reviews: 89,
//         category: "Wearables",
//         isNew: true,
//       },
//       {
//         id: 3,
//         name: "Luxury Leather Bag",
//         price: 449.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.9,
//         reviews: 67,
//         category: "Fashion",
//       },
//       {
//         id: 4,
//         name: "Professional Camera",
//         price: 899.99,
//         originalPrice: 1099.99,
//         image: "/placeholder.svg?height=300&width=300",
//         rating: 4.7,
//         reviews: 156,
//         category: "Photography",
//         isSale: true,
//       },
//     ];
//     setProducts(mockProducts);
//   }, []);

//   const handleAddToCart = (product: Product) => {
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
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Featured Products
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Discover our handpicked selection of premium products that combine
//             quality, style, and innovation
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <Card
//               key={product.id}
//               className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-md"
//               onMouseEnter={() => setHoveredProduct(product.id)}
//               onMouseLeave={() => setHoveredProduct(null)}
//             >
//               <CardContent className="p-0">
//                 <div className="relative overflow-hidden rounded-t-lg">
//                   <img
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.name}
//                     className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
//                   />

//                   {/* Badges */}
//                   <div className="absolute top-4 left-4 flex flex-col gap-2">
//                     {product.isNew && (
//                       <Badge className="bg-green-500 hover:bg-green-600">
//                         New
//                       </Badge>
//                     )}
//                     {product.isSale && (
//                       <Badge className="bg-red-500 hover:bg-red-600">
//                         Sale
//                       </Badge>
//                     )}
//                   </div>

//                   {/* Quick Actions */}
//                   <div
//                     className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${
//                       hoveredProduct === product.id
//                         ? "opacity-100"
//                         : "opacity-0"
//                     }`}
//                   >
//                     <Button
//                       size="sm"
//                       variant="secondary"
//                       className="w-10 h-10 p-0 rounded-full"
//                     >
//                       <Heart className="h-4 w-4" />
//                     </Button>
//                     <Link href={`/products/${product.id}`}>
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         className="w-10 h-10 p-0 rounded-full"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                     </Link>
//                   </div>

//                   {/* Add to Cart Overlay */}
//                   <div
//                     className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
//                       hoveredProduct === product.id
//                         ? "opacity-100"
//                         : "opacity-0"
//                     }`}
//                   >
//                     <Button
//                       onClick={() => handleAddToCart(product)}
//                       className="w-full bg-white text-black hover:bg-gray-100"
//                     >
//                       <ShoppingCart className="mr-2 h-4 w-4" />
//                       Add to Cart
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-2">
//                     <span className="text-sm text-purple-600 font-medium">
//                       {product.category}
//                     </span>
//                   </div>

//                   <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//                     {product.name}
//                   </h3>

//                   <div className="flex items-center mb-3">
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-4 w-4 ${
//                             i < Math.floor(product.rating)
//                               ? "text-yellow-400 fill-current"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600 ml-2">
//                       ({product.reviews})
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <span className="text-xl font-bold text-gray-900">
//                         ${product.price}
//                       </span>
//                       {product.originalPrice && (
//                         <span className="text-sm text-gray-500 line-through">
//                           ${product.originalPrice}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link href="/products">
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
//             >
//               View All Products
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  mini_description: string;
  reviews: number;
  categories: string[];
  isNew?: boolean;
  isSale?: boolean;
}

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [categoriesMap, setCategoriesMap] = useState<Record<number, Category>>(
    {}
  );
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        const map: Record<number, Category> = {};
        data.forEach((c) => (map[c.id] = c));
        setCategoriesMap(map);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: productsData, error: prodError } = await supabase
        .from("products")
        .select("*");

      if (prodError || !productsData) {
        console.error(prodError);
        return;
      }

      const { data: productCats, error: pcError } = await supabase
        .from("product_categories")
        .select("*");

      if (pcError) {
        console.error(pcError);
        return;
      }

      const shuffled = [...productsData].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffled.slice(0, 4);

      const mappedProducts: Product[] = selectedProducts.map((p: any) => {
        const productCategoryIds =
          productCats
            ?.filter((pc) => pc.product_id === p.id)
            .map((pc) => pc.category_id) || [];

        // Только родительские категории
        const parentCategories: string[] = [];
        productCategoryIds.forEach((id) => {
          const cat = categoriesMap[id];
          if (cat && cat.parent_id === null) {
            if (!parentCategories.includes(cat.name))
              parentCategories.push(cat.name);
          }
        });

        return {
          id: p.id,
          name: p.name,
          price: Number(p.price),
          originalPrice: p.original_price
            ? Number(p.original_price)
            : undefined,
          image: p.image || "/placeholder.svg",
          rating: p.rating ? Number(p.rating) : 0,
          mini_description: p.mini_description || "No description available",
          reviews: p.reviews ? Number(p.reviews) : 0,
          categories: parentCategories,
          isNew: p.is_new,
          isSale: p.is_sale,
        };
      });

      setProducts(mappedProducts);
    };

    if (Object.keys(categoriesMap).length > 0) {
      fetchProducts();
    }
  }, [categoriesMap]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine
            quality, style, and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

                  {/* Quick Actions */}
                  <div
                    className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${
                      hoveredProduct === product.id
                        ? "opacity-100"
                        : "opacity-0"
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

                  {/* Add to Cart Overlay */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                      hoveredProduct === product.id
                        ? "opacity-100"
                        : "opacity-0"
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
                    {product.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-sm text-purple-600 font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.mini_description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
