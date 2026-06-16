import React from 'react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionLabel } from '../ui/SectionLabel'
import { SkillChip } from '../ui/SkillChip'
import { SKILL_CATEGORIES as CATEGORIES } from '../../content/site.config'

/**
 * Skills — categorized, staggered entrance.
 * Each category is a labeled row of informational chips (no links).
 */

export function Skills() {
  return (
    <AnimatedSection>
      <SectionLabel>Tech Stack</SectionLabel>
      <h2 id="skills-heading" className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Tools I reach for
      </h2>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {CATEGORIES.map((category, i) => (
          <AnimatedSection key={category.label} delay={i * 0.1}>
            <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-6">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                {category.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillChip key={skill}>{skill}</SkillChip>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </AnimatedSection>
  )
}

export default Skills
