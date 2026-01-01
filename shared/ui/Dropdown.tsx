'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
  HTMLAttributes,
} from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'
import { Chips } from '@/shared/ui/Chips'

const triggerVariants = cva(
  'inline-flex items-center justify-between w-full rounded-lg border border-transparent bg-primary-100 px-3 py-2.5 text-xs font-normal transition-colors hover:border-primary-500 disabled:hover:border-transparent'
)

const menuVariants = cva(
  'absolute z-50 w-full min-w-full rounded-lg border border-primary-500 bg-primary-100 top-full mt-1.5'
)

const itemVariants = cva(
  'border-b border-primary-500 last:border-b-0 px-3 py-2 text-xs font-normal text-primary-900 transition-colors cursor-pointer hover:bg-primary-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent flex items-center justify-between min-w-0'
)

export type DropdownOption = {
  value: string
  label: string
  disabled?: boolean
}

export interface DropdownProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  options: DropdownOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  title?: string
  disabled?: boolean
  multiple?: boolean
  'aria-label'?: string
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Select option...',
      title,
      disabled,
      multiple = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [internalValue, setInternalValue] = useState(
      defaultValue || (multiple ? [] : '')
    )
    const containerRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLUListElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const measureRef = useRef<HTMLSpanElement>(null)
    const [minWidth, setMinWidth] = useState<number | undefined>(undefined)
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const dropdownId = useId()
    const menuId = useId()
    const triggerId = useId()

    const isControlled = controlledValue !== undefined
    const currentValue = isControlled ? controlledValue : internalValue
    const selectedValues = useMemo(() => {
      if (multiple) {
        return Array.isArray(currentValue) ? currentValue : []
      }
      return []
    }, [multiple, currentValue])

    const selectedOption = useMemo(() => {
      if (multiple) return null
      return options.find(opt => opt.value === (currentValue as string))
    }, [options, currentValue, multiple])

    const enabledOptions = useMemo(
      () => options.filter(opt => !opt.disabled),
      [options]
    )

    const longestOption = useMemo(() => {
      if (options.length === 0) return null
      return options.reduce((longest, current) =>
        current.label.length > longest.label.length ? current : longest
      )
    }, [options])

    useEffect(() => {
      if (measureRef.current && longestOption && triggerRef.current) {
        const textWidth = measureRef.current.offsetWidth
        const triggerPadding = 24
        const arrowWidth = 16
        const gap = 4
        const totalWidth = textWidth + triggerPadding + arrowWidth + gap
        setMinWidth(totalWidth)
      }
    }, [longestOption, options])

    const handleToggle = useCallback(() => {
      if (!disabled) {
        setIsOpen(prev => !prev)
        setFocusedIndex(-1)
      }
    }, [disabled])

    const handleSelect = useCallback(
      (optionValue: string) => {
        if (multiple) {
          const currentValues = Array.isArray(currentValue) ? currentValue : []
          const isSelected = currentValues.includes(optionValue)
          const newValues = isSelected
            ? currentValues.filter(v => v !== optionValue)
            : [...currentValues, optionValue]

          if (!isControlled) {
            setInternalValue(newValues)
          }
          onChange?.(newValues)
        } else {
          if (!isControlled) {
            setInternalValue(optionValue)
          }
          onChange?.(optionValue)
          setIsOpen(false)
          setFocusedIndex(-1)
          triggerRef.current?.focus()
        }
      },
      [multiple, isControlled, onChange, currentValue]
    )

    const getNextEnabledIndex = useCallback(
      (currentIndex: number, direction: 'next' | 'prev'): number => {
        if (enabledOptions.length === 0) return -1

        const currentOption = options[currentIndex]
        const currentEnabledIndex = enabledOptions.findIndex(
          opt => opt.value === currentOption?.value
        )

        if (direction === 'next') {
          const nextEnabledIndex =
            currentEnabledIndex < enabledOptions.length - 1
              ? currentEnabledIndex + 1
              : 0
          return options.findIndex(
            opt => opt.value === enabledOptions[nextEnabledIndex].value
          )
        } else {
          const prevEnabledIndex =
            currentEnabledIndex > 0
              ? currentEnabledIndex - 1
              : enabledOptions.length - 1
          return options.findIndex(
            opt => opt.value === enabledOptions[prevEnabledIndex].value
          )
        }
      },
      [options, enabledOptions]
    )

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return

        const openMenu = () => {
          setIsOpen(true)
          const firstEnabledIndex = enabledOptions[0]
            ? options.findIndex(opt => opt.value === enabledOptions[0].value)
            : -1
          setFocusedIndex(firstEnabledIndex)
        }

        const closeMenu = () => {
          setIsOpen(false)
          setFocusedIndex(-1)
        }

        const keyHandlers: Record<
          string,
          (event: KeyboardEvent<HTMLButtonElement>) => void
        > = {
          Enter: e => {
            e.preventDefault()
            if (!isOpen) {
              openMenu()
            }
          },
          ' ': e => {
            e.preventDefault()
            if (!isOpen) {
              openMenu()
            }
          },
          ArrowDown: e => {
            e.preventDefault()
            if (!isOpen) {
              openMenu()
            } else {
              const nextIndex = getNextEnabledIndex(focusedIndex, 'next')
              setFocusedIndex(nextIndex)
            }
          },
          ArrowUp: e => {
            e.preventDefault()
            if (isOpen) {
              const prevIndex = getNextEnabledIndex(focusedIndex, 'prev')
              setFocusedIndex(prevIndex)
            }
          },
          Escape: e => {
            e.preventDefault()
            closeMenu()
            triggerRef.current?.focus()
          },
          Tab: () => {
            closeMenu()
          },
        }

        const handler = keyHandlers[event.key]
        handler?.(event)
      },
      [
        disabled,
        isOpen,
        options,
        enabledOptions,
        focusedIndex,
        getNextEnabledIndex,
      ]
    )

    const handleItemKeyDown = useCallback(
      (
        event: KeyboardEvent<HTMLLIElement>,
        optionValue: string,
        optionDisabled?: boolean
      ) => {
        if (optionDisabled) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleSelect(optionValue)
        }
      },
      [handleSelect]
    )

    useEffect(() => {
      if (isOpen && menuRef.current && focusedIndex >= 0) {
        const items = menuRef.current.querySelectorAll('[role="menuitem"]')
        const item = items[focusedIndex] as HTMLElement
        item?.focus()
      }
    }, [focusedIndex, isOpen])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
          setFocusedIndex(-1)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }
    }, [isOpen])

    return (
      <div ref={containerRef} className={cn('relative', className)} {...props}>
        {title && (
          <label
            htmlFor={triggerId}
            className={cn(
              'mb-1 block text-xs font-medium',
              disabled ? 'text-primary-700' : 'text-primary-900'
            )}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            {title}
          </label>
        )}
        {longestOption && (
          <span
            ref={measureRef}
            className="invisible absolute whitespace-nowrap px-3 text-xs font-normal"
            aria-hidden="true"
          >
            {longestOption.label}
          </span>
        )}
        <button
          id={triggerId}
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={ariaLabel}
          className={cn(triggerVariants(), isOpen && 'border-primary-500')}
          style={minWidth ? { minWidth: `${minWidth}px` } : undefined}
        >
          {multiple && selectedValues.length > 0 ? (
            <div className="flex min-w-0 flex-1 flex-wrap gap-1 overflow-x-auto overflow-y-hidden">
              {selectedValues.map(value => {
                const option = options.find(opt => opt.value === value)
                if (!option) return null
                return (
                  <Chips
                    key={value}
                    label={option.label}
                    onRemove={() => {
                      const currentValues = Array.isArray(currentValue)
                        ? currentValue
                        : []
                      const newValues = currentValues.filter(v => v !== value)
                      if (!isControlled) {
                        setInternalValue(newValues)
                      }
                      onChange?.(newValues)
                    }}
                  />
                )
              })}
            </div>
          ) : (
            <span
              className={cn(
                'min-w-0 truncate',
                selectedOption
                  ? 'text-primary-900'
                  : disabled
                    ? 'text-primary-600'
                    : 'text-primary-700'
              )}
              title={selectedOption?.label || placeholder}
            >
              {selectedOption?.label || placeholder}
            </span>
          )}
          <svg
            className={cn(
              'ml-1 h-3 w-3 shrink-0 transition-transform',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            ref={menuRef}
            id={menuId}
            role="listbox"
            aria-label={ariaLabel || 'Dropdown menu'}
            className={cn(menuVariants())}
          >
            {options.map((option, index) => {
              const isSelected = multiple
                ? selectedValues.includes(option.value)
                : option.value === currentValue

              return (
                <li
                  key={option.value}
                  role="menuitem"
                  tabIndex={
                    option.disabled ? -1 : index === focusedIndex ? 0 : -1
                  }
                  data-disabled={option.disabled}
                  data-selected={isSelected}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  onKeyDown={e =>
                    handleItemKeyDown(e, option.value, option.disabled)
                  }
                  className={cn(itemVariants())}
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                >
                  <span
                    className="min-w-0 flex-1 truncate"
                    title={option.label}
                  >
                    {option.label}
                  </span>
                  {multiple && isSelected && (
                    <svg
                      className="ml-1 h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)

Dropdown.displayName = 'Dropdown'

export { Dropdown }
