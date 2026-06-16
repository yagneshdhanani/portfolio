import React, { useMemo, useState } from 'react'
import { cn } from '../../lib/cn'

/**
 * ActivityChart — monochrome contribution heatmap (12 weeks × 7 days).
 * Intensity is rendered as steps of the foreground color (greys in light
 * mode, light-on-dark in dark mode) so it fits the monochrome system.
 *
 * Cells are ~12px so they remain hoverable/accessible.
 */
const WEEKS = 12
const DAYS = 7
const REFERENCE_DATE = new Date('2026-06-15')

// Hardcoded mock data — 84 contribution values (0–9).
const MOCK = [
  0, 1, 0, 2, 4, 1, 0, 3, 0, 1, 5, 2, 0, 1, 0, 0, 2, 3, 6, 1, 0,
  2, 4, 0, 1, 0, 3, 2, 5, 1, 0, 0, 2, 7, 1, 0, 3, 0, 1, 2, 4, 0,
  0, 1, 8, 2, 0, 3, 1, 0, 2, 5, 1, 0, 4, 0, 1, 2, 0, 3, 6, 1, 0,
  2, 0, 1, 4, 0, 2, 9, 1, 0, 3, 1, 0, 2, 5, 0, 1, 3, 0, 2, 4, 1,
]

function intensityClass(value) {
  if (value === 0) return 'bg-surface-2'
  if (value <= 2) return 'bg-foreground/25'
  if (value <= 5) return 'bg-foreground/50'
  return 'bg-foreground/90'
}

function dateForIndex(index) {
  const daysAgo = MOCK.length - 1 - index
  const d = new Date(REFERENCE_DATE)
  d.setDate(d.getDate() - daysAgo)
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ActivityChart() {
  const [hovered, setHovered] = useState(null)

  const cells = useMemo(
    () =>
      MOCK.map((value, index) => ({
        index,
        value,
        date: dateForIndex(index),
      })),
    []
  )

  return (
    <div className="relative inline-block">
      <div
        role="img"
        aria-label={`Contribution activity over the last ${WEEKS} weeks`}
        className="grid grid-flow-col gap-1"
        style={{ gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))` }}
      >
        {cells.map((cell) => (
          <div
            key={cell.index}
            className={cn(
              'h-3 w-3 rounded-[3px] border border-border/60',
              'transition-colors duration-150',
              intensityClass(cell.value),
            )}
            onMouseEnter={() => setHovered(cell)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </div>

      {hovered && (
        <div className="pointer-events-none absolute -top-9 left-0 z-10 whitespace-nowrap rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground shadow-sm">
          {hovered.value} contribution{hovered.value === 1 ? '' : 's'} ·{' '}
          {hovered.date}
        </div>
      )}

      <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-subtle">
        <span>Less</span>
        <span className="h-3 w-3 rounded-[3px] border border-border/60 bg-surface-2" />
        <span className="h-3 w-3 rounded-[3px] bg-foreground/25" />
        <span className="h-3 w-3 rounded-[3px] bg-foreground/50" />
        <span className="h-3 w-3 rounded-[3px] bg-foreground/90" />
        <span>More</span>
      </div>
    </div>
  )
}

export default ActivityChart
