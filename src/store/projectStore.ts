import { create } from 'zustand'
import { Project } from '@/types/supabase'
import { supabase } from '@/lib/supabase'

interface ProjectStore {
  projects: Project[]
  isLoading: boolean
  error: Error | null
  fetchProjects: () => Promise<void>
  createProject: (project: Partial<Project>) => Promise<void>
  updateProject: (id: string, project: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  clearError: () => void
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchProjects: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('User not authenticated')

      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ projects: projects || [], isLoading: false })
    } catch (error) {
      set({ error: error as Error, isLoading: false })
      throw error
    }
  },

  createProject: async (project: Partial<Project>) => {
    set({ isLoading: true, error: null })
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('User not authenticated')

      if (!project.name || !project.url) {
        throw new Error('Project name and URL are required')
      }

      const { data, error } = await supabase.from('projects').insert([
        {
          name: project.name,
          url: project.url,
          description: project.description || '',
          services: project.services || [],
          target_region: project.target_region || null,
          demographics: project.demographics || {},
          user_id: user.user.id,
        },
      ]).select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message)
      }
      
      if (!data || data.length === 0) {
        throw new Error('Failed to create project')
      }

      const { projects } = get()
      set({ 
        projects: [data[0], ...projects],
        isLoading: false,
      })

      return data[0]
    } catch (error) {
      set({ error: error as Error, isLoading: false })
      throw error
    }
  },

  updateProject: async (id: string, project: Partial<Project>) => {
    set({ isLoading: true, error: null })
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .eq('user_id', user.user.id)
        .select()

      if (error) throw error
      if (!data) throw new Error('No data returned from update')

      const { projects } = get()
      set({
        projects: projects.map((p) => (p.id === id ? data[0] : p)),
        isLoading: false,
      })
    } catch (error) {
      set({ error: error as Error, isLoading: false })
      throw error
    }
  },

  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user.user.id)

      if (error) throw error

      const { projects } = get()
      set({
        projects: projects.filter((p) => p.id !== id),
        isLoading: false,
      })
    } catch (error) {
      set({ error: error as Error, isLoading: false })
      throw error
    }
  },
}))
