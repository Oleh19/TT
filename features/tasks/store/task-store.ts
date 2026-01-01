import { create } from 'zustand'
import type { Task, Status } from '@/shared/types/task'

type TaskStore = {
  tasks: Task[]
  isLoading: boolean
  isInitialized: boolean
  setTasks: (tasks: Task[]) => void
  setLoading: (isLoading: boolean) => void
  setInitialized: (isInitialized: boolean) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task> | Task) => void
  removeTask: (id: string) => void
  getTasksByStatus: (status: Status) => Task[]
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: true,
  isInitialized: false,
  setTasks: tasks => set({ tasks, isInitialized: true, isLoading: false }),
  setLoading: isLoading => set({ isLoading }),
  setInitialized: isInitialized => set({ isInitialized }),
  addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  removeTask: id =>
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id),
    })),
  getTasksByStatus: status => {
    return get().tasks.filter(task => task.status === status)
  },
}))
