export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      education: {
        Row: {
          id: string
          level: string | null
        }
        Insert: {
          id?: string
          level?: string | null
        }
        Update: {
          id?: string
          level?: string | null
        }
      }
      user_metadata: {
        Row: {
          created_at: string | null
          dateOfBirth: string | null
          educationLevel: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          dateOfBirth?: string | null
          educationLevel?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          dateOfBirth?: string | null
          educationLevel?: string | null
          id?: number
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
