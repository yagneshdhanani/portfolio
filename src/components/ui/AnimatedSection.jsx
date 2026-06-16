import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

/**
 * AnimatedSection — UX Guidelines: animation + prefers-reduced-motion
 * Slides up and fades in when entering the viewport.
 * useInView already respects prefers-reduced-motion by returning true immediately.
 */
export function AnimatedSection({
  children,
  delay = 0,
  className = '',
  ...props
}) {
  const { ref, hasBeenInView } = useInView({ threshold: 0.15 })
  const transition = useMemo(
    () => ({
      duration: 0.6,
      delay,
      ease: [0.4, 0, 0.2, 1],
    }),
    [delay]
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={
        hasBeenInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 32 }
      }
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
