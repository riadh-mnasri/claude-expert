export type FicheCategory = "cli" | "config" | "architecture" | "workflow";

export interface FicheEntry {
  term: string;
  desc: string;
}

export interface Fiche {
  slug: string;
  title: string;
  icon: string;
  category: FicheCategory;
  categoryLabel: string;
  entries: FicheEntry[];
  code?: string;
}

export type ImpactLevel = "majeur" | "important" | "mineur";
export type UpdateType = "Modèle" | "Claude Code" | "API" | "Plateforme";

export interface Nouveaute {
  id: string;
  period: string;
  title: string;
  type: UpdateType;
  impact: ImpactLevel;
  highlights: string[];
}

export const fiches: Fiche[] = [
  {
    slug: "commandes-slash",
    title: "Commandes slash",
    icon: "Terminal",
    category: "cli",
    categoryLabel: "CLI",
    entries: [
      { term: "/help", desc: "Liste toutes les commandes disponibles" },
      { term: "/clear", desc: "Vide l'historique (contexte repart à zéro)" },
      { term: "/compact", desc: "Résume la conversation pour libérer du contexte" },
      { term: "/init", desc: "Génère un CLAUDE.md en analysant le repo" },
      { term: "/review", desc: "Lance une revue de code sur le diff courant" },
      { term: "/config", desc: "Configuration (modèle, thème, auto-updates…)" },
      { term: "/cost", desc: "Affiche le coût et les tokens consommés" },
      { term: "/memory", desc: "Édite directement la mémoire (CLAUDE.md)" },
      { term: "/resume", desc: "Choisit une session précédente à reprendre" },
      { term: "/permissions", desc: "Affiche et modifie les règles de permission" },
      { term: "/fast", desc: "Active Fast Mode (Opus, output accéléré)" },
    ],
  },
  {
    slug: "raccourcis-clavier",
    title: "Raccourcis clavier",
    icon: "Keyboard",
    category: "cli",
    categoryLabel: "CLI",
    entries: [
      { term: "Shift+Tab", desc: "Bascule : Normal → Auto-accept → Plan Mode" },
      { term: "Échap", desc: "Interrompt une action en cours" },
      { term: "↑ / ↓", desc: "Navigue dans l'historique des messages" },
      { term: "Ctrl+C × 2", desc: "Quitte la session" },
      { term: "!commande", desc: "Exécute une commande shell directement" },
      { term: "#instruction", desc: "Ajoute une règle rapide à la mémoire" },
    ],
  },
  {
    slug: "modes-lancement",
    title: "Modes de lancement",
    icon: "Play",
    category: "cli",
    categoryLabel: "CLI",
    entries: [
      { term: "claude", desc: "Mode interactif (REPL) — le plus courant" },
      { term: 'claude "tâche"', desc: "Démarre directement avec une instruction" },
      { term: 'claude -p "tâche"', desc: "Print mode : non-interactif, pour CI/scripts" },
      { term: "claude --continue", desc: "Reprend la dernière conversation" },
      { term: "claude --resume", desc: "Choisit une session précédente" },
      { term: "claude mcp add nom", desc: "Ajoute un serveur MCP au projet" },
      { term: "claude mcp list", desc: "Liste les serveurs MCP configurés" },
    ],
  },
  {
    slug: "claude-md-structure",
    title: "Structure CLAUDE.md",
    icon: "FileText",
    category: "config",
    categoryLabel: "Configuration",
    entries: [
      { term: "## Commandes", desc: "Build, test, lint, déploiement — ce que vous tapez souvent" },
      { term: "## Conventions", desc: "Règles de code spécifiques au projet" },
      { term: "## Architecture", desc: "Structure des dossiers, décisions techniques" },
      { term: "## Pièges connus", desc: "Comportements contre-intuitifs, gotchas" },
      { term: "CLAUDE.local.md", desc: "Version locale non commitée (gitignorée)" },
      { term: "~/.claude/CLAUDE.md", desc: "Mémoire utilisateur valide sur tous vos projets" },
    ],
    code: `# CLAUDE.md
## Commandes
- Build : \`npm run build\`
- Test : \`npm test -- --watch=false\`
- Lint : \`npm run lint\`

## Conventions
- Composants serveur par défaut.
- Ne jamais modifier les fichiers legacy/.

## Pièges connus
- PostToolUse attend la fin de l'outil
  avant de se déclencher.`,
  },
  {
    slug: "permissions-settings",
    title: "Permissions & settings.json",
    icon: "ShieldCheck",
    category: "config",
    categoryLabel: "Configuration",
    entries: [
      { term: "allow", desc: "Commandes autorisées sans confirmation" },
      { term: "deny", desc: "Commandes bloquées avant toute décision du modèle" },
      { term: "Bash(pattern*)", desc: "Wildcards supportés pour les commandes shell" },
      { term: "Read(path)", desc: "Contrôle l'accès en lecture à des fichiers" },
      { term: "settings.json", desc: "Partagé via git — règles équipe" },
      { term: "settings.local.json", desc: "Gitignored — règles personnelles" },
    ],
    code: `// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(git status)",
      "Read(*)"
    ],
    "deny": [
      "Bash(git push --force*)",
      "Bash(rm -rf*)",
      "Read(./.env)"
    ]
  }
}`,
  },
  {
    slug: "hooks-env-vars",
    title: "Variables d'env. des Hooks",
    icon: "Variable",
    category: "config",
    categoryLabel: "Configuration",
    entries: [
      { term: "CLAUDE_TOOL_NAME", desc: "Nom de l'outil en cours (ex : Edit, Bash)" },
      { term: "CLAUDE_TOOL_INPUT", desc: "Paramètres JSON de l'appel d'outil" },
      { term: "CLAUDE_FILE_PATHS", desc: "Chemins des fichiers concernés (Edit/Write)" },
      { term: "CLAUDE_SESSION_ID", desc: "Identifiant unique de la session" },
      { term: "CLAUDE_TOOL_RESULT", desc: "Résultat de l'outil (PostToolUse uniquement)" },
    ],
  },
  {
    slug: "hooks-evenements",
    title: "Hooks — Événements",
    icon: "Webhook",
    category: "architecture",
    categoryLabel: "Architecture",
    entries: [
      { term: "PreToolUse", desc: "Avant un outil — peut bloquer (exit non-nul)" },
      { term: "PostToolUse", desc: "Après un outil — peut réagir au résultat" },
      { term: "UserPromptSubmit", desc: "Quand l'utilisateur envoie un message" },
      { term: "SessionStart", desc: "Au démarrage d'une session" },
      { term: "SessionEnd", desc: "À la fin d'une session" },
      { term: "Stop", desc: "Quand l'agent termine sa réponse" },
    ],
    code: `// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write \\"$CLAUDE_FILE_PATHS\\""
      }]
    }]
  }
}`,
  },
  {
    slug: "mcp-config",
    title: "MCP — Configuration",
    icon: "Plug",
    category: "architecture",
    categoryLabel: "Architecture",
    entries: [
      { term: "Tools", desc: "Fonctions appelables avec effets de bord" },
      { term: "Resources", desc: "Données lisibles (fichiers, enregistrements)" },
      { term: "Prompts", desc: "Templates réutilisables fournis par le serveur" },
      { term: "stdio (local)", desc: "Process local lancé par command + args" },
      { term: "HTTP/SSE (distant)", desc: "Serveur hébergé, accessible par URL" },
      { term: "mcp__nom__outil", desc: "Format du nom d'outil MCP dans Claude Code" },
    ],
    code: `// .mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "$GITHUB_TOKEN" }
    },
    "api-remote": {
      "url": "https://api.example.com/mcp",
      "headers": { "Authorization": "Bearer $TOKEN" }
    }
  }
}`,
  },
  {
    slug: "agents-definition",
    title: "Agents — Définition",
    icon: "Bot",
    category: "architecture",
    categoryLabel: "Architecture",
    entries: [
      { term: "name", desc: "Identifiant pour invoquer l'agent" },
      { term: "description", desc: "Quand utiliser cet agent (déclencheur)" },
      { term: "tools", desc: "Outils autorisés (sous-ensemble limité)" },
      { term: "model: inherit", desc: "Hérite du modèle parent (recommandé)" },
      { term: "run_in_background", desc: "Exécution parallèle si résultat non bloquant" },
      { term: "isolation: worktree", desc: "Travaille sur une copie git isolée" },
    ],
    code: `---
name: code-reviewer
description: Relit un diff pour détecter bugs
  et failles de sécurité.
tools: Read, Grep, Glob, Bash
model: inherit
---
Pour chaque diff, identifie :
1. Les bugs et cas limites non gérés.
2. Les failles (XSS, injection, secrets).`,
  },
  {
    slug: "skills-definition",
    title: "Skills — Définition",
    icon: "GraduationCap",
    category: "architecture",
    categoryLabel: "Architecture",
    entries: [
      { term: "name", desc: "Identifiant de la Skill" },
      { term: "description", desc: "Mots-clés de déclenchement" },
      { term: ".claude/skills/nom/", desc: "Dossier contenant SKILL.md + ressources" },
      { term: "Chargement dynamique", desc: "Chargée seulement si pertinente pour la tâche" },
      { term: "vs Agent", desc: "Skill = instructions ; Agent = instance autonome" },
    ],
    code: `---
name: deploy-staging
description: Déploie l'app sur staging après
  vérification des tests et de la config.
---
1. Vérifie que tous les tests passent.
2. Contrôle les variables d'env requises.
3. Lance le déploiement, rapporte l'URL.`,
  },
  {
    slug: "plan-mode-cycle",
    title: "Cycle Plan Mode",
    icon: "ListChecks",
    category: "workflow",
    categoryLabel: "Workflow",
    entries: [
      { term: "1. Explorer", desc: "Lire le code ou déléguer à un sous-agent Explore" },
      { term: "2. Planifier", desc: "Shift+Tab → Plan Mode : propose un plan sans modifier" },
      { term: "3. Valider", desc: "Challenger le plan, ajuster, puis approuver" },
      { term: "4. Exécuter", desc: "ExitPlanMode → implémentation étape par étape" },
      { term: "5. Vérifier", desc: "Tests + diff + UI dans un vrai navigateur" },
      { term: "Quand l'utiliser", desc: "Migrations, refactors multi-fichiers, changements critiques" },
    ],
  },
  {
    slug: "git-workflow",
    title: "Git avec Claude Code",
    icon: "GitBranch",
    category: "workflow",
    categoryLabel: "Workflow",
    entries: [
      { term: "Nouveaux commits", desc: "Toujours créer un nouveau commit, jamais --amend sauf demande" },
      { term: "Message de commit", desc: "Basé sur git diff réel, pas sur des suppositions" },
      { term: "Force push interdit", desc: "Jamais sur main sans autorisation explicite" },
      { term: "Staging ciblé", desc: "Ajouter les fichiers un par un, jamais git add -A" },
      { term: "--no-verify interdit", desc: "Ne pas bypasser les hooks : chercher la cause racine" },
      { term: "PR summary", desc: "Résume TOUS les commits du diff, pas seulement le dernier" },
    ],
  },
];

