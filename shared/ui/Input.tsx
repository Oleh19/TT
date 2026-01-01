'use client'

import { cn } from '@/shared/lib/utils'
import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from 'react'

type BaseInputProps = {
  title?: string
  multiline?: boolean
  error?: string
}

type InputProps = BaseInputProps &
  (
    | (Omit<ComponentProps<'input'>, 'type'> & {
        type?: ComponentProps<'input'>['type']
        multiline?: false
      })
    | (ComponentProps<'textarea'> & { multiline: true })
  )

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, title, multiline, error, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const inputId = useId()
    const errorId = useId()
    const isDisabled = 'disabled' in props && props.disabled
    const inputValue = 'value' in props ? props.value : undefined
    const onChange = 'onChange' in props ? props.onChange : undefined

    useImperativeHandle(ref, () => {
      if (multiline) {
        return textareaRef.current as HTMLTextAreaElement
      }
      return inputRef.current as HTMLInputElement
    }, [multiline])

    const adjustTextareaHeight = useCallback(() => {
      if (multiline && textareaRef.current) {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [multiline])

    useEffect(() => {
      adjustTextareaHeight()
    }, [adjustTextareaHeight, inputValue])

    const handleTextareaChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        adjustTextareaHeight()
        if (multiline && onChange) {
          const textareaOnChange = onChange as (
            e: ChangeEvent<HTMLTextAreaElement>
          ) => void
          textareaOnChange(e)
        }
      },
      [multiline, onChange, adjustTextareaHeight]
    )

    return (
      <div className="w-full">
        {title && (
          <label
            htmlFor={inputId}
            className={cn(
              'mb-1 block text-sm font-medium',
              isDisabled ? 'text-primary-700' : 'text-primary-900'
            )}
          >
            {title}
          </label>
        )}
        {multiline ? (
          <textarea
            id={inputId}
            ref={textareaRef}
            className={cn(
              'flex w-full rounded-lg border bg-primary-100 px-3 py-2 text-sm font-normal text-primary-900 placeholder:font-normal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              isDisabled
                ? 'placeholder:text-primary-600'
                : 'placeholder:text-primary-700',
              error
                ? 'border-error-500 focus-visible:border-error-500'
                : 'border-input focus-visible:border-primary-500',
              'min-h-textarea resize-none overflow-hidden',
              className
            )}
            onChange={handleTextareaChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : undefined}
            {...(props as ComponentProps<'textarea'>)}
          />
        ) : (
          <input
            id={inputId}
            type={(props as ComponentProps<'input'>).type}
            ref={inputRef}
            className={cn(
              'flex w-full rounded-lg border bg-primary-100 px-3 py-2 text-sm font-normal text-primary-900 placeholder:font-normal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              isDisabled
                ? 'placeholder:text-primary-600'
                : 'placeholder:text-primary-700',
              error
                ? 'border-error-500 focus-visible:border-error-500'
                : 'border-input focus-visible:border-primary-500',
              'h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary-900',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : undefined}
            {...(props as Omit<ComponentProps<'input'>, 'type'>)}
          />
        )}
        {error && (
          <p id={errorId} className="mt-1 text-sm text-error-500" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
