import { supabase } from './supabase'
import { Database } from '@/types/supabase'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type Keyword = Database['public']['Tables']['keywords']['Row']
type KeywordInsert = Database['public']['Tables']['keywords']['Insert']
type BlogPost = Database['public']['Tables']['blog_posts']['Row']
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']

// Project APIs
export async function getProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getProject(projectId: string, userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      keywords (
        *
      ),
      blog_posts (
        *
      )
    `)
    .eq('id', projectId)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function createProject(project: ProjectInsert) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProject(projectId: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)

  if (error) throw error
}

// Keyword APIs
export async function getKeywords(projectId: string, userId: string) {
  const { data, error } = await supabase
    .from('keywords')
    .select('*')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createKeyword(keyword: KeywordInsert) {
  const { data, error } = await supabase
    .from('keywords')
    .insert(keyword)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateKeyword(keywordId: string, updates: Partial<Keyword>) {
  const { data, error } = await supabase
    .from('keywords')
    .update(updates)
    .eq('id', keywordId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteKeyword(keywordId: string) {
  const { error } = await supabase
    .from('keywords')
    .delete()
    .eq('id', keywordId)

  if (error) throw error
}

// Blog Post APIs
export async function getBlogPosts(projectId: string, userId: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getBlogPost(postId: string, userId: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', postId)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function createBlogPost(post: BlogPostInsert) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateBlogPost(postId: string, updates: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', postId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteBlogPost(postId: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', postId)

  if (error) throw error
}

// Profile APIs
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}
