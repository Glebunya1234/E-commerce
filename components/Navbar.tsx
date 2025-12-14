"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  ChevronDown,
  LogOut,
} from "@/lib/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { items } = useCart();

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, parent_id")
        .is("parent_id", null);
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              EliteStore
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-purple-600 transition-colors">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id}>
                    <Link href={`/categories/${category.name}`}>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/products"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Products
            </Link>
          </div>
          {/* Search Bar
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </form>
          </div> */}
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-purple-600">
                    {items.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 w-full"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/"
                      className="text-gray-700 hover:text-purple-600 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/categories"
                      className="text-gray-700 hover:text-purple-600 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Categories
                    </Link>
                    <Link
                      href="/products"
                      className="text-gray-700 hover:text-purple-600 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Products
                    </Link>
                    <Link
                      href="/about"
                      className="text-gray-700 hover:text-purple-600 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-gray-700 hover:text-purple-600 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>

                  {/* Mobile User Menu */}
                  {user ? (
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                      <Link
                        href="/profile"
                        className="text-gray-700 hover:text-purple-600 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="text-gray-700 hover:text-purple-600 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Orders
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="text-gray-700 hover:text-purple-600 py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="justify-start text-red-600 p-2"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                      <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link
                        href="/auth/register"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
