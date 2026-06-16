import React from 'react'
import { Calendar, FolderOpen, Users, Github } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionLabel } from '../ui/SectionLabel'
import { StatCard } from '../ui/StatCard'
import { STATS as STAT_DATA, ABOUT_PARAGRAPHS } from '../../content/site.config'
import { cn } from '../../lib/cn'

/**
 * About — Landing Pattern: Social Proof.
 * Narrative + a 2×2 grid of metric cards. Emphasis comes from weight/color
 * contrast (foreground on muted body), not color accents.
 */

/** Icons paired with stat entries by index */
const STAT_ICONS = [Calendar, FolderOpen, Users, Github]

/**
 * Renders a paragraph from ABOUT_PARAGRAPHS.
 * Segments wrapped in {emphasisStart}…{emphasisEnd} become <Emphasis> spans.
 */
function parseParagraph(text) {
  const parts = text.split(/\{emphasisStart\}(.*?)\{emphasisEnd\}/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <span key={i} className="font-medium text-foreground">{part}</span>
      : part
  )
}

export function About({ showHeader = true }) {
  return (
    <AnimatedSection>
      {showHeader ? (
        <>
          <SectionLabel>About Me</SectionLabel>
          <h2 id="about-heading" className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Engineering with intent
          </h2>
        </>
      ) : null}

      <div className={cn('grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:gap-14', showHeader && 'mt-12')}>
        {/* Narrative */}
        <div className="flex flex-col gap-5 text-base leading-relaxed text-muted sm:text-lg">
          {ABOUT_PARAGRAPHS.map((text, i) => (
            <p key={i}>{parseParagraph(text)}</p>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {STAT_DATA.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <StatCard icon={STAT_ICONS[i]} value={stat.value} label={stat.label} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default About
