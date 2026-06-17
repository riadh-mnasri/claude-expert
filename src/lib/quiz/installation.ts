import type { QuizQuestion } from "../types";

export const installationQuestions: QuizQuestion[] = [
  {
    id: "install-1",
    categorySlug: "installation",
    question: "Quelle commande installe Claude Code globalement ?",
    options: [
      "npm install claude-code",
      "npm install -g @anthropic-ai/claude-code",
      "pip install claude-code",
      "brew install claude",
    ],
    answerIndex: 1,
    explanation: "Claude Code s'installe via npm avec le paquet @anthropic-ai/claude-code en global.",
    difficulty: "Facile",
  },
  {
    id: "install-2",
    categorySlug: "installation",
    question: "Quelle commande lance Claude Code en mode non-interactif, idéal pour les scripts/CI ?",
    options: ["claude --silent", "claude -p \"tâche\"", "claude --batch", "claude --headless"],
    answerIndex: 1,
    explanation:
      "Le mode print (-p) exécute la tâche et retourne le résultat sans ouvrir de session interactive, ce qui convient à l'automatisation.",
    difficulty: "Moyen",
  },
  {
    id: "install-3",
    categorySlug: "installation",
    question: "Quelle option permet de reprendre la toute dernière session de conversation ?",
    options: ["claude --resume", "claude --continue", "claude --last", "claude --history"],
    answerIndex: 1,
    explanation:
      "--continue reprend automatiquement la dernière conversation, tandis que --resume permet de choisir parmi plusieurs sessions précédentes.",
    difficulty: "Moyen",
  },
  {
    id: "install-4",
    categorySlug: "installation",
    question: "Où se trouvent typiquement les commandes slash personnalisées d'un projet ?",
    options: [".claude/commands/", ".claude/skills/", ".claude/agents/", ".github/commands/"],
    answerIndex: 0,
    explanation: "Les commandes slash personnalisées sont des fichiers Markdown dans .claude/commands/.",
    difficulty: "Facile",
  },
  {
    id: "install-5",
    categorySlug: "installation",
    question: "Quel fichier ne doit en principe PAS être commité dans git ?",
    options: [
      "CLAUDE.md",
      ".claude/settings.json",
      ".claude/settings.local.json",
      ".claude/agents/code-reviewer.md",
    ],
    answerIndex: 2,
    explanation:
      "settings.local.json contient des préférences personnelles locales et est gitignored, contrairement à settings.json qui est partagé avec l'équipe.",
    difficulty: "Moyen",
  },
  {
    id: "install-6",
    categorySlug: "installation",
    question: "Que faut-il faire au tout premier lancement de `claude` ?",
    options: [
      "Configurer un fichier CLAUDE.md obligatoire",
      "S'authentifier (compte Claude.ai, Console, ou clé API)",
      "Créer un sous-agent par défaut",
      "Désactiver tous les hooks",
    ],
    answerIndex: 1,
    explanation:
      "Une authentification est requise au premier lancement avant de pouvoir utiliser le REPL interactif.",
    difficulty: "Facile",
  },
  {
    id: "install-7",
    categorySlug: "installation",
    question: "Quelle est la prérequis technique principal pour installer Claude Code ?",
    options: ["Docker", "Node.js", "Python 3.10+", "Une base de données PostgreSQL"],
    answerIndex: 1,
    explanation: "Claude Code s'installe via npm, ce qui nécessite Node.js sur la machine.",
    difficulty: "Facile",
  },
  {
    id: "install-8",
    categorySlug: "installation",
    question:
      "Vous voulez démarrer une session avec une instruction déjà prête. Quelle syntaxe utiliser ?",
    options: ["claude --task \"...\"", "claude \"corrige ce bug\"", "claude run \"...\"", "claude exec \"...\""],
    answerIndex: 1,
    explanation: "On peut passer l'instruction directement en argument : `claude \"corrige ce bug\"`.",
    difficulty: "Facile",
  },
  {
    id: "install-9",
    categorySlug: "installation",
    question: "Quel dossier regroupe en général les définitions de sous-agents d'un projet ?",
    options: [".claude/agents/", ".claude/subagents/", ".claude/bots/", ".claude/tasks/"],
    answerIndex: 0,
    explanation: "Les sous-agents se définissent comme fichiers Markdown dans .claude/agents/.",
    difficulty: "Facile",
  },
  {
    id: "install-10",
    categorySlug: "installation",
    question: "Quel fichier sert de point d'entrée de configuration partagée d'équipe pour Claude Code ?",
    options: [".claude/settings.local.json", ".claude/settings.json", ".env", "claude.config.js"],
    answerIndex: 1,
    explanation:
      "settings.json (commité) contient la configuration partagée par l'équipe, contrairement à settings.local.json (personnel, gitignored).",
    difficulty: "Moyen",
  },
  {
    id: "install-11",
    categorySlug: "installation",
    question: "Aucun des fichiers .claude/ ou CLAUDE.md n'est présent dans un projet. Que se passe-t-il si vous lancez `claude` ?",
    options: [
      "Claude Code refuse de démarrer",
      "Claude Code démarre normalement, sans configuration personnalisée",
      "Claude Code crée automatiquement tous les fichiers de config avant de démarrer",
      "Une erreur fatale est levée",
    ],
    answerIndex: 1,
    explanation:
      "Aucun de ces fichiers n'est obligatoire : Claude Code fonctionne dès la première commande, la configuration projet est facultative et progressive.",
    difficulty: "Moyen",
  },
  {
    id: "install-12",
    categorySlug: "installation",
    question: "Quelle commande slash génère un CLAUDE.md initial en analysant le repo ?",
    options: ["/setup", "/init", "/bootstrap", "/scan"],
    answerIndex: 1,
    explanation: "/init analyse automatiquement le repo (package.json, structure, README...) pour générer un premier CLAUDE.md.",
    difficulty: "Facile",
  },
];
