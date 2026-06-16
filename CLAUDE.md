# CLAUDE.md — YD Portfolio

## Design System

Always read `design-system/MASTER.md` before generating any UI code.
Check `design-system/pages/[page-name].md` for page-specific overrides.
If no page file exists, use MASTER.md exclusively.

## Stack

- Vanilla HTML + CSS (no Tailwind, no Bootstrap)
- Google Fonts: Inter (300–800) + JetBrains Mono (400, 500)
- Vanilla JS (script.js) — no frameworks

## Design Rules (Non-Negotiable)

- Dark theme only — base is #0a0a0f, never use white backgrounds
- Accent gradient: linear-gradient(135deg, #6366f1, #8b5cf6) — use on headings and CTAs
- All cards must use glass morphism: rgba(255,255,255,0.02) bg + blur(16px) + rgba(255,255,255,0.08) border
- NO emojis as icons — use SVG icons only (Heroicons or Lucide)
- NO inline styles — use CSS custom properties (--variable-name)
- Transitions: fast=150ms, base=250ms, slow=400ms — always use ease or cubic-bezier(0.4,0,0.2,1)

## Typography Rules

- Hero headline: Inter 800, font-size clamp(3rem, 6vw, 3.75rem)
- Section titles: Inter 700, gradient text via background-clip
- Body text: Inter 400, color: var(--text-secondary)
- Code snippets: JetBrains Mono 400

## Color Tokens (Always use these variables)

--bg-primary: #0a0a0f
--bg-secondary: #111118
--bg-tertiary: #1a1a24
--bg-elevated: #22222e
--text-primary: #f0f0f5
--text-secondary: #a0a0b0
--text-muted: #6b6b7a
--text-accent: #8b9eff
--accent-primary: #6366f1
--accent-secondary: #8b5cf6
--border-subtle: rgba(255,255,255,0.06)
--border-default: rgba(255,255,255,0.1)
--border-hover: rgba(255,255,255,0.15)
--border-accent: rgba(99,102,241,0.3)
--shadow-glow: 0 0 30px rgba(99,102,241,0.2)

## Pre-Delivery Checklist (Run Before Every Response)

- [ ] cursor-pointer on all interactive elements
- [ ] Hover states with transitions on all buttons and cards
- [ ] Card hover: translateY(-4px) + border → --border-accent + shadow-glow appears
- [ ] Focus states visible (outline: 2px solid var(--accent-primary))
- [ ] Text contrast minimum 4.5:1 on dark backgrounds
- [ ] prefers-reduced-motion: wrap all animations in @media
- [ ] Responsive at 480px and 768px breakpoints
- [ ] No hardcoded hex colors — use CSS variables only
- [ ] Sticky header: backdrop-filter blur(16px) on scroll, hides on scroll-down
- [ ] All section entries use IntersectionObserver + slideUp/fadeIn animations
