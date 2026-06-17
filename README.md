# Claude Expert

A polished, content-rich learning platform to go from zero to expert on **Claude Code** — Anthropic's agentic coding CLI. Built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

An independent training published by **WeHighTech** — not affiliated with, sponsored by, or endorsed by Anthropic. "Claude" and "Claude Code" are trademarks of Anthropic, PBC.

The site has two main sections:

- **Learn** (`/apprendre`) — 12 ordered modules covering everything from first launch to advanced mechanics: CLI & REPL, `CLAUDE.md` & memory, built-in tools, permissions & security, Skills, MCP (Model Context Protocol), Agents & sub-agents, Hooks, Plan Mode, and advanced best practices.
- **Quiz** (`/quiz`) — 144 multiple-choice questions (12 per category, across 12 categories), each with the correct answer and a detailed explanation. Includes a full "exam mode" mixing every question, immediate per-question feedback, a final score/review screen, and lightweight progress tracking via `localStorage`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, static generation for all content routes)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with the `@tailwindcss/typography` plugin
- [shadcn/ui](https://ui.shadcn.com) (`base-nova` style, built on [Base UI](https://base-ui.com))
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [react-markdown](https://github.com/remarkjs/react-markdown) + `remark-gfm` + `rehype-highlight` for rendering lesson content
- [lucide-react](https://lucide.dev) for icons

## Project structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── apprendre/
│   │   ├── page.tsx               # Module list
│   │   └── [slug]/page.tsx        # Module detail (markdown content, TOC, prev/next)
│   └── quiz/
│       ├── page.tsx               # Quiz hub (categories + full exam entry point)
│       └── [category]/page.tsx    # Quiz runner page for a category or "examen"
├── components/
│   ├── ui/                        # shadcn/ui primitives
│   ├── quiz/                      # QuizRunner (client component) + progress badge
│   ├── site-header.tsx, site-footer.tsx, theme-toggle.tsx, ...
├── lib/
│   ├── types.ts                   # Shared content types
│   ├── modules.ts                 # All 12 learning modules (markdown sections)
│   ├── quiz-categories.ts         # Quiz category metadata
│   ├── quiz/*.ts                  # Question bank, one file per category
│   └── quiz-data.ts                # Aggregates and exposes the full question bank
```

All educational content (modules and quiz questions) is plain TypeScript data — no CMS, no database. Adding a module or a question is just adding an entry to the corresponding file in `src/lib`.

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

## Content model

- **Modules** (`src/lib/modules.ts`): each module has an order, level, duration estimate, summary, an array of markdown sections, and a list of key takeaways. The module detail page renders this with a sticky table of contents and prev/next navigation.
- **Quiz questions** (`src/lib/quiz/*.ts`): each question has a category, the question text, an array of options, the index of the correct answer, a difficulty, and an explanation shown after answering. `src/lib/quiz-data.ts` aggregates every category into a single exported array and exposes helpers (`getQuestionsByCategory`, `getQuestionCountByCategory`).

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
