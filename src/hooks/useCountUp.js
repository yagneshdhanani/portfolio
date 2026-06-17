import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 to `target` once `triggered` flips to true.
 * Respects prefers-reduced-motion — returns target immediately if set.
 *
 * @param {number} target   - Final value
 * @param {boolean} triggered - Start the animation when true
 * @param {number} [duration=1400] - Animation duration in ms
 * @returns {number} current animated value
 */
export function useCountUp(target, triggered, duration = 1400, rerunKey = 0) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!triggered) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    setCount(0)
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [triggered, target, duration, rerunKey])

  return count
}
