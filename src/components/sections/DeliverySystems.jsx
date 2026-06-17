import React from 'react'
import { LayoutDashboard, Rocket, Server, Sparkles } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionLabel } from '../ui/SectionLabel'
import { Card } from '../ui/Card'
import { DELIVERY_SYSTEMS } from '../../content/site.config'

const ICONS = [Server, LayoutDashboard, Rocket, Sparkles]

export function DeliverySystems() {
  return (
    <AnimatedSection>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div>
          <SectionLabel>Systems</SectionLabel>
          <h2 id="systems-heading" className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What I can own end to end
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I work best where product requirements meet backend complexity: turning
            unclear workflows into reliable services, useful interfaces, and
            deployable systems teams can keep evolving.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {DELIVERY_SYSTEMS.map((system, index) => {
            const Icon = ICONS[index] ?? Server
            const chips = system.proof.split(',').map(s => s.trim()).filter(Boolean)
            return (
              <AnimatedSection key={system.label} delay={index * 0.08} className="h-full">
                <Card interactive className="group flex h-full flex-col p-5">
                  {/* Title + icon in same row */}
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {system.label}
                    </h3>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-muted transition-colors duration-200 group-hover:border-border-strong group-hover:text-foreground">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mt-5 flex-1">
                    <p className="text-sm leading-relaxed text-muted">
                      {system.summary}
                    </p>
                  </div>

                  {/* Tech chips */}
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                    {chips.map(chip => (
                      <span
                        key={chip}
                        className="inline-block rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide text-subtle"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default DeliverySystems
