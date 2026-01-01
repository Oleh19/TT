'use client'

import { forwardRef, useCallback, KeyboardEvent, MouseEvent } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'
import { Close } from '@/shared/icons'

export type TagStatus = 'In Progress' | 'Done' | 'Backlog' | 'Onboarding'

type TagVariant = 'in-progress' | 'done' | 'backlog' | 'default'

const STATUS_VARIANT_MAP = {
  'In Progress': 'in-progress',
  Done: 'done',
  Backlog: 'backlog',
  Onboarding: 'default',
} as const satisfies Record<TagStatus, TagVariant>

const tagVariants = cva(
  'inline-flex items-center gap-1 whitespace-nowrap h-fit w-fit text-xs text-primary-700',
  {
    variants: {
      variant: {
        'in-progress': 'bg-success-100 font-medium rounded-tag py-1 px-1.5',
        done: 'bg-warning-100 font-medium rounded-tag py-1 px-1.5',
        backlog: 'bg-primary-200 font-medium rounded-tag py-1 px-1.5',
        default: 'bg-primary-200 font-semibold rounded py-1 px-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type TagProps = {
  status?: TagStatus
  label?: string
  onRemove?: () => void
  className?: string
}

const REMOVE_BUTTON_CLASSES =
  'inline-flex items-center justify-center rounded text-primary-700 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1' as const

const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ className, status, label, onRemove }, ref) => {
    const variant = status ? STATUS_VARIANT_MAP[status] : 'default'
    const displayText = label || status || ''

    const handleRemoveClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        onRemove?.()
      },
      [onRemove]
    )

    const handleRemoveKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          event.stopPropagation()
          onRemove?.()
        }
      },
      [onRemove]
    )

    return (
      <div
        ref={ref}
        className={cn(tagVariants({ variant, className }))}
        role="status"
        aria-label={label ? `Tag: ${label}` : `Status: ${status}`}
      >
        <span>{displayText}</span>
        {onRemove && (
          <button
            type="button"
            onClick={handleRemoveClick}
            onKeyDown={handleRemoveKeyDown}
            className={REMOVE_BUTTON_CLASSES}
            aria-label={`Remove ${displayText} tag`}
          >
            <Close className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  }
)

Tag.displayName = 'Tag'

export { Tag }
