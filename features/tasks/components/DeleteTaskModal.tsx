'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { Modal } from '@/shared/ui/Modal'

export interface DeleteTaskModalProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  taskName: string
  onClose?: () => void
  onDelete?: () => void
  onCancel?: () => void
}

const DeleteTaskModal = forwardRef<HTMLDivElement, DeleteTaskModalProps>(
  (
    {
      taskName,
      onClose = () => {},
      onDelete = () => {},
      onCancel = () => {},
      ...props
    },
    ref
  ) => {
    return (
      <Modal
        ref={ref}
        title={`Delete task "${taskName}"?`}
        onClose={onClose}
        primaryButtonText="Delete"
        primaryButtonVariant="default"
        primaryButtonOnClick={onDelete}
        secondaryButtonText="Cancel"
        secondaryButtonVariant="ghost"
        secondaryButtonOnClick={onCancel}
        {...props}
      />
    )
  }
)

DeleteTaskModal.displayName = 'DeleteTaskModal'

export { DeleteTaskModal }
