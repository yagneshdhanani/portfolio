import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, FileText, Github, Linkedin } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import { SkillChip } from "../ui/SkillChip";
import { CvPreviewModal } from "../ui/CvPreviewModal";
import { RoleTitle } from "./RoleTitle";
import { SKILL_ICONS } from "../ui/TechIcons";
import projects from "../../content/projects.json";
import {
  OWNER,
  SOCIALS as SOCIAL_LINKS,
  TOP_SKILLS,
  BIO,
} from "../../content/site.config";

const SOCIALS = [
  { name: "GitHub", icon: Github, href: SOCIAL_LINKS.github },
  { name: "LinkedIn", icon: Linkedin, href: SOCIAL_LINKS.linkedin },
];

const ROUTE_NODES = [
  { x: 30, y: 155 },
  { x: 210, y: 155 },
  { x: 292, y: 96 },
  { x: 425, y: 96 },
  { x: 507, y: 48 },
  { x: 730, y: 48 },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

function ProjectSnapshot({ featuredProject, projectCount, categoryCount }) {
  if (!featuredProject) return null;

  return (
    <motion.aside
      variants={item}
      className="hero-snapshot"
      aria-label="Project dashboard snapshot"
    >
      <span className="hero-snapshot-frame" aria-hidden="true" />
      <span
        className="hero-snapshot-signal hero-snapshot-signal-a"
        aria-hidden="true"
      />
      <span
        className="hero-snapshot-signal hero-snapshot-signal-b"
        aria-hidden="true"
      />
      <div className="rounded-xl border border-border bg-surface/85 p-5 shadow-(--shadow-panel) backdrop-blur-md">
        <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
              Featured build
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
              {featuredProject.name}
            </h2>
          </div>
          <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted">
            {featuredProject.category}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {featuredProject.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              Projects
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-foreground">
              {projectCount}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              Categories
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-foreground">
              {categoryCount}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-border bg-background p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            Stack source
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {featuredProject.tech.map((skill) => (
              <SkillChip key={skill}>{skill}</SkillChip>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export function Hero() {
  const [cvOpen, setCvOpen] = useState(false);
  const featuredProject = useMemo(
    () => projects.find((project) => project.featured) ?? projects[0],
    [],
  );
  const projectCategories = useMemo(
    () => [...new Set(projects.map((project) => project.category))],
    [],
  );

  return (
    <>
      <CvPreviewModal open={cvOpen} onClose={() => setCvOpen(false)} />
      <section
        id="home"
        aria-labelledby="home-heading"
        className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20"
      >
        {/* Theme-aware gradient — hero only. Built from theme tokens so it
          swaps automatically between light and dark, and fades to the page
          background at the bottom for a seamless hand-off to the next section. */}
        <div
          aria-hidden="true"
          className="hero-gradient-overlay pointer-events-none absolute inset-0"
        />

        <div aria-hidden="true" className="tech-world-backdrop">
          <div className="tech-world-dots">
            <span className="tech-dot-cluster tech-dot-americas" />
            <span className="tech-dot-cluster tech-dot-south-america" />
            <span className="tech-dot-cluster tech-dot-europe" />
            <span className="tech-dot-cluster tech-dot-asia" />
            <span className="tech-dot-cluster tech-dot-africa" />
            <span className="tech-dot-cluster tech-dot-australia" />
          </div>
          <svg
            className="tech-world-route"
            viewBox="0 0 760 260"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            role="presentation"
          >
            <path
              d="M30 155H210C244 155 254 96 292 96H425C463 96 469 48 507 48H730"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 12"
            />
            <path
              d="M210 155C258 216 338 225 418 202C496 180 555 134 612 137"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="1 10"
            />
            {ROUTE_NODES.map(({ x, y }) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r="5"
                fill="currentColor"
              />
            ))}
          </svg>
        </div>

        {/* Faint Swiss column grid — theme-aware, decorative */}
        <div
          aria-hidden="true"
          className="hero-column-grid pointer-events-none absolute inset-0 opacity-[0.5]"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-(--content-max-width)"
        >
          <div className="hero-layout-grid">
            <div className="hero-meta-wrapper col-span-full">
              {/* Meta rule */}
              <motion.div
                variants={item}
                className="hero-meta-rule flex items-center justify-between border-y border-border py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-subtle"
              >
                <span>Portfolio</span>
                <span className="hero-meta-mid">Backend · Web · Cloud</span>
                <span>{new Date().getFullYear()}</span>
              </motion.div>
            </div>

            <div className="hero-intro-content">
              {/* Status */}
              <motion.div variants={item} className="mt-8">
                <StatusBadge />
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="home-heading"
                variants={item}
                className="hero-headline mt-6 font-display font-extrabold tracking-tight text-foreground"
              >
                {OWNER.name.split(" ")[0]}
                <br />
                {OWNER.name.split(" ").slice(1).join(" ")}
              </motion.h1>

              {/* Role */}
              <RoleTitle />

              {/* Bio */}
              {BIO.map((line) => (
                <motion.p
                  key={line}
                  variants={item}
                  className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
                >
                  {line}
                </motion.p>
              ))}

              {/* Actions + Tech wrapped so tech row matches action buttons width */}
              <div className="mt-8 grid gap-8 sm:w-fit">
                <motion.div variants={item} className="hero-actions !mt-0">
                  <a
                    href="#projects"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-semibold text-background whitespace-nowrap transition-opacity duration-200 cursor-pointer hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    View My Work
                    <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    onClick={() => setCvOpen(true)}
                    className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 text-sm font-semibold text-foreground whitespace-nowrap transition-colors duration-200 hover:border-border-strong hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    View My CV
                    <FileText className="h-4 w-4" aria-hidden="true" />
                  </button>

                  {SOCIALS.map(({ name, icon: Icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="hero-social-link inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-surface text-sm font-semibold text-subtle transition-colors duration-150 cursor-pointer hover:border-border-strong hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      <span className="hero-social-name">{name}</span>
                    </a>
                  ))}
                </motion.div>

                {/* Tech */}
                <motion.div
                  variants={item}
                  className="grid grid-cols-3 gap-3 sm:flex sm:flex-nowrap sm:gap-8"
                >
                  {TOP_SKILLS.map((skill) => (
                    <SkillChip
                      key={skill}
                      icon={SKILL_ICONS[skill]}
                      aria-label={skill}
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="hero-snapshot-wrapper">
              <ProjectSnapshot
                featuredProject={featuredProject}
                projectCount={projects.length}
                categoryCount={projectCategories.length}
              />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Hero;
