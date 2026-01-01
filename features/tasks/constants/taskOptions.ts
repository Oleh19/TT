import type { Status } from '@/shared/types/task'
import type { TagStatus } from '@/shared/ui/Tag'
import type { DropdownOption } from '@/shared/ui/Dropdown'

export const STATUS_MAP: Record<Status, TagStatus> = {
  backlog: 'Backlog',
  in_progress: 'In Progress',
  done: 'Done',
}

export const LABEL_OPTIONS: DropdownOption[] = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'urgent', label: 'Urgent' },
]

export const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]
