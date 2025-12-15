"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Package,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Database,
  Tag,
  FolderTree,
  ShoppingBag,
  Store,
  List,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

// Type definitions
type TableName =
  | "products"
  | "categories"
  | "sellers"
  | "attributes"
  | "product_categories"
  | "product_attributes";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  status: string;
  seller_id: number | null;
  description: string;
  mini_description: string;
}

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
}

interface Seller {
  id: number;
  full_name: string;
  address: string;
  phone: string;
}

interface Attribute {
  id: number;
  name: string;
}

interface ProductCategory {
  id: number;
  product_id: number;
  category_id: number;
}

interface ProductAttribute {
  id: number;
  product_id: number;
  attribute_id: number;
  value: string;
}

interface Order {
  id: number;
  seller_id?: number;
  date_created: string;
  total_amount: number;
  customer_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  sellers?: { full_name: string } | null;
}

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_moment: number;
  products?: { name: string } | null;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  // State for each table
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [productAttributes, setProductAttributes] = useState<
    ProductAttribute[]
  >([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentTable, setCurrentTable] = useState<TableName>("products");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchSellers(),
        fetchAttributes(),
        fetchProductCategories(),
        fetchProductAttributes(),
        fetchOrders(),
        fetchOrderItems(),
        fetchStats(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error loading data",
        description: "Failed to load admin panel data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("total_amount");

      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id");

      if (!ordersError && orders) {
        const totalRevenue = orders.reduce(
          (sum, order) => sum + Number(order.total_amount),
          0
        );
        setStats((prev) => ({
          ...prev,
          totalRevenue,
          totalOrders: orders.length,
        }));
      }

      if (!productsError && products) {
        setStats((prev) => ({
          ...prev,
          totalProducts: products.length,
        }));
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");
    if (!error && data) setProducts(data);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id");
    if (!error && data) setCategories(data);
  };

  const fetchSellers = async () => {
    const { data, error } = await supabase
      .from("sellers")
      .select("*")
      .order("id");
    if (!error && data) setSellers(data);
  };

  const fetchAttributes = async () => {
    const { data, error } = await supabase
      .from("attributes")
      .select("*")
      .order("id");
    if (!error && data) setAttributes(data);
  };

  const fetchProductCategories = async () => {
    const { data, error } = await supabase
      .from("product_categories")
      .select("*")
      .order("id");
    if (!error && data) setProductCategories(data);
  };

  const fetchProductAttributes = async () => {
    const { data, error } = await supabase
      .from("product_attributes")
      .select("*")
      .order("id");
    if (!error && data) setProductAttributes(data);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        sellers(full_name)
      `
      )
      .order("id", { ascending: false });
    if (!error && data) setOrders(data);
  };

  const fetchOrderItems = async () => {
    const { data, error } = await supabase
      .from("order_items")
      .select(
        `
        *,
        products(name)
      `
      )
      .order("id", { ascending: false });
    if (!error && data) setOrderItems(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "free":
        return "bg-green-100 text-green-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // CRUD Operations
  const handleAdd = (table: TableName) => {
    setCurrentTable(table);
    setModalMode("add");
    setEditingItem(getEmptyItem(table));
    setShowModal(true);
  };

  const handleEdit = (table: TableName, item: any) => {
    setCurrentTable(table);
    setModalMode("edit");
    setEditingItem({ ...item });
    setShowModal(true);
  };

  const handleDelete = async (table: TableName, id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting item",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Item deleted successfully",
    });

    // Refresh the specific table
    refreshTable(table);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    // Validation
    if (!validateItem(currentTable, editingItem)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (modalMode === "add") {
      // Remove id completely to let database auto-generate it
      const itemToInsert = { ...editingItem };
      delete itemToInsert.id;

      const { error } = await supabase.from(currentTable).insert(itemToInsert);

      if (error) {
        toast({
          title: "Error adding item",
          description: error.message,
          variant: "destructive",
        });
        console.error("Insert error:", error);
        return;
      }

      toast({
        title: "Item added successfully",
      });
    } else {
      // For update, only send the fields that exist in the table
      const itemToUpdate = { ...editingItem };
      delete itemToUpdate.id; // Remove ID from update payload

      const { error } = await supabase
        .from(currentTable)
        .update(itemToUpdate)
        .eq("id", editingItem.id);

      if (error) {
        toast({
          title: "Error updating item",
          description: error.message,
          variant: "destructive",
        });
        console.error("Update error:", error);
        return;
      }

      toast({
        title: "Item updated successfully",
      });
    }

    setShowModal(false);
    refreshTable(currentTable);
  };

  const refreshTable = (table: TableName) => {
    switch (table) {
      case "products":
        fetchProducts();
        break;
      case "categories":
        fetchCategories();
        break;
      case "sellers":
        fetchSellers();
        break;
      case "attributes":
        fetchAttributes();
        break;
      case "product_categories":
        fetchProductCategories();
        break;
      case "product_attributes":
        fetchProductAttributes();
        break;
    }
  };

  const getEmptyItem = (table: TableName) => {
    switch (table) {
      case "products":
        return {
          name: "",
          price: 0,
          quantity: 0,
          status: "free",
          seller_id: null,
          description: "",
          mini_description: "",
        };
      case "categories":
        return { name: "", parent_id: null };
      case "sellers":
        return { full_name: "", address: "", phone: "" };
      case "attributes":
        return { name: "" };
      case "product_categories":
        return { product_id: 0, category_id: 0 };
      case "product_attributes":
        return { product_id: 0, attribute_id: 0, value: "" };
    }
  };

  const validateItem = (table: TableName, item: any) => {
    switch (table) {
      case "products":
        return item.name && item.price >= 0 && item.quantity >= 0;
      case "categories":
        return item.name;
      case "sellers":
        return item.full_name && item.address && item.phone;
      case "attributes":
        return item.name;
      case "product_categories":
        return item.product_id > 0 && item.category_id > 0;
      case "product_attributes":
        return item.product_id > 0 && item.attribute_id > 0 && item.value;
      default:
        return true;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Manage your database tables
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders.toLocaleString()}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalProducts}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Tables
                </p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <Database className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="sellers">Sellers</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="product_categories">Prod-Cat</TabsTrigger>
          <TabsTrigger value="product_attributes">Prod-Attr</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="order_items">Order Items</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Product Management</CardTitle>
              <Button size="sm" onClick={() => handleAdd("products")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Seller ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.seller_id || "N/A"}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit("products", product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() =>
                                handleDelete("products", product.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Category Management</CardTitle>
              <Button size="sm" onClick={() => handleAdd("categories")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Parent ID</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell>{category.parent_id || "N/A"}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit("categories", category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() =>
                              handleDelete("categories", category.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sellers Tab */}
        <TabsContent value="sellers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Seller Management</CardTitle>
              <Button size="sm" onClick={() => handleAdd("sellers")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Seller
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellers.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell>{seller.id}</TableCell>
                      <TableCell className="font-medium">
                        {seller.full_name}
                      </TableCell>
                      <TableCell>{seller.address}</TableCell>
                      <TableCell>{seller.phone}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit("sellers", seller)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDelete("sellers", seller.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attributes Tab */}
        <TabsContent value="attributes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Attribute Management</CardTitle>
              <Button size="sm" onClick={() => handleAdd("attributes")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Attribute
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attributes.map((attribute) => (
                    <TableRow key={attribute.id}>
                      <TableCell>{attribute.id}</TableCell>
                      <TableCell className="font-medium">
                        {attribute.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit("attributes", attribute)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() =>
                              handleDelete("attributes", attribute.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Categories Tab */}
        <TabsContent value="product_categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Product-Category Relations</CardTitle>
              <Button size="sm" onClick={() => handleAdd("product_categories")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Relation
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Category ID</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productCategories.map((pc) => (
                    <TableRow key={pc.id}>
                      <TableCell>{pc.id}</TableCell>
                      <TableCell>{pc.product_id}</TableCell>
                      <TableCell>{pc.category_id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit("product_categories", pc)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() =>
                              handleDelete("product_categories", pc.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Attributes Tab */}
        <TabsContent value="product_attributes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Product-Attribute Relations</CardTitle>
              <Button size="sm" onClick={() => handleAdd("product_attributes")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Relation
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Attribute ID</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productAttributes.map((pa) => (
                    <TableRow key={pa.id}>
                      <TableCell>{pa.id}</TableCell>
                      <TableCell>{pa.product_id}</TableCell>
                      <TableCell>{pa.attribute_id}</TableCell>
                      <TableCell>{pa.value}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit("product_attributes", pa)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() =>
                              handleDelete("product_attributes", pa.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab (Read-only, Delete only) */}
        <TabsContent value="orders">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Orders (Read Only)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          {order.sellers?.full_name || "N/A"}
                        </TableCell>
                        <TableCell>
                          {new Date(order.date_created).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${Number(order.total_amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {order.first_name && order.last_name
                            ? `${order.first_name} ${order.last_name}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>{order.email || "N/A"}</TableCell>
                        <TableCell>{order.city || "N/A"}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => {
                                if (
                                  confirm(
                                    "Are you sure you want to delete this order?"
                                  )
                                ) {
                                  supabase
                                    .from("orders")
                                    .delete()
                                    .eq("id", order.id)
                                    .then(({ error }) => {
                                      if (error) {
                                        toast({
                                          title: "Error deleting order",
                                          description: error.message,
                                          variant: "destructive",
                                        });
                                      } else {
                                        toast({
                                          title: "Order deleted successfully",
                                        });
                                        fetchOrders();
                                      }
                                    });
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Items Tab (Read-only, Delete only) */}
        <TabsContent value="order_items">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Items (Read Only)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price at Moment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.order_id}</TableCell>
                      <TableCell className="font-medium">
                        {item.products?.name || `ID: ${item.product_id}`}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        ${Number(item.price_at_moment).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this order item?"
                                )
                              ) {
                                supabase
                                  .from("order_items")
                                  .delete()
                                  .eq("id", item.id)
                                  .then(({ error }) => {
                                    if (error) {
                                      toast({
                                        title: "Error deleting order item",
                                        description: error.message,
                                        variant: "destructive",
                                      });
                                    } else {
                                      toast({
                                        title:
                                          "Order item deleted successfully",
                                      });
                                      fetchOrderItems();
                                    }
                                  });
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Universal Edit/Add Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {modalMode === "add" ? "Add" : "Edit"}{" "}
                {currentTable.replace("_", " ")}
              </h2>
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              {/* Products Form */}
              {currentTable === "products" && (
                <>
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input
                      value={editingItem.name || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editingItem.price || 0}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            price: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        value={editingItem.quantity || 0}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            quantity: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={editingItem.status || "free"}
                      onValueChange={(value) =>
                        setEditingItem({ ...editingItem, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Seller ID</Label>
                    <Select
                      value={editingItem.seller_id?.toString() || "none"}
                      onValueChange={(value) =>
                        setEditingItem({
                          ...editingItem,
                          seller_id: value === "none" ? null : parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select seller" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {sellers.map((seller) => (
                          <SelectItem
                            key={seller.id}
                            value={seller.id.toString()}
                          >
                            {seller.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingItem.description || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mini Description</Label>
                    <Textarea
                      value={editingItem.mini_description || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          mini_description: e.target.value,
                        })
                      }
                      rows={2}
                    />
                  </div>
                </>
              )}

              {/* Categories Form */}
              {currentTable === "categories" && (
                <>
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input
                      value={editingItem.name || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Category</Label>
                    <Select
                      value={editingItem.parent_id?.toString() || "none"}
                      onValueChange={(value) =>
                        setEditingItem({
                          ...editingItem,
                          parent_id: value === "none" ? null : parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {categories
                          .filter((c) => c.id !== editingItem.id)
                          .map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Sellers Form */}
              {currentTable === "sellers" && (
                <>
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={editingItem.full_name || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          full_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address *</Label>
                    <Textarea
                      value={editingItem.address || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          address: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input
                      value={editingItem.phone || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              {/* Attributes Form */}
              {currentTable === "attributes" && (
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={editingItem.name || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                  />
                </div>
              )}

              {/* Product Categories Form */}
              {currentTable === "product_categories" && (
                <>
                  <div className="space-y-2">
                    <Label>Product *</Label>
                    <Select
                      value={
                        editingItem.product_id?.toString() ||
                        products[0]?.id?.toString() ||
                        "1"
                      }
                      onValueChange={(value) =>
                        setEditingItem({
                          ...editingItem,
                          product_id: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id.toString()}
                          >
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={
                        editingItem.category_id?.toString() ||
                        categories[0]?.id?.toString() ||
                        "1"
                      }
                      onValueChange={(value) =>
                        setEditingItem({
                          ...editingItem,
                          category_id: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Product Attributes Form */}
              {currentTable === "product_attributes" && (
                <>
                  <div className="space-y-2">
                    <Label>Product *</Label>
                    <Select
                      value={
                        editingItem.product_id?.toString() ||
                        products[0]?.id?.toString() ||
                        "1"
                      }
                      onValueChange={(value) =>
                        setEditingItem({
                          ...editingItem,
                          product_id: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id.toString()}
                          >
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Attribute *</Label>
                    <Select
                      value={
                        editingItem.attribute_id?.toString() ||
                        attributes[0]?.id?.toString() ||
                        "1"
                      }
                      onValueChange={(value) =>
                        setEditingItem({
                          ...editingItem,
                          attribute_id: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select attribute" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributes.map((attribute) => (
                          <SelectItem
                            key={attribute.id}
                            value={attribute.id.toString()}
                          >
                            {attribute.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Value *</Label>
                    <Input
                      value={editingItem.value || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Save className="mr-2 h-4 w-4" />
                {modalMode === "add" ? "Add" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
