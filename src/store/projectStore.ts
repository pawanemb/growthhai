import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Database } from '@/types/supabase'
import * as api from '@/lib/api'

type Project = Database['public']['Tables']['projects']['Row']

interface ProjectStore {
  projects: Project[]
  isLoading: boolean
  error: string | null
  fetchProjects: (userId: string) => Promise<void>
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
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
          const project = await api.createProject(projectData)
          set((state) => ({
            projects: [project, ...state.projects],
            isLoading: false
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },

      updateProject: async (id, projectData) => {
        set({ isLoading: true, error: null })
        try {
          const updatedProject = await api.updateProject(id, projectData)
          set((state) => ({
            projects: state.projects.map((p) =>
              p.id === id ? { ...p, ...updatedProject } : p
            ),
            isLoading: false
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
            isLoading: false
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      }
    }),
    {
      name: 'project-store'
    }
  )
)
