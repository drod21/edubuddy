export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          contentType: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          contentType?: string | null;
          id?: number;
          title?: string | null;
        };
        Update: {
          contentType?: string | null;
          id?: number;
          title?: string | null;
        };
      };
      categories: {
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
      };
      education: {
        Row: {
          description: string;
          id: string;
          level: string | null;
          order: number;
        };
        Insert: {
          description: string;
          id?: string;
          level?: string | null;
          order?: number;
        };
        Update: {
          description?: string;
          id?: string;
          level?: string | null;
          order?: number;
        };
      };
      subjects: {
        Row: {
          categoryId: number | null;
          id: number;
          name: string | null;
        };
        Insert: {
          categoryId?: number | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          categoryId?: number | null;
          id?: number;
          name?: string | null;
        };
      };
      user: {
        Row: {
          created_at: string | null;
          dateOfBirth: string | null;
          educationLevel: string | null;
          email: string | null;
          firstName: string | null;
          id: string;
          lastName: string | null;
        };
        Insert: {
          created_at?: string | null;
          dateOfBirth?: string | null;
          educationLevel?: string | null;
          email?: string | null;
          firstName?: string | null;
          id?: string;
          lastName?: string | null;
        };
        Update: {
          created_at?: string | null;
          dateOfBirth?: string | null;
          educationLevel?: string | null;
          email?: string | null;
          firstName?: string | null;
          id?: string;
          lastName?: string | null;
        };
      };
      user_metadata: {
        Row: {
          created_at: string | null;
          dateOfBirth: string | null;
          educationLevel: string | null;
          id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          dateOfBirth?: string | null;
          educationLevel?: string | null;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          dateOfBirth?: string | null;
          educationLevel?: string | null;
          id?: number;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
