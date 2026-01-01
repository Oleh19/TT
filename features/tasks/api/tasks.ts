import type { Task, Status, Label } from '@/shared/types/task'

type CreateTaskData = {
  name: string
  key: string
  description: string
  status?: Status
  labels?: Label[]
}

type UpdateTaskData = {
  name?: string
  key?: string
  description?: string
  status?: Status
  labels?: Label[]
}

type ApiResponse<T> = {
  data: T
  error?: string
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data: ApiResponse<T> = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }

  return data.data
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('/api/tasks', {
    cache: 'no-store',
  })
  return handleResponse<Task[]>(response)
}

export async function createTask(taskData: CreateTaskData): Promise<Task> {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })

  if (response.status === 409) {
    throw new Error('Task with this key already exists')
  }

  return handleResponse<Task>(response)
}

export async function updateTask(
  id: string,
  taskData: UpdateTaskData
): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })

  if (response.status === 409) {
    throw new Error('Task with this key already exists')
  }

  return handleResponse<Task>(response)
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  })

  if (response.status === 409) {
    throw new Error('Cannot delete task with status "In Progress"')
  }

  if (!response.ok) {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      throw new Error(data.error || 'Failed to delete task')
    } else {
      throw new Error('Failed to delete task')
    }
  }
}
