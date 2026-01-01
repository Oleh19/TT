'use client'

import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useCallback,
  KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/shared/lib/utils'
import { Close } from '@/shared/icons'
import { BaseButton } from '@/shared/ui/BaseButton'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/shared/ui/BaseButton'

type ButtonVariant = VariantProps<typeof buttonVariants>['variant']

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  children?: ReactNode
  onClose?: () => void
  primaryButtonText?: string
  primaryButtonVariant?: ButtonVariant
  primaryButtonOnClick?: () => void
  primaryButtonDisabled?: boolean
  secondaryButtonText?: string
  secondaryButtonVariant?: ButtonVariant
  secondaryButtonOnClick?: () => void
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      title,
      description,
      children,
      onClose,
      primaryButtonText,
      primaryButtonVariant,
      primaryButtonOnClick,
      primaryButtonDisabled,
      secondaryButtonText,
      secondaryButtonVariant,
      secondaryButtonOnClick,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalStyle
      }
    }, [])

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && onClose) {
          onClose()
        }
      },
      [onClose]
    )

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && onClose) {
          onClose()
        }
      },
      [onClose]
    )

    const modalContent = (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
        <div
          ref={ref}
          className={cn(
            'scrollbar-hide relative z-10 max-h-[90vh] w-modal overflow-y-auto rounded-3xl bg-primary-400 p-6',
            className
          )}
          onClick={e => e.stopPropagation()}
          {...props}
        >
          <div className="flex items-center justify-between">
            <h2
              id="modal-title"
              className="text-modal font-bold text-primary-900"
            >
              {title}
            </h2>
            <BaseButton
              shape="round"
              icon={<Close size="sm" />}
              onClick={onClose}
              aria-label="Close modal"
            />
          </div>
          {description && (
            <p className="mt-4 text-xs font-normal text-primary-900">
              {description}
            </p>
          )}
          {children && <div className="mt-4">{children}</div>}

          {(primaryButtonText || secondaryButtonText) && (
            <div className="mt-8 flex justify-end gap-3">
              {secondaryButtonText && (
                <BaseButton
                  variant={secondaryButtonVariant}
                  onClick={secondaryButtonOnClick}
                >
                  {secondaryButtonText}
                </BaseButton>
              )}
              {primaryButtonText && (
                <BaseButton
                  variant={primaryButtonVariant}
                  onClick={primaryButtonOnClick}
                  disabled={primaryButtonDisabled}
                >
                  {primaryButtonText}
                </BaseButton>
              )}
            </div>
          )}
        </div>
      </div>
    )

    if (typeof window === 'undefined') {
      return null
    }

    return createPortal(modalContent, document.body)
  }
)

Modal.displayName = 'Modal'

export { Modal }
