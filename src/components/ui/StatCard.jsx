import React from 'react'
import { Card } from './Card'
import { cn } from '../../lib/cn'
import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

/** Splits a value like "20+" into { number: 20, suffix: "+" } */
function parseValue(value) {
  const match = String(value).match(/^(\d+)(.*)$/)
  if (!match) return { number: null, suffix: value }
  return { number: parseInt(match[1], 10), suffix: match[2] }
}

export function StatCard({ icon: Icon, value, label, className = '', ...props }) {
  const { number, suffix } = parseValue(value)
  const { ref, hasBeenInView } = useInView({ threshold: 0.3 })
  const count = useCountUp(number ?? 0, hasBeenInView && number !== null)

  return (
    <Card ref={ref} className={cn('p-5 sm:p-6', className)} {...props}>
      {Icon && (
        <Icon className="mb-4 h-5 w-5 text-subtle" aria-hidden="true" />
      )}
      <div className="font-display text-3xl font-bold leading-none text-foreground sm:text-4xl">
        {number !== null ? `${count}${suffix}` : value}
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-subtle">
        {label}
      </div>
    </Card>
  )
}

export default StatCard
