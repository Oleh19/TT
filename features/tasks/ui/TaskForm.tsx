'use client'

import { HTMLAttributes } from 'react'
import { Input } from '@/shared/ui/Input'
import { Dropdown, type DropdownOption } from '@/shared/ui/Dropdown'
import { isStatus, isLabel } from '@/shared/lib/validation'
import type { TaskFormValues } from '../hooks/useTaskForm'
import type { Status, Label } from '@/shared/types/task'

export interface TaskFormProps extends HTMLAttributes<HTMLDivElement> {
  values: TaskFormValues
  onFieldChange: <K extends keyof TaskFormValues>(
    field: K,
    value: TaskFormValues[K]
  ) => void
  labelOptions?: DropdownOption[]
  statusOptions?: DropdownOption[]
  showStatus?: boolean
}

export function TaskForm({
  values,
  onFieldChange,
  labelOptions = [],
  statusOptions = [],
  showStatus = false,
  className,
  ...props
}: TaskFormProps) {
  return (
    <div className={`flex flex-col gap-4 ${className || ''}`} {...props}>
      <Input
        title="Task Name"
        placeholder="e.g. SEO meta tags"
        value={values.taskName}
        onChange={e => onFieldChange('taskName', e.target.value)}
      />
      <Input
        title="Task Key"
        placeholder="e.g. TASK-005"
        value={values.taskKey}
        onChange={e => onFieldChange('taskKey', e.target.value)}
      />
      <Input
        title="Description"
        placeholder="Task Description"
        multiline
        value={values.description}
        onChange={e => onFieldChange('description', e.target.value)}
      />
      {showStatus ? (
        <div className="flex gap-3">
          <div className="flex-1">
            <Dropdown
              multiple
              options={labelOptions}
              title="Labels"
              value={values.labels}
              onChange={value => {
                const labels = Array.isArray(value) ? value.filter(isLabel) : []
                onFieldChange('labels', labels)
              }}
            />
          </div>
          <div className="flex-1">
            <Dropdown
              options={statusOptions}
              title="Task Status"
              value={values.status}
              onChange={value => {
                const status =
                  typeof value === 'string' && isStatus(value)
                    ? value
                    : 'backlog'
                onFieldChange('status', status)
              }}
            />
          </div>
        </div>
      ) : (
        <Dropdown
          placeholder="Choose Label"
          multiple
          options={labelOptions}
          title="Labels"
          value={values.labels}
          onChange={value => {
            const labels = Array.isArray(value) ? value.filter(isLabel) : []
            onFieldChange('labels', labels)
          }}
        />
      )}
    </div>
  )
}
