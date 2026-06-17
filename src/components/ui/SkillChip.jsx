import React from 'react'
import { cn } from '../../lib/cn'

/**
 * SkillChip — neutral bordered pill (mono).
 * Informational only; subtle surface fill, no color accent.
 */
export function SkillChip({ children, icon: Icon, className = '', 'aria-label': ariaLabel, ...props }) {
  const label = ariaLabel || (typeof children === 'string' ? children : undefined)

  return (
    <span
      className={cn(
        'relative group/chip inline-flex items-center justify-center gap-1.5 rounded-md',
        Icon && !children ? 'h-12 w-12' : 'px-3 py-2',
        'font-mono text-xs',
        'border border-border bg-surface text-muted',
        'transition-colors duration-150 ease-out',
        'hover:border-border-strong hover:text-foreground',
        'cursor-default',
        className,
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {Icon && <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />}
      {children}
      {label && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-foreground opacity-0 shadow-md transition-opacity duration-150 group-hover/chip:opacity-100"
        >
          {label}
        </span>
      )}
    </span>
  )
}

export default SkillChip
