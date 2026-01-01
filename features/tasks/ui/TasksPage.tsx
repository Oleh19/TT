'use client'

import { useState, useCallback, useMemo } from 'react'
import { BaseButton } from '@/shared/ui/BaseButton'
import { CreateTaskModal } from '@/features/tasks/components/CreateTaskModal'
import { UpdateTaskModal } from '@/features/tasks/components/UpdateTaskModal'
import { DeleteTaskModal } from '@/features/tasks/components/DeleteTaskModal'
import { TaskColumn } from '@/features/tasks/components/TaskColumn'
import { useTaskMutations } from '@/features/tasks/hooks/useTaskMutations'
import { useTaskStore } from '@/features/tasks/store/task-store'
import {
  LABEL_OPTIONS,
  STATUS_OPTIONS,
} from '@/features/tasks/constants/taskOptions'
import type {
  CreateTaskFormData,
  UpdateTaskFormData,
} from '@/features/tasks/types/taskForm'
import type { Task } from '@/shared/types/task'

export function TasksPage() {
  const tasks = useTaskStore(state => state.tasks)
  const isLoading = useTaskStore(state => state.isLoading)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  const { handleCreate, handleUpdate, handleDelete, isCreating, isUpdating } =
    useTaskMutations()

  const handleCreateTask = useCallback(
    async (taskData: CreateTaskFormData) => {
      const newTask = await handleCreate(taskData)
      if (newTask) {
        setShowCreateModal(false)
      }
    },
    [handleCreate]
  )

  const handleUpdateTask = useCallback(
    async (taskData: UpdateTaskFormData) => {
      if (editingTask) {
        const updatedTask = await handleUpdate(editingTask.id, taskData)
        if (updatedTask) {
          setEditingTask(null)
        }
      }
    },
    [editingTask, handleUpdate]
  )

  const handleDeleteTask = useCallback(async () => {
    if (deletingTask) {
      const success = await handleDelete(deletingTask.id)
      if (success) {
        setDeletingTask(null)
        setEditingTask(null)
      }
    }
  }, [deletingTask, handleDelete])

  const handleCardClick = useCallback((task: Task) => {
    setEditingTask(task)
  }, [])

  const tasksByStatus = useMemo(() => {
    const backlog = tasks.filter(task => task.status === 'backlog')
    const inProgress = tasks.filter(task => task.status === 'in_progress')
    const done = tasks.filter(task => task.status === 'done')
    return { backlog, inProgress, done }
  }, [tasks])

  const handleDeleteFromEdit = useCallback(async () => {
    if (editingTask) {
      const success = await handleDelete(editingTask.id)
      if (success) {
        setEditingTask(null)
      }
    }
  }, [editingTask, handleDelete])

  return (
    <>
      <div className="flex items-center justify-end">
        <BaseButton variant="default" onClick={() => setShowCreateModal(true)}>
          Create Task
        </BaseButton>
      </div>

      {isLoading ? (
        <div className="mt-5 flex h-64 items-center justify-center rounded-2xl border border-primary-300 bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-300 border-t-primary-900" />
            <p className="text-sm text-primary-600">Loading tasks...</p>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="mt-5 flex h-64 items-center justify-center rounded-2xl border border-primary-300 bg-white">
          <p className="text-sm text-primary-600">
            No tasks yet. Create your first task!
          </p>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <div className="flex-1">
            <TaskColumn
              status="backlog"
              title="Backlog"
              tasks={tasksByStatus.backlog}
              onTaskClick={handleCardClick}
            />
          </div>
          <div className="flex-1">
            <TaskColumn
              status="in_progress"
              title="In Progress"
              tasks={tasksByStatus.inProgress}
              onTaskClick={handleCardClick}
            />
          </div>
          <div className="flex-1">
            <TaskColumn
              status="done"
              title="Done"
              tasks={tasksByStatus.done}
              onTaskClick={handleCardClick}
            />
          </div>
        </div>
      )}

      {showCreateModal && (
        <CreateTaskModal
          title="Create Task"
          labelOptions={LABEL_OPTIONS}
          isLoading={isCreating}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTask}
          onCancel={() => setShowCreateModal(false)}
        />
      )}

      {editingTask && (
        <UpdateTaskModal
          title="Update Task"
          taskId={editingTask.id}
          initialTaskName={editingTask.name}
          initialTaskKey={editingTask.key}
          initialDescription={editingTask.description}
          initialLabels={editingTask.labels}
          initialStatus={editingTask.status}
          labelOptions={LABEL_OPTIONS}
          statusOptions={STATUS_OPTIONS}
          isLoading={isUpdating}
          onClose={() => setEditingTask(null)}
          onUpdate={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
          onDelete={handleDeleteFromEdit}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          taskName={deletingTask.name}
          onClose={() => setDeletingTask(null)}
          onDelete={handleDeleteTask}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </>
  )
}
