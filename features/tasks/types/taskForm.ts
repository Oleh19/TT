import type { Status, Label } from '@/shared/types/task'

export interface CreateTaskFormData {
  name: string
  key: string
  description: string
  labels: Label[]
}

export interface UpdateTaskFormData {
  name: string
  key: string
  description: string
  status: Status
  labels: Label[]
}
