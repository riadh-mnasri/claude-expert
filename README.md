# Claude Expert

A polished, content-rich learning platform to go from zero to expert on **Claude Code** — Anthropic's agentic coding CLI. Built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

An independent training published by **WeHighTech** — not affiliated with, sponsored by, or endorsed by Anthropic. "Claude" and "Claude Code" are trademarks of Anthropic, PBC.

> 🇫🇷 All learning content (modules, quiz questions, UI copy) is written in French.

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Content model](#content-model)
- [Learning modules](#learning-modules)
- [Quiz categories](#quiz-categories)
- [Progress tracking](#progress-tracking)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Adding content](#adding-content)
- [Deployment](#deployment)
- [License](#license)

## Overview

The site has three main sections:

- **Apprendre** (`/apprendre`) — 12 ordered modules covering everything from first launch to advanced mechanics: CLI & REPL, `CLAUDE.md` & memory, built-in tools, permissions & security, Skills, MCP (Model Context Protocol), Agents & sub-agents, Hooks, Plan Mode, and advanced best practices. Each module page renders markdown sections with a sticky table of contents, prev/next navigation, and a "mark as read" action.
- **Quiz** (`/quiz`) — 144 multiple-choice questions (12 per category, across 12 categories), each with the correct answer and a detailed explanation. Includes a full "exam mode" mixing every question, immediate per-question feedback, a final score/review screen, and per-category progress badges.
- **Progression** (`/progression`) — a personal dashboard aggregating modules read and quiz scores per category, so learners can see at a glance what's left to cover and where they're weakest.

All progress is tracked client-side via `localStorage` — there is no backend, account system, or database.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, static generation for all content routes)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with the `@tailwindcss/typography` plugin
- [shadcn/ui](https://ui.shadcn.com) (`base-nova` style, built on [Base UI](https://base-ui.com))
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [react-markdown](https://github.com/remarkjs/react-markdown) + `remark-gfm` + `rehype-highlight` for rendering lesson content
- [lucide-react](https://lucide.dev) for icons
- [sonner](https://sonner.emilkowal.ski) for toast notifications

## Project structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout (theme provider, header, footer)
│   ├── apprendre/
│   │   ├── page.tsx               # Module list
│   │   └── [slug]/page.tsx        # Module detail (markdown content, TOC, prev/next)
│   ├── quiz/
│   │   ├── page.tsx               # Quiz hub (categories + full exam entry point)
│   │   └── [category]/page.tsx    # Quiz runner page for a category or "examen"
│   └── progression/
│       └── page.tsx               # Personal progress dashboard
├── components/
│   ├── ui/                        # shadcn/ui primitives (button, card, dialog, sheet, tabs, ...)
│   ├── quiz/                      # QuizRunner (client component) + per-category progress badge
│   ├── progress-dashboard.tsx     # Aggregates module/quiz progress for /progression
│   ├── mark-module-read.tsx       # Client button that records a module as read
│   ├── markdown-content.tsx       # react-markdown wrapper (remark-gfm, rehype-highlight)
│   ├── dynamic-icon.tsx           # Resolves a lucide icon by name (used for modules/categories)
│   ├── level-badge.tsx            # Débutant / Intermédiaire / Avancé badge
│   ├── site-header.tsx, site-footer.tsx, theme-toggle.tsx, theme-provider.tsx
├── lib/
│   ├── types.ts                   # Shared content types (Module, QuizQuestion, QuizCategory, ...)
│   ├── modules.ts                 # All 12 learning modules (markdown sections)
│   ├── quiz-categories.ts         # Quiz category metadata (slug, title, icon, description)
│   ├── quiz/*.ts                  # Question bank, one file per category
│   ├── quiz-data.ts               # Aggregates the full question bank + lookup helpers
│   ├── progress-storage.ts        # localStorage read/write helpers (SSR-safe snapshots)
│   └── utils.ts                   # `cn()` class merge helper
```

All educational content (modules and quiz questions) is plain TypeScript data — no CMS, no database. Adding a module or a question is just adding an entry to the corresponding file in `src/lib`.

## Content model

- **Modules** (`src/lib/modules.ts`): each module has a `slug`, `order`, `title`, `icon` (lucide icon name), `level` (`Débutant` | `Intermédiaire` | `Avancé`), `summary`, `duration` (estimated reading time), an array of `sections` (`{ heading, body }`, `body` is markdown), and a list of `keyTakeaways`. `getModuleBySlug` and `getAdjacentModules` provide lookups and prev/next navigation.
- **Quiz questions** (`src/lib/quiz/*.ts`): each question has an `id`, `categorySlug`, `question` text, an array of `options`, the `answerIndex` of the correct option, a `difficulty` (`Facile` | `Moyen` | `Difficile`), and an `explanation` shown after answering. `src/lib/quiz-data.ts` aggregates every category into a single exported array and exposes helpers (`getQuestionsByCategory`, `getQuestionCountByCategory`).
- **Quiz categories** (`src/lib/quiz-categories.ts`): metadata (`slug`, `title`, `icon`, `description`) used to render the quiz hub and link each category to its question bank.

## Learning modules

| # | Module | Slug |
|---|---|---|
| 1 | Qu'est-ce que Claude Code ? | `introduction` |
| 2 | Installation & prise en main | `installation` |
| 3 | CLI, REPL & commandes slash | `cli-repl` |
| 4 | CLAUDE.md & mémoire | `claude-md-memoire` |
| 5 | Outils intégrés | `outils` |
| 6 | Permissions & sécurité | `permissions` |
| 7 | Skills | `skills` |
| 8 | MCP — Model Context Protocol | `mcp` |
| 9 | Agents & sous-agents | `agents` |
| 10 | Hooks | `hooks` |
| 11 | Plan Mode & workflow | `plan-mode` |
| 12 | Bonnes pratiques & workflow avancé | `bonnes-pratiques` |

## Quiz categories

Each of the 12 categories above has a matching quiz bank of 12 questions (144 total), plus a combined "examen" mode that draws from every category.

## Progress tracking

Progress lives entirely in the browser (`src/lib/progress-storage.ts`):

- `claude-expert-modules-read` — the set of module slugs the learner has marked as read.
- `claude-expert-quiz-progress` — the latest `{ score, total, date }` per quiz category.

Reads use `useSyncExternalStore`-compatible cached snapshots so the UI stays consistent during SSR and hydration. The `/progression` dashboard (`ProgressDashboard` component) reads both keys to show overall completion, per-module status, and per-category quiz scores. There's no sync across devices or browsers — clearing site data resets progress.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build (also type-checks and statically generates every module/quiz page) |
| `npm run start` | Start the production server after a build |
| `npm run lint` | Run ESLint |

## Adding content

**A new learning module**

1. Add an entry to the array in `src/lib/modules.ts` with a unique `slug` and the next `order`.
2. Pick a [lucide](https://lucide.dev) icon name for `icon` — it's resolved at runtime by `src/components/dynamic-icon.tsx`.
3. Write `sections` as markdown strings and a short `keyTakeaways` list.
4. The module list, detail page, sticky TOC, and prev/next links update automatically — no routing changes needed.

**A new quiz question**

1. Add an entry to the relevant file in `src/lib/quiz/` (or create a new category file + register it in `src/lib/quiz-categories.ts` and `src/lib/quiz-data.ts` for a brand-new category).
2. Give it a unique `id`, the right `categorySlug`, 4 `options`, the correct `answerIndex`, a `difficulty`, and an `explanation`.
3. The quiz hub, category runner, and exam mode all pull from `quiz-data.ts`, so no other wiring is required.

## Deployment

This is a standard Next.js app and deploys cleanly to [Vercel](https://vercel.com/new):

```bash
vercel deploy        # preview
vercel deploy --prod # production
```

It can also be self-hosted with `npm run build && npm run start` on any Node.js host.

## License

This project is provided for personal learning purposes.

© 2026 WeHighTech — Riadh MNASRI. All rights reserved.
