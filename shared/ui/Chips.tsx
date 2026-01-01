'use client'

import {
  forwardRef,
  useCallback,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'
import { Close } from '@/shared/icons'

const chipsVariants = cva(
  'inline-flex items-center gap-1 whitespace-nowrap h-fit px-1 rounded',
  {
    variants: {
      variant: {
        default: 'bg-primary-900 text-primary-100 text-xs',
        success: 'bg-success-200 text-success-600',
        warning: 'bg-warning-200 text-warning-500',
        error: 'bg-error-200 text-error-500',
        secondary: 'bg-secondary text-secondary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ChipsProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof chipsVariants> {
  label: string
  onRemove?: () => void
}

const REMOVE_BUTTON_CLASSES =
  'inline-flex items-center justify-center rounded text-primary-100 focus:outline-none' as const

const Chips = forwardRef<HTMLDivElement, ChipsProps>(
  ({ className, variant, label, onRemove, ...props }, ref) => {
    const handleRemoveClick = useCallback(
      (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation()
        onRemove?.()
      },
      [onRemove]
    )

    const handleRemoveKeyDown = useCallback(
      (event: KeyboardEvent<HTMLSpanElement>) => {
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
        className={cn(chipsVariants({ variant, className }))}
        role="status"
        aria-label={label}
        {...props}
      >
        <span>{label}</span>

        {onRemove && (
          <span
            role="button"
            tabIndex={0}
            onClick={handleRemoveClick}
            onKeyDown={handleRemoveKeyDown}
            className={REMOVE_BUTTON_CLASSES}
            aria-label={`Remove ${label} chip`}
          >
            <Close size="xxs" />
          </span>
        )}
      </div>
    )
  }
)

Chips.displayName = 'Chips'

export { Chips, chipsVariants }
