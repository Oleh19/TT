'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { arraysEqual } from '@/shared/lib/utils/arrayComparison'
import type { Status, Label } from '@/shared/types/task'

export interface TaskFormValues {
  taskName: string
  taskKey: string
  description: string
  labels: Label[]
  status: Status
}

export interface UseTaskFormOptions {
  initialValues?: Partial<TaskFormValues>
  validateOnChange?: boolean
}

export function useTaskForm(options: UseTaskFormOptions = {}) {
  const { initialValues = {}, validateOnChange = true } = options

  const [values, setValues] = useState<TaskFormValues>({
    taskName: initialValues.taskName || '',
    taskKey: initialValues.taskKey || '',
    description: initialValues.description || '',
    labels: initialValues.labels || [],
    status: initialValues.status || 'backlog',
  })

  const initialValuesRef = useRef(initialValues)

  useEffect(() => {
    const currentInitial = initialValuesRef.current
    const currentLabels = currentInitial?.labels || []
    const newLabels = initialValues?.labels || []

    const hasChanged =
      (currentInitial?.taskName || '') !== (initialValues?.taskName || '') ||
      (currentInitial?.taskKey || '') !== (initialValues?.taskKey || '') ||
      (currentInitial?.description || '') !==
        (initialValues?.description || '') ||
      !arraysEqual(currentLabels, newLabels) ||
      (currentInitial?.status || '') !== (initialValues?.status || '')

    if (hasChanged && initialValues) {
      setValues({
        taskName: initialValues.taskName || '',
        taskKey: initialValues.taskKey || '',
        description: initialValues.description || '',
        labels: initialValues.labels || [],
        status: initialValues.status || 'backlog',
      })
      initialValuesRef.current = initialValues
    }
  }, [
    initialValues?.taskName,
    initialValues?.taskKey,
    initialValues?.description,
    initialValues?.labels,
    initialValues?.status,
  ])

  const updateField = <K extends keyof TaskFormValues>(
    field: K,
    value: TaskFormValues[K]
  ) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  const reset = () => {
    setValues({
      taskName: initialValues.taskName || '',
      taskKey: initialValues.taskKey || '',
      description: initialValues.description || '',
      labels: initialValues.labels || [],
      status: initialValues.status || 'backlog',
    })
  }

  const isFieldValid = (value: string) => {
    return value.trim().length > 0
  }

  const isValid = useMemo(() => {
    return isFieldValid(values.taskName) && isFieldValid(values.taskKey)
  }, [values])

  const hasChanges = useMemo(() => {
    if (!initialValues) return false
    return (
      values.taskName !== (initialValues.taskName || '') ||
      values.taskKey !== (initialValues.taskKey || '') ||
      values.description !== (initialValues.description || '') ||
      !arraysEqual(values.labels, initialValues.labels || []) ||
      values.status !== (initialValues.status || '')
    )
  }, [values, initialValues])

  return {
    values,
    updateField,
    reset,
    isValid,
    hasChanges,
    isFieldValid,
  }
}
