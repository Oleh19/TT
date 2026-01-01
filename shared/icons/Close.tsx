import type { FC } from 'react'
import SvgIcon from './SvgIcon'
import type { SvgIconProps } from './types'
import { calculateStrokeWidth, getIconSize } from './types'

const VIEWBOX = '0 0 12 12'
const VIEWBOX_SIZE = 12
const ORIGINAL_STROKE_WIDTH = 1.25

export const CloseIcon: FC<SvgIconProps> = ({ size, color, ...props }) => {
  const iconSize = getIconSize(size)
  const strokeColor = 'currentColor'
  const strokeWidth = calculateStrokeWidth(
    ORIGINAL_STROKE_WIDTH,
    iconSize,
    VIEWBOX_SIZE
  )

  return (
    <SvgIcon
      {...props}
      size={size}
      color={color}
      viewBox={VIEWBOX}
      title="Close"
    >
      <path
        d="M3.5 3.5L8.5 8.5M3.5 8.5L8.5 3.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

export default CloseIcon
