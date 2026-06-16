import React from 'react'
import { cn } from '../../lib/cn'

/**
 * SectionLabel — mono, uppercase, tracked-out eyebrow.
 * Includes a short leading rule for the Swiss editorial feel.
 */
export function SectionLabel({ children, className = '', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3',
        'font-mono text-xs font-medium uppercase tracking-[0.2em]',
        'text-subtle',
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
      {children}
    </span>
  )
}

export default SectionLabel
