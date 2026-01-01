import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-900 text-primary-100 hover:bg-primary-800 hover:text-primary-400 disabled:bg-primary-600 disabled:text-primary-400 disabled:opacity-100',
        destructive: 'text-error-500 hover:bg-error-100 disabled:opacity-100',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'bg-transparent text-primary-900 hover:bg-primary-200 disabled:opacity-100',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-auto px-4 py-2 text-xs',
        sm: 'h-9 px-3 text-xs rounded-md',
        lg: 'h-11 px-8 text-xs rounded-md',
        icon: 'h-10 w-10',
      },
      shape: {
        default: 'rounded-button gap-2',
        round:
          'w-9 h-9 p-3 gap-2 rounded-full bg-primary-200 hover:bg-primary-100 disabled:bg-primary-200 disabled:opacity-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
    compoundVariants: [
      {
        variant: ['default'],
        size: ['default', 'sm', 'lg'],
        shape: 'default',
        className: 'min-w-button',
      },
      {
        variant: 'destructive',
        size: ['default', 'sm', 'lg'],
        shape: 'default',
        className: 'px-3',
      },
      {
        variant: 'ghost',
        size: ['default', 'sm', 'lg'],
        shape: 'default',
        className: 'px-3',
      },
    ],
  }
)

const ICON_SIZES = {
  sm: 'h-3 w-3',
  lg: 'h-6 w-6',
  icon: 'h-3 w-3',
  default: 'h-3 w-3',
} as const

const ICON_WRAPPER_CLASSES =
  'inline-flex shrink-0 items-center justify-center' as const

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface BaseButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  'aria-label'?: string
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      className,
      variant,
      size = 'default',
      shape,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const shouldShowIcon = shape === 'round' && Boolean(icon)
    const buttonSize = (size || 'default') as ButtonSize
    const iconSizeClass = ICON_SIZES[buttonSize] || ICON_SIZES.default

    const iconElement = shouldShowIcon ? (
      <span className={cn(ICON_WRAPPER_CLASSES, iconSizeClass)}>{icon}</span>
    ) : null

    return (
      <button
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        disabled={disabled}
        data-shape={shape}
        aria-label={ariaLabel}
        {...props}
      >
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </button>
    )
  }
)

BaseButton.displayName = 'BaseButton'

export { BaseButton, buttonVariants }