export const nouveautes: Nouveaute[] = [
  {
    id: "fable-5",
    period: "Juin 2026",
    title: "Claude Fable 5",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Nouveau modèle de pointe d'Anthropic — ID : claude-fable-5",
      "Le modèle le plus récent de la gamme, succède à la famille Claude 4.x",
    ],
  },
  {
    id: "claude-4-family",
    period: "2025",
    title: "Famille Claude 4",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Opus 4.8 : le plus puissant de la gamme (claude-opus-4-8)",
      "Sonnet 4.6 : équilibre performance/coût (claude-sonnet-4-6)",
      "Haiku 4.5 : le plus rapide et économique (claude-haiku-4-5-20251001)",
      "Remplacement complet de la famille Claude 3.x",
    ],
  },
  {
    id: "fast-mode",
    period: "2025",
    title: "Fast Mode",
    type: "Claude Code",
    impact: "important",
    highlights: [
      "Opus avec output accéléré — pas de downgrade vers un modèle plus petit",
      "Activé via /fast dans le REPL, disponible sur Opus 4.8/4.7/4.6",
    ],
  },
  {
    id: "routines-scheduled",
    period: "2025",
    title: "Agents planifiés (Routines)",
    type: "Claude Code",
    impact: "important",
    highlights: [
      "Tâches récurrentes exécutées dans le cloud avec cron standard (min. horaire)",
      "Outils : create_trigger, list_triggers, delete_trigger, fire_trigger",
      "Sessions fraîches (clean slate) ou persistantes selon le mode configuré",
      "Notifications push/email à la fin de chaque run",
    ],
  },
  {
    id: "autonomous-loops",
    period: "2025",
    title: "Boucles autonomes (/loop)",
    type: "Claude Code",
    impact: "important",
    highlights: [
      "/loop : exécute une tâche en boucle à cadence auto-définie par l'agent",
      "ScheduleWakeup pour se reprogrammer dynamiquement à la prochaine itération",
      "Cache chaud < 270 s, long repos ≥ 1 200 s pour les tâches lentes ou externes",
    ],
  },
  {
    id: "claude-code-remote",
    period: "2025",
    title: "Claude Code Remote",
    type: "Claude Code",
    impact: "important",
    highlights: [
      "Sessions Claude Code exécutées dans le cloud, persistantes entre déconnexions",
      "Environnements isolés (env_…) pour les agents distants",
      "Outils : list_environments, send_later — planification asynchrone",
    ],
  },
  {
    id: "memory-system",
    period: "2025",
    title: "Système de mémoire structurée",
    type: "Claude Code",
    impact: "important",
    highlights: [
      "Mémoire fichier (.md) gérée par l'agent entre les sessions",
      "Types : user (profil), feedback (corrections), project (contexte), reference (pointeurs)",
      "L'agent lit la mémoire pertinente et la met à jour quand des faits durables émergent",
    ],
  },
  {
    id: "mcp-remote",
    period: "2025",
    title: "Serveurs MCP distants (HTTP/SSE)",
    type: "API",
    impact: "important",
    highlights: [
      "Les serveurs MCP peuvent être hébergés en remote, plus seulement en stdio local",
      "Configuration via URL + headers d'autorisation dans .mcp.json",
      "Standard ouvert : compatibilité cross-clients (Claude Code, Desktop, outils tiers)",
    ],
  },
  {
    id: "vercel-ai-gateway",
    period: "Août 2025",
    title: "Vercel AI Gateway",
    type: "Plateforme",
    impact: "important",
    highlights: [
      "API unifiée pour accéder à plusieurs providers IA avec observabilité intégrée",
      "Fallback automatique de modèle, zéro rétention de données",
      'Usage via AI SDK : chaînes "provider/model" sans packages dédiés par provider',
    ],
  },
  {
    id: "fluid-compute",
    period: "2025",
    title: "Fluid Compute (Vercel)",
    type: "Plateforme",
    impact: "important",
    highlights: [
      "Remplace les Edge Functions comme paradigme par défaut sur Vercel",
      "Node.js complet, réutilisation des instances entre requêtes concurrentes",
      "Même tarification que les Edge Functions, sans leurs limitations runtime",
    ],
  },
  {
    id: "hook-userpromptsubmit",
    period: "2025",
    title: "Nouveau hook : UserPromptSubmit",
    type: "Claude Code",
    impact: "mineur",
    highlights: [
      "Se déclenche quand l'utilisateur envoie un message au REPL",
      "Permet d'intercepter ou d'enrichir les prompts avant traitement par le modèle",
      "Complète PreToolUse/PostToolUse pour des contrôles plus en amont",
    ],
  },
];
