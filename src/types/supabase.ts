export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          company_name: string | null
          subscription_status: 'free' | 'pro' | 'enterprise'
          subscription_id: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          company_name?: string | null
          subscription_status?: 'free' | 'pro' | 'enterprise'
          subscription_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          company_name?: string | null
          subscription_status?: 'free' | 'pro' | 'enterprise'
          subscription_id?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          name: string
          url: string
          description: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          url: string
          description?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          url?: string
          description?: string | null
          user_id?: string
        }
      }
      keywords: {
        Row: {
          id: string
          created_at: string
          keyword: string
          volume: number | null
          difficulty: number | null
          project_id: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          keyword: string
          volume?: number | null
          difficulty?: number | null
          project_id: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          keyword?: string
          volume?: number | null
          difficulty?: number | null
          project_id?: string
          user_id?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          status: 'draft' | 'published'
          project_id: string
          user_id: string
          keyword_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          status?: 'draft' | 'published'
          project_id: string
          user_id: string
          keyword_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          status?: 'draft' | 'published'
          project_id?: string
          user_id?: string
          keyword_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
