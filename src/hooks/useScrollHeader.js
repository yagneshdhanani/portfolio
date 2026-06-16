import { useState, useEffect, useRef } from 'react'

/**
 * Tracks whether the page is scrolled past the header threshold.
 *
 * @returns {{ isScrolled: boolean }}
 */
export function useScrollHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const frameRef = useRef(null)
  const isScrolledRef = useRef(false)

  useEffect(() => {
    const updateScrollState = () => {
      frameRef.current = null
      const nextIsScrolled = window.scrollY > 20

      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled
        setIsScrolled(nextIsScrolled)
      }
    }

    const scheduleScrollUpdate = () => {
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleScrollUpdate)
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return { isScrolled }
}
