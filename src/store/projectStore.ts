import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Database } from '@/types/supabase'
import * as api from '@/lib/api'

type Project = Database['public']['Tables']['projects']['Row'] & {
  services?: string[]
  demographics?: {
    age: string[]
    industry: string[]
    gender: string[]
    languages: string[]
    location: string[]
  }
}

interface ProjectStore {
  projects: Project[]
  isLoading: boolean
  error: string | null
  fetchProjects: (userId: string) => Promise<void>
  addProject: (project: Omit<Project, 'id' | 'created_at'>) => Promise<void>
  updateProject: (id: string, project: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      isLoading: false,
      error: null,

      fetchProjects: async (userId: string) => {
        set({ isLoading: true, error: null })
        try {
          const projects = await api.getProjects(userId)
          set({ projects, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },

      addProject: async (projectData) => {
        set({ isLoading: true, error: null })
        try {
          const project = await api.createProject({
            ...projectData,
            description: JSON.stringify({
              services: projectData.services,
              demographics: projectData.demographics,
            }),
          })
          set((state) => ({
            projects: [project, ...state.projects],
            isLoading: false,
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },

      updateProject: async (id, projectData) => {
        set({ isLoading: true, error: null })
        try {
          const project = await api.updateProject(id, {
            ...projectData,
            description: projectData.services || projectData.demographics
              ? JSON.stringify({
                  services: projectData.services,
                  demographics: projectData.demographics,
                })
              : undefined,
          })
          set((state) => ({
            projects: state.projects.map((p) => (p.id === id ? project : p)),
            isLoading: false,
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },

      deleteProject: async (id) => {
        set({ isLoading: true, error: null })
        try {
          await api.deleteProject(id)
          set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
            isLoading: false,
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
    }),
    {
      name: 'project-store',
    }
  )
)
