export interface Project {
  id: string
  created_at: string
  name: string
  url: string
  description: string | null
  user_id: string
}

export interface Keyword {
  id: string
  created_at: string
  keyword: string
  volume: number | null
  difficulty: number | null
  project_id: string
  user_id: string
}

export interface BlogPost {
  id: string
  created_at: string
  title: string
  content: string
  status: 'draft' | 'published'
  project_id: string
  user_id: string
  keyword_id: string | null
}

export interface Profile {
  id: string
  created_at: string
  email: string
  full_name: string | null
  avatar_url: string | null
  company_name: string | null
  subscription_status: 'free' | 'pro' | 'enterprise'
  subscription_id: string | null
}
