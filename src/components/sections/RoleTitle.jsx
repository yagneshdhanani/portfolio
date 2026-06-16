import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { OWNER } from '../../content/site.config'

const ROLE_TEXT = OWNER.role

export function RoleTitle() {
  const [chars, setChars] = useState(0)
  const [cursorOn, setCursorOn] = useState(true)
  const charsRef = useRef(0)
  const deletingRef = useRef(false)
  const timerRef = useRef(null)
  const cancelledRef = useRef(false)

  useEffect(() => {
    cancelledRef.current = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      charsRef.current = ROLE_TEXT.length
      setChars(ROLE_TEXT.length)
      setCursorOn(false)
      return () => {
        cancelledRef.current = true
        clearTimeout(timerRef.current)
      }
    }

    const typeDelay = (char) => {
      const base = 85 + Math.random() * 95
      if (char === ' ') return base + 60 + Math.random() * 60
      if (char === '·') return base + 80 + Math.random() * 80
      return base
    }

    const tick = () => {
      if (cancelledRef.current) return

      const c = charsRef.current
      if (!deletingRef.current) {
        if (c < ROLE_TEXT.length) {
          charsRef.current = c + 1
          setChars(c + 1)
          timerRef.current = setTimeout(tick, typeDelay(ROLE_TEXT[c]))
        } else {
          timerRef.current = setTimeout(() => {
            if (cancelledRef.current) return
            deletingRef.current = true
            tick()
          }, 3000)
        }
      } else if (c > 0) {
        charsRef.current = c - 1
        setChars(c - 1)
        timerRef.current = setTimeout(tick, 40 + Math.random() * 30)
      } else {
        timerRef.current = setTimeout(() => {
          if (cancelledRef.current) return
          deletingRef.current = false
          tick()
        }, 900)
      }
    }

    timerRef.current = setTimeout(tick, 850)
    return () => {
      cancelledRef.current = true
      clearTimeout(timerRef.current)
      charsRef.current = 0
      deletingRef.current = false
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCursorOn((value) => !value), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="mt-5 font-mono uppercase text-muted role-title"
    >
      <span aria-label={ROLE_TEXT}>{ROLE_TEXT.slice(0, chars)}</span>
      <span
        aria-hidden="true"
        className={`role-cursor${cursorOn ? '' : ' role-cursor--off'}`}
      >
        _
      </span>
    </motion.p>
  )
}

export default RoleTitle
