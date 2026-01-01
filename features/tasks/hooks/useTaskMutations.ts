'use client'

import { useState, useCallback } from 'react'
import { createTask, updateTask, deleteTask } from '@/features/tasks/api/tasks'
import { getErrorMessage } from '@/shared/lib/errors'
import { useTaskStore } from '@/features/tasks/store/task-store'
import type { Task, Status, Label } from '@/shared/types/task'
import type { CreateTaskFormData, UpdateTaskFormData } from '../types/taskForm'
import toast from 'react-hot-toast'

export function useTaskMutations() {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { addTask, updateTask: updateTaskInStore, removeTask } = useTaskStore()

  const handleCreate = useCallback(
    async (taskData: CreateTaskFormData): Promise<Task | null> => {
      if (isCreating) return null

      setIsCreating(true)
      try {
        const newTask = await createTask({
          name: taskData.name,
          key: taskData.key,
          description: taskData.description,
          status: 'backlog',
          labels: taskData.labels,
        })
        addTask(newTask)
        toast.success('Task created successfully')
        return newTask
      } catch (error) {
        const message = getErrorMessage(error)
        toast.error(message || 'Failed to create task')
        return null
      } finally {
        setIsCreating(false)
      }
    },
    [isCreating, addTask]
  )

  const handleUpdate = useCallback(
    async (
      taskId: string,
      taskData: UpdateTaskFormData
    ): Promise<Task | null> => {
      if (isUpdating) return null

      setIsUpdating(true)
      try {
        const updatedTask = await updateTask(taskId, {
          name: taskData.name,
          key: taskData.key,
          description: taskData.description,
          status: taskData.status,
          labels: taskData.labels,
        })
        updateTaskInStore(taskId, updatedTask)
        toast.success('Task updated successfully')
        return updatedTask
      } catch (error) {
        const message = getErrorMessage(error)
        toast.error(message || 'Failed to update task')
        return null
      } finally {
        setIsUpdating(false)
      }
    },
    [isUpdating, updateTaskInStore]
  )

  const handleDelete = useCallback(
    async (taskId: string): Promise<boolean> => {
      if (isDeleting) return false

      setIsDeleting(true)
      try {
        await deleteTask(taskId)
        removeTask(taskId)
        toast.success('Task deleted successfully')
        return true
      } catch (error) {
        const message = getErrorMessage(error)
        toast.error(message || 'Failed to delete task')
        return false
      } finally {
        setIsDeleting(false)
      }
    },
    [isDeleting, removeTask]
  )

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating,
    isUpdating,
    isDeleting,
  }
}
