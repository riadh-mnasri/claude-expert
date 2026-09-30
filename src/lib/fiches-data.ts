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
      { term: "/effort", desc: "Règle le niveau d'effort, Ultracode inclus (Tab pour basculer)" },
      { term: "/doctor prompt-audit", desc: "Audite les fichiers CLAUDE.md et les skills" },
      { term: "/mcp reconnect all", desc: "Relance tous les serveurs MCP en échec" },
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
      { term: "claude", desc: "Mode interactif (REPL) : le plus courant" },
      { term: 'claude "tâche"', desc: "Démarre directement avec une instruction" },
      { term: 'claude -p "tâche"', desc: "Print mode : non-interactif, pour CI/scripts" },
      { term: "claude --continue", desc: "Reprend la dernière conversation" },
      { term: "claude --resume", desc: "Choisit une session précédente" },
      { term: "claude mcp add nom", desc: "Ajoute un serveur MCP au projet" },
      { term: "claude mcp list", desc: "Liste les serveurs MCP configurés" },
      { term: "claude --desktop", desc: "Ouvre l'app Claude desktop sur le dossier courant" },
    ],
  },
  {
    slug: "claude-md-structure",
    title: "Structure CLAUDE.md",
    icon: "FileText",
    category: "config",
    categoryLabel: "Configuration",
    entries: [
      { term: "## Commandes", desc: "Build, test, lint, déploiement : ce que vous tapez souvent" },
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
      { term: "settings.json", desc: "Partagé via git : règles équipe" },
      { term: "settings.local.json", desc: "Gitignored : règles personnelles" },
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
    title: "Hooks : Événements",
    icon: "Webhook",
    category: "architecture",
    categoryLabel: "Architecture",
    entries: [
      { term: "PreToolUse", desc: "Avant un outil : peut bloquer (exit non-nul)" },
      { term: "PostToolUse", desc: "Après un outil : peut réagir au résultat" },
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
    title: "MCP : Configuration",
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
    title: "Agents : Définition",
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
    title: "Skills : Définition",
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
    id: "sonnet-5-5",
    period: "28 septembre 2026",
    title: "Claude Sonnet 5.5",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Deuxième modèle de la famille Claude 5.5 : ID claude-sonnet-5-5, nouveau Sonnet par défaut dans Claude Code",
      "Plus de 30 % plus rapide que Sonnet 5 et jusqu'à 30 % moins cher sur la plupart des tâches (2$ / 10$ par million de tokens)",
      "70,6 % sur Terminal-Bench 4.0 (codage agentique), 80,1 % sur OSWorld 2.1 (computer use)",
      "Effort par défaut réglé sur Medium dans Claude Code et les apps Claude",
      "Claude Haiku 5.5 annoncé pour les semaines à venir",
    ],
  },
  {
    id: "opus-5-5",
    period: "22 septembre 2026",
    title: "Claude Opus 5.5",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Premier modèle de la famille Claude 5.5 : ID claude-opus-5-5, nouvel Opus par défaut dans Claude Code (contexte 1M tokens)",
      "Niveau de Fable 5.1 sur la plupart des tâches, 40 % moins cher qu'Opus 5 et plus de 30 % plus rapide en sortie",
      "4$ / 20$ par million de tokens, Fast Mode jusqu'à 2,5x plus rapide (8$ / 40$)",
      "5 niveaux d'effort (Low, Medium par défaut, High, Xhigh, Max), réflexion toujours active",
      "Preserved thinking : protection anti-distillation, le contexte de réflexion précédent ne peut pas être modifié via l'API",
    ],
  },
  {
    id: "claude-code-septembre-2026",
    period: "Septembre 2026",
    title: "Claude Code : effort, diagnostic et administration",
    type: "Claude Code",
    impact: "important",
    highlights: [
      "Ultracode devient une bascule indépendante dans /effort (Tab, ou /effort ultracode on|off) et ne force plus l'effort xhigh",
      "/doctor prompt-audit (alias /checkup prompt-audit) : audite vos fichiers CLAUDE.md et vos skills",
      "/mcp reconnect all relance d'un coup tous les serveurs MCP en échec",
      "claude --desktop ouvre l'app Claude desktop sur le dossier courant, claude plugin configure <plugin> règle les options d'un plugin",
      "Nouveaux réglages managés : deniedModels, availableModelsMatch (\"exact\") et allowedProviders pour encadrer modèles et fournisseurs",
      "Les sous-agents en arrière-plan héritent du mode de permission de la session parente",
    ],
  },
  {
    id: "api-septembre-2026",
    period: "Septembre 2026",
    title: "API Claude : compaction, cache et dépréciations",
    type: "API",
    impact: "important",
    highlights: [
      "Compaction à la demande dans la Messages API (bêta)",
      "Messages système en cours de conversation pouvant définir des outils, y compris des toolsets MCP (bêta)",
      "Diagnostic du cache de prompts sorti de bêta, lecture du cache baissée à 0,25$ par million de tokens",
      "Claude Managed Agents : les politiques de permission acceptent le mode auto",
      "Claude Sonnet 4.5 déprécié, retrait prévu le 30 novembre 2026",
    ],
  },
  {
    id: "fable-5-1",
    period: "1er septembre 2026",
    title: "Claude Fable 5.1",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Modèle de pointe d'Anthropic : ID claude-fable-5-1",
      "Effort par défaut variable selon le contexte : élevé dans Claude Code, moyen sur Claude Cowork et claude.ai",
      "Sorti aux côtés de Claude Mythos 5.1",
    ],
  },
  {
    id: "opus-5",
    period: "24 juillet 2026",
    title: "Claude Opus 5",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Modèle phare pour le codage agentique complexe et les usages entreprise : ID claude-opus-5, remplacé depuis par Opus 5.5",
      "Fenêtre de contexte 1M tokens, jusqu'à 128K tokens de sortie",
      "Réflexion adaptative par défaut, 5 niveaux d'effort configurables",
    ],
  },
  {
    id: "sonnet-5",
    period: "30 juin 2026",
    title: "Claude Sonnet 5",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Modèle équilibré pour le codage agentique, l'utilisation d'outils et les workflows d'agents à moindre coût : ID claude-sonnet-5, remplacé depuis par Sonnet 5.5",
      "2$ / million de tokens en entrée, 10$ / million en sortie",
    ],
  },
  {
    id: "fable-5",
    period: "Juin 2026",
    title: "Claude Fable 5",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Premier modèle de la famille Claude 5, ID : claude-fable-5",
      "Succède à la famille Claude 4.x, remplacé depuis par Fable 5.1",
    ],
  },
  {
    id: "claude-4-family",
    period: "2025",
    title: "Famille Claude 4",
    type: "Modèle",
    impact: "majeur",
    highlights: [
      "Opus 4.8 : le plus puissant de la génération 4.x (claude-opus-4-8)",
      "Sonnet 4.6 : équilibre performance/coût (claude-sonnet-4-6)",
      "Haiku 4.5 : le plus rapide et économique, toujours dans la gamme actuelle (claude-haiku-4-5-20251001)",
      "Remplacement complet de la famille Claude 3.x",
    ],
  },
  {
    id: "claude-cowork",
    period: "Depuis janvier 2026",
    title: "Claude Cowork",
    type: "Plateforme",
    impact: "important",
    highlights: [
      "Agent pensé pour les utilisateurs non techniques : automatise des workflows multi-étapes sur fichiers, dossiers et applications",
      "Disponibilité générale entreprise depuis avril 2026 : contrôle d'accès par rôle, permissions MCP granulaires",
      "Migré dans le cloud en juillet 2026 : accessible multi-appareils, tâches planifiées exécutables même hors ligne (avec validation finale par l'utilisateur)",
    ],
  },
  {
    id: "fast-mode",
    period: "2025",
    title: "Fast Mode",
    type: "Claude Code",
    impact: "important",
    highlights: [
      "Opus avec output accéléré : pas de downgrade vers un modèle plus petit",
      "Activé via /fast dans le REPL, disponible sur Opus 5.5 (jusqu'à 2,5x plus rapide), Opus 5 et Opus 4.8",
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
      "Outils : list_environments, send_later : planification asynchrone",
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
