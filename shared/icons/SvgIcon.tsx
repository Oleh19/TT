import type { SvgIconProps } from './types'
import { getIconSize } from './types'
import { cn } from '@/shared/lib/utils'

export default function SvgIcon({
  className,
  color,
  size = 'md',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  title,
  viewBox,
  fill = 'none',
  xmlns = 'http://www.w3.org/2000/svg',
  children,
}: SvgIconProps) {
  if (!viewBox) {
    throw new Error('SvgIcon requires viewBox prop')
  }

  const iconSize = getIconSize(size)

  const isDecorative = ariaHidden !== undefined ? ariaHidden : !ariaLabel
  const hasLabel = ariaLabel !== undefined || !isDecorative

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox={viewBox}
      fill={fill}
      xmlns={xmlns}
      style={color ? { color } : undefined}
      className={cn(className)}
      role={hasLabel ? 'img' : 'presentation'}
      aria-label={hasLabel ? ariaLabel || title : undefined}
      aria-hidden={isDecorative ? true : undefined}
      focusable="false"
    >
      {hasLabel && <title>{ariaLabel || title}</title>}
      {children}
    </svg>
  )
}
