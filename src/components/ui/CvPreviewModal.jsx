import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink } from 'lucide-react'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { OWNER } from '../../content/site.config'

const CV_URL = OWNER.cvPath

export function CvPreviewModal({ open, onClose }) {
  const dialogRef = useFocusTrap(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="CV Preview"
            tabIndex={-1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-4 top-[4vh] bottom-[4vh] z-50 mx-auto flex max-w-3xl flex-col rounded-xl border border-border bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
                CV Preview
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-semibold text-muted transition-colors duration-150 hover:border-border-strong hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  Open
                </a>
                <a
                  href={CV_URL}
                  download
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-opacity duration-150 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <Download className="h-3 w-3" aria-hidden="true" />
                  Download
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close preview"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border text-subtle transition-colors duration-150 hover:border-border-strong hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* PDF — Chrome requires <iframe> for its built-in PDF viewer */}
            <iframe
              key={open ? 'open' : 'closed'}
              src={CV_URL}
              title="Yagnesh Dhanani — CV"
              tabIndex={-1}
              className="min-h-0 flex-1 rounded-b-xl border-0"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
