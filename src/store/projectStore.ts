import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Project {
  id: string
  name: string
  url: string
  services: string[]
  demographics: {
    age: string[]
    industry: string[]
    gender: string[]
    languages: string[]
    location: string[]
  }
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

interface ProjectStore {
  projects: Project[]
  addProject: (project: Omit<Project, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: Math.random().toString(36).substring(7),
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          projects: [...state.projects, newProject],
        }))
      },
      updateProject: (id, projectData) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? {
                  ...project,
                  ...projectData,
                  updatedAt: new Date().toISOString(),
                }
              : project
          ),
        }))
      },
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }))
      },
    }),
    {
      name: 'project-store',
    }
  )
)
