import { useState, useEffect, useCallback } from 'react'

/**
 * useTheme — light/dark with system default.
 * - First visit follows the OS (prefers-color-scheme).
 * - Once the user toggles, the choice is persisted in localStorage and wins.
 * - If the user never toggled, the app keeps following live OS changes.
 *
 * The initial class is set by an inline script in index.html (no FOUC);
 * this hook keeps React state in sync and owns subsequent updates.
 */
function getStoredTheme() {
  try {
    const stored = localStorage.getItem('theme')
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* ignore storage failures (private mode, CSP, disabled storage) */
  }
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = getStoredTheme()
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Reflect state onto <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Follow OS changes only while the user hasn't made an explicit choice
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      if (!getStoredTheme()) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      setStoredTheme(next)
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
