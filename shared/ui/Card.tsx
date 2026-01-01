'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'
import { Tag, type TagStatus } from '@/shared/ui/Tag'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  status: TagStatus
  title: string
  subtitle: string
  description: string
  tags?: string[]
  onTagRemove?: () => void
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      status,
      title,
      subtitle,
      description,
      tags,
      onTagRemove,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-2xl border border-transparent bg-white p-3 transition-colors hover:border-primary-500',
          className
        )}
        {...props}
      >
        <Tag status={status} onRemove={onTagRemove} />
        <div className="mt-3 flex flex-col">
          <h3 className="text-sm font-bold text-primary-900">{title}</h3>
          <p className="text-xs font-normal text-primary-600">{subtitle}</p>
        </div>
        <div className="mt-3">
          <p className="line-clamp-3 text-xs font-normal text-primary-900/70">
            {description}
          </p>
        </div>
        {tags && tags.length > 0 && (
          <>
            <div className="mt-3 border-t border-primary-300" />
            <div className="mt-4 flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Tag key={index} label={tag} />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
