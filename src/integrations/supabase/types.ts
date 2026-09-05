export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          unit_price_cents: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          quantity: number
          unit_price_cents: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          unit_price_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cardpointe_response: Json | null
          cardpointe_retref: string | null
          carrier: string | null
          created_at: string
          customer_email: string
          customer_name: string
          id: string
          notes: string | null
          phone: string | null
          shipping_address: Json
          shipping_cents: number
          status: Database["public"]["Enums"]["order_status"]
          subtotal_cents: number
          tax_cents: number
          total_cents: number
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          cardpointe_response?: Json | null
          cardpointe_retref?: string | null
          carrier?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          shipping_address: Json
          shipping_cents?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_cents: number
          tax_cents?: number
          total_cents: number
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          cardpointe_response?: Json | null
          cardpointe_retref?: string | null
          carrier?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          shipping_address?: Json
          shipping_cents?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_cents?: number
          tax_cents?: number
          total_cents?: number
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean
          cj_product_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          inventory: number
          name: string
          price_cents: number
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          cj_product_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          inventory?: number
          name: string
          price_cents: number
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          cj_product_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          inventory?: number
          name?: string
          price_cents?: number
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_types: {
        Row: {
          active: boolean
          created_at: string
          duration_minutes: number | null
          id: string
          insurance_payer: string | null
          intake_cents: number
          name: string
          notes: string | null
          session_cents: number
          therapist_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          duration_minutes?: number | null
          id?: string
          insurance_payer?: string | null
          intake_cents?: number
          name: string
          notes?: string | null
          session_cents?: number
          therapist_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          duration_minutes?: number | null
          id?: string
          insurance_payer?: string | null
          intake_cents?: number
          name?: string
          notes?: string | null
          session_cents?: number
          therapist_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_types_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          billed_cents: number
          client_insurance: string | null
          client_name: string
          created_at: string
          created_by: string | null
          id: string
          is_intake: boolean
          notes: string | null
          service_type_id: string | null
          session_date: string
          split_percent: number
          status: Database["public"]["Enums"]["session_status"]
          therapist_id: string
          therapist_split_cents: number | null
          units: number
          updated_at: string
        }
        Insert: {
          billed_cents?: number
          client_insurance?: string | null
          client_name: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_intake?: boolean
          notes?: string | null
          service_type_id?: string | null
          session_date: string
          split_percent?: number
          status?: Database["public"]["Enums"]["session_status"]
          therapist_id: string
          therapist_split_cents?: number | null
          units?: number
          updated_at?: string
        }
        Update: {
          billed_cents?: number
          client_insurance?: string | null
          client_name?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_intake?: boolean
          notes?: string | null
          service_type_id?: string | null
          session_date?: string
          split_percent?: number
          status?: Database["public"]["Enums"]["session_status"]
          therapist_id?: string
          therapist_split_cents?: number | null
          units?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      therapists: {
        Row: {
          active: boolean
          created_at: string
          email: string | null
          id: string
          name: string
          split_percent: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email?: string | null
          id?: string
          name: string
          split_percent?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          split_percent?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      order_status:
        | "pending"
        | "paid"
        | "fulfilled"
        | "shipped"
        | "cancelled"
        | "refunded"
      session_status: "logged" | "submitted" | "paid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      order_status: [
        "pending",
        "paid",
        "fulfilled",
        "shipped",
        "cancelled",
        "refunded",
      ],
      session_status: ["logged", "submitted", "paid"],
    },
  },
} as const
