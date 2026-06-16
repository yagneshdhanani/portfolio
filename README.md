<div align="center">

# Yagnesh Dhanani — Portfolio

**Senior Software Engineer · Backend · Full-Stack · Cloud**

[![Live Site](https://img.shields.io/badge/Live%20Site-yagneshdhanani.com-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://yagneshdhanani.vercel.app)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✨ Overview

Personal portfolio built with **React + Vite**, featuring a monochrome design system with light/dark mode, fluid animations, and a fully content-driven architecture — all personal details live in one config file.

---

## 🖥️ Preview

👉 **[yagneshdhanani.vercel.app](https://yagneshdhanani.vercel.app)**

---

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Archivo · Space Grotesk · JetBrains Mono |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Header, Footer
│   ├── sections/       # Hero, About, Experience, Projects, Contact, Skills
│   └── ui/             # Card, ActivityChart, CvPreviewModal, SkillChip, …
├── content/
│   ├── site.config.js  # ← all personal data lives here
│   └── projects.json   # ← project cards
├── hooks/              # useTheme, useInView, useCountUp, useScrollHeader
└── index.css           # design tokens + global styles
```

---

## ⚙️ Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone
git clone https://github.com/yagneshdhanani/portfolio.git
cd portfolio

# Install
npm install

# Dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## 🛠️ Customization

All content is driven from two files — no component hunting needed.

### Personal details, bio, experience, skills

Edit [`src/content/site.config.js`](src/content/site.config.js):

```js
export const OWNER = {
  name: 'Your Name',
  email: 'you@email.com',
  role: 'Your Role',
}
```

### Projects

Edit [`src/content/projects.json`](src/content/projects.json) — add a `github` and `live` URL to enable the link buttons on each card:

```json
{
  "slug": "my-project",
  "name": "My Project",
  "github": "https://github.com/you/my-project",
  "live": "https://my-project.com"
}
```

### Resume / CV

Drop your PDF into `/public/assets/resume.pdf` — the Download CV button and modal pick it up automatically.

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint errors |

---

## 🌐 Deployment

Deployed on **Vercel** with automatic deploys on every push to `main`.

```bash
# One-time setup
npm i -g vercel
vercel login
vercel --prod
```

A `vercel.json` at the root handles SPA routing — all paths rewrite to `index.html`.

---

## 📄 License

MIT — feel free to use this as a starting point for your own portfolio. A credit or star is appreciated but not required. 🙂

---

<div align="center">

**[yagneshdhanani.com](https://yagneshdhanani.vercel.app)** · [GitHub](https://github.com/yagneshdhanani) · [LinkedIn](https://linkedin.com/in/yagneshdhanani/) · [Twitter](https://twitter.com/yagneshdhanani)

</div>
