'use client'

import { forwardRef, HTMLAttributes, ReactNode, useState, useMemo } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { TaskForm } from '../ui/TaskForm'
import { useTaskForm } from '../hooks/useTaskForm'
import { DeleteTaskModal } from './DeleteTaskModal'
import type { DropdownOption } from '@/shared/ui/Dropdown'
import type { UpdateTaskFormData } from '../types/taskForm'
import type { Status, Label } from '@/shared/types/task'

export interface UpdateTaskModalProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title: string
  taskId?: string
  initialTaskName?: string
  initialTaskKey?: string
  initialDescription?: string
  initialLabels?: Label[]
  initialStatus?: Status
  labelOptions?: DropdownOption[]
  statusOptions?: DropdownOption[]
  children?: ReactNode
  isLoading?: boolean
  onClose?: () => void
  onUpdate?: (taskData: UpdateTaskFormData) => void | Promise<void>
  onCancel?: () => void
  onDelete?: () => void
}

const UpdateTaskModal = forwardRef<HTMLDivElement, UpdateTaskModalProps>(
  (
    {
      title,
      taskId,
      initialTaskName = '',
      initialTaskKey = '',
      initialDescription = '',
      initialLabels = [],
      initialStatus = 'backlog',
      labelOptions = [],
      statusOptions = [],
      children,
      isLoading = false,
      onClose = () => {},
      onUpdate = () => {},
      onCancel = () => {},
      onDelete = () => {},
      ...props
    },
    ref
  ) => {
    const { values, updateField, isValid, hasChanges } = useTaskForm({
      initialValues: {
        taskName: initialTaskName,
        taskKey: initialTaskKey,
        description: initialDescription,
        labels: initialLabels,
        status: initialStatus,
      },
    })

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const isFormValid = useMemo(() => {
      return isValid && hasChanges
    }, [isValid, hasChanges])

    if (showDeleteModal) {
      return (
        <DeleteTaskModal
          taskName={values.taskName}
          onDelete={async () => {
            await onDelete()
            setShowDeleteModal(false)
            onClose()
          }}
          onCancel={() => setShowDeleteModal(false)}
          onClose={() => setShowDeleteModal(false)}
        />
      )
    }

    return (
      <Modal
        ref={ref}
        title={title}
        onClose={onClose}
        primaryButtonText="Update"
        primaryButtonVariant="default"
        primaryButtonDisabled={!isFormValid || isLoading}
        primaryButtonOnClick={() => {
          onUpdate({
            name: values.taskName,
            key: values.taskKey,
            description: values.description,
            status: values.status,
            labels: values.labels,
          })
        }}
        secondaryButtonText="Delete Task"
        secondaryButtonVariant="destructive"
        secondaryButtonOnClick={() => setShowDeleteModal(true)}
        {...props}
      >
        <TaskForm
          values={values}
          onFieldChange={updateField}
          labelOptions={labelOptions}
          statusOptions={statusOptions}
          showStatus
        />
        {children}
      </Modal>
    )
  }
)

UpdateTaskModal.displayName = 'UpdateTaskModal'

export { UpdateTaskModal }
