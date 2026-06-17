import React, { forwardRef } from 'react'
import { cn } from '../../lib/cn'

/**
 * Card — monochrome surface with a real border (no glassmorphism).
 *
 * Swiss/editorial: depth comes from borders + surface steps, not blur/glow.
 * `interactive` opts into hover affordances (lift, stronger border, pointer).
 * Use `as` when the card surface needs native semantics, such as a button.
 */
export const Card = forwardRef(function Card(
  { as: Component = 'div', children, className = '', interactive = false, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'relative rounded-xl border border-border bg-surface',
        'transition-[transform,border-color,background-color] duration-200 ease-out',
        interactive && 'cursor-pointer hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Card
