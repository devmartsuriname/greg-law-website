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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          ip_address: unknown | null
          message: string
          notes: string | null
          organization: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          subject: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          ip_address?: unknown | null
          message: string
          notes?: string | null
          organization?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          subject: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          ip_address?: unknown | null
          message?: string
          notes?: string | null
          organization?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          subject?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          ip_address: unknown | null
          message: string
          name: string
          phone: string | null
          responded_at: string | null
          responded_by: string | null
          status: string | null
          subject: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          ip_address?: unknown | null
          message: string
          name: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string | null
          subject?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          ip_address?: unknown | null
          message?: string
          name?: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string | null
          subject?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_time: string | null
          google_calendar_id: string | null
          id: string
          location: string | null
          published: boolean | null
          start_time: string
          title: string
          updated_at: string | null
          visible: boolean | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          google_calendar_id?: string | null
          id?: string
          location?: string | null
          published?: boolean | null
          start_time: string
          title: string
          updated_at?: string | null
          visible?: boolean | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          google_calendar_id?: string | null
          id?: string
          location?: string | null
          published?: boolean | null
          start_time?: string
          title?: string
          updated_at?: string | null
          visible?: boolean | null
        }
        Relationships: []
      }
      integrations_config: {
        Row: {
          config: Json
          created_at: string | null
          created_by: string | null
          enabled: boolean | null
          id: string
          integration_type: string
          updated_at: string | null
        }
        Insert: {
          config?: Json
          created_at?: string | null
          created_by?: string | null
          enabled?: boolean | null
          id?: string
          integration_type: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          created_by?: string | null
          enabled?: boolean | null
          id?: string
          integration_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          caption: string | null
          category: string | null
          display_order: number | null
          featured: boolean | null
          file_path: string | null
          file_url: string | null
          id: string
          published: boolean | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          type: string
          uploaded_at: string | null
          uploaded_by: string | null
          youtube_description: string | null
          youtube_id: string | null
          youtube_published_at: string | null
          youtube_thumbnail: string | null
          youtube_title: string | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          display_order?: number | null
          featured?: boolean | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          published?: boolean | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          type: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          youtube_description?: string | null
          youtube_id?: string | null
          youtube_published_at?: string | null
          youtube_thumbnail?: string | null
          youtube_title?: string | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          display_order?: number | null
          featured?: boolean | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          published?: boolean | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          youtube_description?: string | null
          youtube_id?: string | null
          youtube_published_at?: string | null
          youtube_thumbnail?: string | null
          youtube_title?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean | null
          sections: Json
          slug: string
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          sections?: Json
          slug: string
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          sections?: Json
          slug?: string
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          last_login: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          last_login?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          featured: boolean | null
          featured_image: string | null
          id: string
          image_gallery: string[] | null
          progress: number | null
          published: boolean | null
          slug: string
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          image_gallery?: string[] | null
          progress?: number | null
          published?: boolean | null
          slug: string
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          image_gallery?: string[] | null
          progress?: number | null
          published?: boolean | null
          slug?: string
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          author_name: string
          author_title: string | null
          context: string | null
          created_at: string | null
          created_by: string | null
          date_spoken: string | null
          display_order: number | null
          featured: boolean | null
          id: string
          published: boolean | null
          quote_text: string
          updated_at: string | null
        }
        Insert: {
          author_name?: string
          author_title?: string | null
          context?: string | null
          created_at?: string | null
          created_by?: string | null
          date_spoken?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          published?: boolean | null
          quote_text: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          author_title?: string | null
          context?: string | null
          created_at?: string | null
          created_by?: string | null
          date_spoken?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          published?: boolean | null
          quote_text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          featured: boolean | null
          icon: string | null
          id: string
          published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          featured?: boolean | null
          icon?: string | null
          id?: string
          published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          featured?: boolean | null
          icon?: string | null
          id?: string
          published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      speeches: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          date: string
          description: string | null
          document_url: string | null
          featured: boolean | null
          id: string
          location: string | null
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          youtube_url: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          description?: string | null
          document_url?: string | null
          featured?: boolean | null
          id?: string
          location?: string | null
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          youtube_url?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string | null
          document_url?: string | null
          featured?: boolean | null
          id?: string
          location?: string | null
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          created_by: string | null
          display_order: number | null
          id: string
          name: string
          photo_url: string | null
          published: boolean | null
          social_links: Json | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          id?: string
          name: string
          photo_url?: string | null
          published?: boolean | null
          social_links?: Json | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          id?: string
          name?: string
          photo_url?: string | null
          published?: boolean | null
          social_links?: Json | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_company: string | null
          client_name: string
          client_photo_url: string | null
          created_at: string | null
          created_by: string | null
          display_order: number | null
          featured: boolean | null
          id: string
          published: boolean | null
          testimonial_text: string
          updated_at: string | null
        }
        Insert: {
          client_company?: string | null
          client_name: string
          client_photo_url?: string | null
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          published?: boolean | null
          testimonial_text: string
          updated_at?: string | null
        }
        Update: {
          client_company?: string | null
          client_name?: string
          client_photo_url?: string | null
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          published?: boolean | null
          testimonial_text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
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
        Args: { required_role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "editor", "viewer"],
    },
  },
} as const
