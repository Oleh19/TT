import type { Status, Label, Task } from '@/shared/types/task'

export const VALIDATION_LIMITS = {
  TASK_NAME_MAX_LENGTH: 200,
  TASK_KEY_MAX_LENGTH: 50,
  TASK_DESCRIPTION_MAX_LENGTH: 2000,
  TASK_LABELS_MAX_COUNT: 10,
  REQUEST_BODY_MAX_SIZE: 10 * 1024,
} as const

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isStatus(value: unknown): value is Status {
  return value === 'backlog' || value === 'in_progress' || value === 'done'
}

export function isLabel(value: unknown): value is Label {
  return (
    value === 'frontend' ||
    value === 'backend' ||
    value === 'bug' ||
    value === 'feature' ||
    value === 'urgent'
  )
}

export function isLabelArray(value: unknown): value is Label[] {
  return Array.isArray(value) && value.every(isLabel)
}

export function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const obj = value as Record<string, unknown>

  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.key === 'string' &&
    typeof obj.description === 'string' &&
    isStatus(obj.status) &&
    isLabelArray(obj.labels)
  )
}

export function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask)
}
