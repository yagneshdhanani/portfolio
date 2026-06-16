import { useState, useEffect, useRef } from 'react'

/**
 * Tracks when an element enters the viewport using IntersectionObserver.
 * Once triggered, hasBeenInView stays true permanently.
 * Respects prefers-reduced-motion: returns true immediately if enabled.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - Intersection threshold (0-1)
 * @returns {{ ref: React.RefObject, hasBeenInView: boolean }}
 */
export function useInView({ threshold = 0.15 } = {}) {
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion: skip animations entirely
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setHasBeenInView(true)
      return
    }

    const element = ref.current
    if (!element || hasBeenInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, hasBeenInView])

  return { ref, hasBeenInView }
}
