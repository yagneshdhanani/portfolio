import React from 'react'
import { cn } from '../../lib/cn'

/**
 * SkillChip — neutral bordered pill (mono).
 * Informational only; subtle surface fill, no color accent.
 */
export function SkillChip({ children, className = '', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-1',
        'font-mono text-xs',
        'border border-border bg-surface text-muted',
        'transition-colors duration-150 ease-out',
        'hover:border-border-strong hover:text-foreground',
        'cursor-default',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default SkillChip
