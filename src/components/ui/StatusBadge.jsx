import React from 'react'
import { motion } from 'framer-motion'

/**
 * StatusBadge — availability pill.
 * Monochrome surface; the green dot is the single functional color used
 * to signal "available" (universally understood). The label carries the
 * meaning too, so color is never the only indicator.
 */
export function StatusBadge({ text = 'Available for work' }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
      <span className="relative inline-flex h-2 w-2">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full"
          style={{ backgroundColor: 'var(--status)' }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: 'var(--status)' }}
        />
      </span>
      <span className="font-mono text-xs font-medium tracking-wide text-muted">
        {text}
      </span>
    </span>
  )
}

export default StatusBadge
