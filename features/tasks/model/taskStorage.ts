import { promises as fs } from 'fs'
import path from 'path'
import type { Task } from '@/shared/types/task'
import { isTaskArray } from '@/shared/lib/validation'
import { mockTasks } from './mockData'

const DATA_FILE = path.join(process.cwd(), 'data', 'tasks.json')

async function ensureDataFile(): Promise<void> {
  const dataDir = path.dirname(DATA_FILE)
  await fs.mkdir(dataDir, { recursive: true })

  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(mockTasks, null, 2), 'utf-8')
  }
}

async function readTasks(): Promise<Task[]> {
  await ensureDataFile()
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(data)

    if (isTaskArray(parsed)) {
      return parsed
    }

    console.warn('Invalid task data format, using mock data')
    return [...mockTasks]
  } catch {
    return [...mockTasks]
  }
}

async function writeTasks(tasks: Task[]): Promise<void> {
  await ensureDataFile()
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8')
}

async function getTasks(): Promise<Task[]> {
  return await readTasks()
}

async function saveTasks(newTasks: Task[]): Promise<void> {
  await writeTasks(newTasks)
}

export async function getAllTasks(): Promise<Task[]> {
  return [...mockTasks]
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  const tasks = await getTasks()
  return tasks.find(task => task.id === id)
}

export async function getTaskByKey(key: string): Promise<Task | undefined> {
  const tasks = await getTasks()
  return tasks.find(task => task.key === key)
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const tasks = await getTasks()

  const existingTask = tasks.find(t => t.key === task.key)
  if (existingTask) {
    throw new Error('Task with this key already exists')
  }

  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
  }

  const updatedTasks = [...tasks, newTask]
  await saveTasks(updatedTasks)
  return newTask
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, 'id'>>
): Promise<Task | null> {
  const tasks = await getTasks()
  const index = tasks.findIndex(task => task.id === id)
  if (index === -1) {
    return null
  }

  if (updates.key !== undefined) {
    const existingTask = tasks.find(t => t.key === updates.key && t.id !== id)
    if (existingTask) {
      throw new Error('Task with this key already exists')
    }
  }

  const updatedTasks = [...tasks]
  updatedTasks[index] = { ...updatedTasks[index], ...updates }
  await saveTasks(updatedTasks)
  return updatedTasks[index]
}

export async function deleteTask(
  id: string
): Promise<{ success: boolean; task: Task | null }> {
  const tasks = await getTasks()
  const task = tasks.find(t => t.id === id) || mockTasks.find(t => t.id === id)

  if (!task) {
    return { success: false, task: null }
  }

  if (task.status === 'in_progress') {
    return { success: false, task }
  }

  const taskInFile = tasks.find(t => t.id === id)
  if (taskInFile) {
    const updatedTasks = tasks.filter(t => t.id !== id)
    await saveTasks(updatedTasks)
  }

  return { success: true, task: null }
}

export async function resetTasks(): Promise<void> {
  await writeTasks(mockTasks)
}
