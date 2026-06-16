import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusableElements(container) {
  return Array.from(container?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      !element.hasAttribute('aria-hidden') &&
      element.getAttribute('aria-disabled') !== 'true'
  )
}

export function useFocusTrap(active) {
  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!active) return undefined

    previousFocusRef.current = document.activeElement
    const container = containerRef.current

    requestAnimationFrame(() => {
      const focusable = getFocusableElements(container)
      ;(focusable[0] ?? container)?.focus()
    })

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return

      const focusable = getFocusableElements(container)
      if (focusable.length === 0) {
        event.preventDefault()
        container?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      requestAnimationFrame(() => previousFocusRef.current?.focus?.())
    }
  }, [active])

  return containerRef
}
