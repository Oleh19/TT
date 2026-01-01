import { ReactNode } from 'react'

export type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type SvgIconProps = {
  className?: string
  color?: string
  size?: IconSize
  'aria-label'?: string
  'aria-hidden'?: boolean
  title?: string
  viewBox?: string
  fill?: string
  xmlns?: string
  children?: ReactNode
}

export function calculateStrokeWidth(
  originalStrokeWidth: number,
  size: number,
  viewBoxSize: number
): number {
  return (originalStrokeWidth * size) / viewBoxSize
}

export function getIconSize(size?: IconSize): number {
  switch (size) {
    case 'xxs':
      return 10
    case 'xs':
      return 12
    case 'sm':
      return 16
    case 'md':
      return 20
    case 'lg':
      return 24
    case 'xl':
      return 32
    default:
      return 20
  }
}
