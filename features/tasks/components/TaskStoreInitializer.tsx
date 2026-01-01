'use client'

import { useEffect } from 'react'
import { useTaskStore } from '@/features/tasks/store/task-store'
import type { Task } from '@/shared/types/task'

type TaskStoreInitializerProps = {
  tasks: Task[]
}

export function TaskStoreInitializer({ tasks }: TaskStoreInitializerProps) {
  const setTasks = useTaskStore(state => state.setTasks)
  const setLoading = useTaskStore(state => state.setLoading)

  useEffect(() => {
    setLoading(true)
    setTasks(tasks)
  }, [tasks, setTasks, setLoading])

  return null
}
