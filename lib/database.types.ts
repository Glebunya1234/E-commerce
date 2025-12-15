export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      attributes: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: number;
          name: string;
          parent_id: number | null;
        };
        Insert: {
          id?: number;
          name: string;
          parent_id?: number | null;
        };
        Update: {
          id?: number;
          name?: string;
          parent_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      customers: {
        Row: {
          id: number;
          full_name: string;
          address: string;
          phone: string;
        };
        Insert: {
          id?: number;
          full_name: string;
          address: string;
          phone: string;
        };
        Update: {
          id?: number;
          full_name?: string;
          address?: string;
          phone?: string;
        };
        Relationships: [];
      };
      customers_encrypted: {
        Row: {
          id: number | null;
          full_name: string | null;
          address: string | null;
          phone: string | null;
        };
        Insert: {
          id?: number;
          full_name?: string | null;
          address?: string | null;
          phone?: string | null;
        };
        Update: {
          id?: number;
          full_name?: string | null;
          address?: string | null;
          phone?: string | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: number;
          name: string;
          price: number;
          quantity: number;
          description: string;
          mini_description: string;
          status: string;
          seller_id: number | null;
        };
        Insert: {
          id?: number;
          name: string;
          price: number;
          quantity: number;
          status?: string;
          seller_id?: number | null;
        };
        Update: {
          id?: number;
          name?: string;
          price?: number;
          quantity?: number;
          status?: string;
          seller_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          id: number;
          customer_id: number;
          date_created: string;
          total_amount: number;
        };
        Insert: {
          id?: number;
          customer_id: number;
          date_created?: string;
          total_amount: number;
        };
        Update: {
          id?: number;
          customer_id?: number;
          date_created?: string;
          total_amount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      order_items: {
        Row: {
          id: number;
          order_id: number;
          product_id: number;
          quantity: number;
          price_at_moment: number;
        };
        Insert: {
          id?: number;
          order_id: number;
          product_id: number;
          quantity: number;
          price_at_moment: number;
        };
        Update: {
          id?: number;
          order_id?: number;
          product_id?: number;
          quantity?: number;
          price_at_moment?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      product_attributes: {
        Row: {
          id: number;
          product_id: number;
          attribute_id: number;
          value: string;
        };
        Insert: {
          id?: number;
          product_id: number;
          attribute_id: number;
          value: string;
        };
        Update: {
          id?: number;
          product_id?: number;
          attribute_id?: number;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_attributes_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_attributes_attribute_id_fkey";
            columns: ["attribute_id"];
            isOneToOne: false;
            referencedRelation: "attributes";
            referencedColumns: ["id"];
          }
        ];
      };
      product_categories: {
        Row: {
          id: number;
          product_id: number;
          category_id: number;
        };
        Insert: {
          id?: number;
          product_id: number;
          category_id: number;
        };
        Update: {
          id?: number;
          product_id?: number;
          category_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_categories_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_categories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};


type PublicSchema = Database["public"];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends { Row: infer R }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends { Row: infer R }
  ? R
  : never
  : never;
