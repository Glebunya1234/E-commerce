"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  color?: string;
}

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);

  const gradientColors = [
    "from-blue-500 to-purple-600",
    "from-pink-500 to-rose-600",
    "from-green-500 to-emerald-600",
    "from-orange-500 to-red-600",
    "from-indigo-500 to-cyan-500",
    "from-yellow-400 to-orange-500",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, parent_id");

      if (error) {
        console.error(error);
        return;
      }

      // Только родительские категории
      const parentCategories = data?.filter((c) => c.parent_id === null) || [];

      // Добавляем случайный градиент к каждой категории
      const withGradient = parentCategories.map((c) => ({
        ...c,
        color:
          gradientColors[Math.floor(Math.random() * gradientColors.length)],
      }));

      setCategories(withGradient);
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of categories and find exactly what you're
            looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.name}`}>
              <Card className="h-56 cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent
                  className={`h-full p-[-6] flex items-center justify-center text-white bg-gradient-to-r ${category.color}`}
                >
                  <h3 className="text-3xl font-bold">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
