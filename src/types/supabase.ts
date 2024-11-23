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
          services: string[]
          target_region: string | null
          demographics: Json | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          url: string
          description?: string | null
          services?: string[]
          target_region?: string | null
          demographics?: Json | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          url?: string
          description?: string | null
          services?: string[]
          target_region?: string | null
          demographics?: Json | null
          user_id?: string
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

export type Project = Database['public']['Tables']['projects']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export interface Keyword {
  id: string
  created_at: string
  keyword: string
  search_volume: number
  difficulty: number
  project_id: string
}

export interface BlogPost {
  id: string
  created_at: string
  title: string
  content: string
  status: 'draft' | 'published'
  project_id: string
  keywords: string[]
}
