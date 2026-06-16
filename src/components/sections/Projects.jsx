import React, { useEffect, useState } from 'react'
import { Github, ArrowUpRight, X } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionLabel } from '../ui/SectionLabel'
import { Card } from '../ui/Card'
import { SkillChip } from '../ui/SkillChip'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import projects from '../../content/projects.json'
import { cn } from '../../lib/cn'

const FILTERS = ['All', ...new Set(projects.map((project) => project.category))]
const PLACEHOLDER_LINKS = new Set(['https://github.com', 'https://example.com'])

function isUsableLink(href) {
  return Boolean(href) && !PLACEHOLDER_LINKS.has(href)
}

function ProjectLink({ href, label, children, variant = 'secondary' }) {
  const enabled = isUsableLink(href)
  const baseClass = cn(
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors duration-150',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    variant === 'primary'
      ? 'bg-foreground text-background hover:opacity-90'
      : 'border border-border bg-background text-foreground hover:border-border-strong hover:bg-surface-2',
  )

  if (!enabled) {
    return (
      <span
        className={cn(
          baseClass,
          'cursor-not-allowed opacity-45 grayscale',
        )}
        aria-disabled="true"
      >
        {children}
        <span className="sr-only">{label} unavailable</span>
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={baseClass}
    >
      {children}
    </a>
  )
}

function ProjectCard({ project, featured, onOpen }) {
  return (
    <Card
      as="button"
      type="button"
      interactive
      onClick={() => onOpen(project)}
      className="group flex h-full w-full appearance-none flex-col p-6 text-left active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Open ${project.name} project details`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {project.name}
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
          />
        </div>

        {featured ? (
          <span className="shrink-0 rounded-sm bg-foreground px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-background">
            Featured
          </span>
        ) : (
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-subtle">
            {project.category}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {/* Tech */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <SkillChip key={t}>{t}</SkillChip>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <span className="inline-flex items-center gap-2 rounded-md font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors duration-150 group-hover:text-foreground">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          Open case study
        </span>
      </div>
    </Card>
  )
}

function DetailList({ title, items }) {
  if (!items?.length) return null

  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className="mt-2 h-px w-3 shrink-0 bg-border-strong"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectDetailModal({ project, onClose }) {
  const dialogRef = useFocusTrap(!!project)

  useEffect(() => {
    if (!project) return undefined

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-80 flex items-end bg-background/70 p-4 backdrop-blur-md sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="max-h-[88vh] w-full max-w-245 overflow-y-auto rounded-xl border border-border bg-surface shadow-(--shadow-panel)"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-border bg-surface/95 px-5 py-4 backdrop-blur-md sm:px-7">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
              Project detail
            </p>
            <h3
              id="project-detail-title"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors duration-150 hover:border-border-strong hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-8 px-5 py-6 sm:px-7 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Card className="p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                  Problem
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.problem}
                </p>
              </Card>
              <Card className="p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                  Solution
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.solution}
                </p>
              </Card>
            </div>

            <Card className="p-5">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                Impact
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.impact}
              </p>
            </Card>

            <div className="grid gap-8 sm:grid-cols-2">
              <DetailList title="Features" items={project.features} />
              <DetailList title="Architecture" items={project.architecture} />
            </div>
          </div>

          <aside className="space-y-5">
            <Card className="p-5">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                Stack
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <SkillChip key={tech}>{tech}</SkillChip>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                Links
              </h4>
              <div className="mt-4 flex flex-col gap-3">
                <ProjectLink
                  href={project.github}
                  label={`${project.name} source on GitHub`}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Code
                </ProjectLink>
                <ProjectLink
                  href={project.live}
                  label={`${project.name} live demo`}
                  variant="primary"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  Live
                </ProjectLink>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

export function Projects({ limit, compact = false, showHeader = true }) {
  const [active, setActive] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active)
  const visible = typeof limit === 'number' ? filtered.slice(0, limit) : filtered

  return (
    <AnimatedSection>
      {showHeader ? (
        <>
          <SectionLabel>Projects</SectionLabel>
          <h2 id="projects-heading" className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {compact ? 'Featured builds' : 'Selected work'}
          </h2>
        </>
      ) : null}

      {/* Filter tabs */}
      {!compact ? (
        <div
          role="tablist"
          aria-label="Filter projects"
          className={cn('flex flex-wrap gap-2', showHeader && 'mt-8')}
        >
          {FILTERS.map((filter) => {
            const isActive = active === filter
            return (
              <button
                key={filter}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter)}
                className={cn(
                  'rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  isActive
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-surface text-muted hover:border-border-strong hover:text-foreground',
                )}
              >
                {filter}
              </button>
            )
          })}
        </div>
      ) : null}

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {visible.map((project, i) => (
          <AnimatedSection
            key={project.slug}
            delay={i * 0.06}
            className={cn('h-full', i === 0 && 'md:col-span-2')}
          >
            <ProjectCard
              project={project}
              featured={!!project.featured}
              onOpen={setSelectedProject}
            />
          </AnimatedSection>
        ))}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </AnimatedSection>
  )
}

export default Projects
