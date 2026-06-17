import type { QuizCategory } from "./types";

export const quizCategories: QuizCategory[] = [
  {
    slug: "introduction",
    title: "Bases de Claude Code",
    icon: "Sparkles",
    description: "Définition, boucle agentique, interfaces disponibles.",
  },
  {
    slug: "installation",
    title: "Installation & prise en main",
    icon: "Terminal",
    description: "Installation, modes de lancement, structure de projet.",
  },
  {
    slug: "cli-repl",
    title: "CLI, REPL & commandes slash",
    icon: "SquareTerminal",
    description: "Commandes intégrées, gestion du contexte, raccourcis.",
  },
  {
    slug: "claude-md-memoire",
    title: "CLAUDE.md & mémoire",
    icon: "BookOpen",
    description: "Contexte persistant, hiérarchie de mémoire, bonnes pratiques.",
  },
  {
    slug: "outils",
    title: "Outils intégrés",
    icon: "Wrench",
    description: "Read, Edit, Write, Glob, Grep, Bash...",
  },
  {
    slug: "permissions",
    title: "Permissions & sécurité",
    icon: "ShieldCheck",
    description: "Modes de permission, settings.json, sandboxing.",
  },
  {
    slug: "skills",
    title: "Skills",
    icon: "GraduationCap",
    description: "Capacités modulaires chargées à la demande.",
  },
  {
    slug: "mcp",
    title: "MCP — Model Context Protocol",
    icon: "Plug",
    description: "Connexion à des outils et données externes.",
  },
  {
    slug: "agents",
    title: "Agents & sous-agents",
    icon: "Bot",
    description: "Délégation, isolation, prompts de sous-agents.",
  },
  {
    slug: "hooks",
    title: "Hooks",
    icon: "Webhook",
    description: "Automatisation déterministe du cycle de vie de l'agent.",
  },
  {
    slug: "plan-mode",
    title: "Plan Mode & workflow",
    icon: "ListChecks",
    description: "Concevoir avant d'exécuter, cycle explorer/planifier/exécuter.",
  },
  {
    slug: "bonnes-pratiques",
    title: "Bonnes pratiques avancées",
    icon: "Rocket",
    description: "Git, revue de code, CI/CD, habitudes d'expert.",
  },
];
