import React from 'react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionLabel } from '../ui/SectionLabel'
import { Card } from '../ui/Card'
import { SkillChip } from '../ui/SkillChip'
import { EXPERIENCE as TIMELINE } from '../../content/site.config'
import { cn } from '../../lib/cn'

/**
 * Experience — vertical timeline of bordered cards.
 * Monochrome: the spine and node are border/foreground tones.
 */

export function Experience({ showHeader = true }) {
  return (
    <AnimatedSection>
      {showHeader ? (
        <>
          <SectionLabel>Experience</SectionLabel>
          <h2 id="experience-heading" className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Where I&apos;ve shipped
          </h2>
        </>
      ) : null}

      <div className={cn('relative', showHeader && 'mt-12')}>
        {/* Spine */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1.75 top-2 w-px bg-border"
        />

        <div className="flex flex-col gap-6">
          {TIMELINE.map((entry, i) => (
            <AnimatedSection key={entry.slug} delay={i * 0.12}>
              <div className="relative pl-8 sm:pl-10">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-6 h-3.5 w-3.5 rounded-full border-2 border-foreground bg-background"
                />

                <Card interactive className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {entry.company}
                    </h3>
                    <span className="font-mono text-xs text-subtle">
                      {entry.date}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                    <p className="text-sm font-medium text-muted">{entry.role}</p>
                    {entry.location && (
                      <span className="font-mono text-[11px] text-subtle">{entry.location}</span>
                    )}
                  </div>

                  <ul className="mt-4 flex flex-col gap-2">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-px w-3 shrink-0 bg-border-strong"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.tech.map((t) => (
                      <SkillChip key={t}>{t}</SkillChip>
                    ))}
                  </div>
                </Card>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Experience
