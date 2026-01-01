'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { TaskForm } from '../ui/TaskForm'
import { useTaskForm } from '../hooks/useTaskForm'
import type { DropdownOption } from '@/shared/ui/Dropdown'
import type { CreateTaskFormData } from '../types/taskForm'

export interface CreateTaskModalProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title: string
  labelOptions?: DropdownOption[]
  children?: ReactNode
  isLoading?: boolean
  onClose?: () => void
  onCreate?: (taskData: CreateTaskFormData) => void | Promise<void>
  onCancel?: () => void
}

const CreateTaskModal = forwardRef<HTMLDivElement, CreateTaskModalProps>(
  (
    {
      title,
      labelOptions = [],
      children,
      isLoading = false,
      onClose = () => {},
      onCreate = () => {},
      onCancel = () => {},
      ...props
    },
    ref
  ) => {
    const { values, updateField, isValid } = useTaskForm()

    return (
      <Modal
        ref={ref}
        title={title}
        onClose={onClose}
        primaryButtonText="Create"
        primaryButtonVariant="default"
        primaryButtonDisabled={!isValid || isLoading}
        primaryButtonOnClick={() => {
          onCreate({
            name: values.taskName,
            key: values.taskKey,
            description: values.description,
            labels: values.labels,
          })
        }}
        secondaryButtonText="Cancel"
        secondaryButtonVariant="ghost"
        secondaryButtonOnClick={onCancel}
        {...props}
      >
        <TaskForm
          values={values}
          onFieldChange={updateField}
          labelOptions={labelOptions}
        />
        {children}
      </Modal>
    )
  }
)

CreateTaskModal.displayName = 'CreateTaskModal'

export { CreateTaskModal }
