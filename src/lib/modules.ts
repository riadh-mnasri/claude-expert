import type { Module } from "./types";

export const modules: Module[] = [
  {
    slug: "introduction",
    order: 1,
    title: "Qu'est-ce que Claude Code ?",
    icon: "Sparkles",
    level: "Débutant",
    duration: "8 min",
    summary:
      "Comprendre ce qu'est Claude Code, à quoi il sert et comment il s'intègre dans votre workflow de développement.",
    sections: [
      {
        heading: "Définition",
        body: `Claude Code est un agent de codage en ligne de commande (CLI) développé par Anthropic. Il s'exécute directement dans votre terminal, a accès au système de fichiers de votre projet et peut exécuter des commandes shell, ce qui lui permet de **lire, écrire, exécuter et corriger du code** de façon autonome, en collaboration avec vous.

Contrairement à un simple chatbot, Claude Code est un **agent** : il peut planifier plusieurs étapes, utiliser des outils (lire un fichier, lancer des tests, faire un \`git diff\`...), observer les résultats, et ajuster son comportement en conséquence — le tout en boucle jusqu'à ce que la tâche soit terminée.`,
      },
      {
        heading: "Où il s'exécute",
        body: `Claude Code est disponible sous plusieurs formes :
- **CLI** dans le terminal (la forme la plus puissante et la plus utilisée)
- **Extensions IDE** (VS Code, JetBrains)
- **Application desktop** (Mac/Windows)
- **Application web** (claude.ai/code)

Toutes ces interfaces partagent le même moteur agentique, les mêmes capacités d'outils, et la même configuration projet (\`CLAUDE.md\`, \`.claude/\`, etc.).`,
      },
      {
        heading: "Ce qui le rend différent d'un chatbot classique",
        body: `| Chatbot classique | Claude Code |
|---|---|
| Répond à une question | Accomplit une tâche de bout en bout |
| Pas d'accès au système de fichiers | Lit/écrit des fichiers réels |
| Pas d'exécution de commandes | Lance des commandes shell, tests, builds |
| Une seule réponse | Boucle agentique : planifie → agit → observe → ajuste |
| Pas de mémoire persistante du projet | \`CLAUDE.md\`, mémoire long-terme, hooks, skills |

Cette boucle **agentique** (souvent appelée *agentic loop*) est le cœur de Claude Code : le modèle décide quels outils appeler, dans quel ordre, et s'arrête quand il juge la tâche terminée.`,
      },
      {
        heading: "Les briques que vous allez maîtriser",
        body: `Ce parcours de formation couvre, dans l'ordre, tous les concepts nécessaires pour devenir expert :

1. **Installation & prise en main** — lancer Claude Code, comprendre le REPL
2. **CLI, REPL & commandes slash** — les commandes intégrées (\`/help\`, \`/clear\`, \`/compact\`...)
3. **CLAUDE.md & mémoire** — donner du contexte persistant à l'agent
4. **Outils intégrés** — Read, Edit, Write, Bash, Grep, Glob, Task...
5. **Permissions & sécurité** — modes de permission, sandboxing
6. **Skills** — capacités modulaires invocables à la demande
7. **MCP (Model Context Protocol)** — connecter des outils et données externes
8. **Agents & sous-agents** — déléguer des tâches à des agents spécialisés
9. **Hooks** — automatiser des actions autour du cycle de vie de l'agent
10. **Plan Mode & workflow** — concevoir avant d'exécuter
11. **Bonnes pratiques** — git, PR, CI/CD, gros refactors, sécurité

Chaque module se termine par les points clés à retenir, et la section **Quiz** vous permet de vérifier vos acquis avec des questions corrigées.`,
      },
    ],
    keyTakeaways: [
      "Claude Code est un agent CLI qui lit, écrit et exécute du code de façon autonome.",
      "Il fonctionne en boucle agentique : planifier → agir avec des outils → observer → ajuster.",
      "Disponible en CLI, IDE, desktop et web — même moteur partout.",
      "La configuration projet (CLAUDE.md, hooks, skills, MCP) personnalise son comportement.",
    ],
  },
  {
    slug: "installation",
    order: 2,
    title: "Installation & prise en main",
    icon: "Terminal",
    level: "Débutant",
    duration: "10 min",
    summary:
      "Installer Claude Code, lancer votre première session, et comprendre la structure d'un projet.",
    sections: [
      {
        heading: "Installation",
        body: `Claude Code s'installe via npm (Node.js requis) :

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Puis on le lance depuis la racine d'un projet :

\`\`\`bash
cd mon-projet
claude
\`\`\`

Au premier lancement, une authentification est requise (compte Claude.ai / Claude Console / clé API Anthropic). Une fois connecté, vous arrivez dans le **REPL interactif** de Claude Code.`,
      },
      {
        heading: "Premier lancement",
        body: `Une fois dans le REPL, vous pouvez simplement écrire en langage naturel ce que vous voulez faire :

\`\`\`
> explique-moi la structure de ce projet
> ajoute un endpoint /health qui renvoie {"status":"ok"}
> corrige le bug dans src/auth.ts qui plante au login
\`\`\`

Claude Code va explorer le projet (lister les fichiers, lire le code pertinent), proposer un plan ou agir directement selon la complexité, puis vous montrer les modifications proposées. Pour les actions sensibles (écrire un fichier, exécuter une commande), Claude Code demande une **confirmation** sauf si le mode de permission l'autorise déjà.`,
      },
      {
        heading: "Modes d'exécution",
        body: `Claude Code peut être lancé de plusieurs façons :

- \`claude\` — mode interactif (REPL), le plus courant
- \`claude "corrige ce bug"\` — démarre directement avec une instruction
- \`claude -p "résume ce repo"\` — mode *print* : exécution non-interactive, idéal pour scripts/CI
- \`claude --continue\` — reprend la dernière conversation
- \`claude --resume\` — choisit une session précédente à reprendre

Le mode \`-p\` (print) est particulièrement utile pour l'automatisation : il exécute la tâche et retourne le résultat sans ouvrir de session interactive.`,
      },
      {
        heading: "Structure d'un projet Claude Code",
        body: `Un projet « équipé » pour Claude Code contient typiquement :

\`\`\`
mon-projet/
├── CLAUDE.md              # contexte et instructions persistantes
├── .claude/
│   ├── settings.json       # config partagée (commitée)
│   ├── settings.local.json # config locale (non commitée, gitignored)
│   ├── commands/            # commandes slash personnalisées (.md)
│   ├── agents/               # définitions de sous-agents
│   ├── skills/                 # skills personnalisées
│   └── hooks/                   # scripts appelés par les hooks
└── ...
\`\`\`

Rien de tout cela n'est obligatoire pour démarrer : Claude Code fonctionne dès la première commande \`claude\`. Ces fichiers servent à **personnaliser et automatiser** son comportement au fur et à mesure que vos besoins grandissent.`,
      },
    ],
    keyTakeaways: [
      "Installation via npm install -g @anthropic-ai/claude-code, lancement avec `claude`.",
      "Le mode -p (print) exécute une tâche sans session interactive — utile en CI/scripts.",
      "--continue reprend la dernière session, --resume permet de choisir une session.",
      "La configuration projet vit dans CLAUDE.md et le dossier .claude/.",
    ],
  },
  {
    slug: "cli-repl",
    order: 3,
    title: "CLI, REPL & commandes slash",
    icon: "SquareTerminal",
    level: "Débutant",
    duration: "9 min",
    summary:
      "Maîtriser les commandes slash intégrées, les raccourcis et la gestion du contexte de conversation.",
    sections: [
      {
        heading: "Les commandes slash essentielles",
        body: `Dans le REPL, les commandes commençant par \`/\` pilotent le comportement de la session plutôt que de demander une tâche de code :

| Commande | Effet |
|---|---|
| \`/help\` | Liste les commandes disponibles |
| \`/clear\` | Vide l'historique de conversation (contexte repart à zéro) |
| \`/compact\` | Résume la conversation pour libérer du contexte tout en gardant l'essentiel |
| \`/init\` | Génère un \`CLAUDE.md\` initial en analysant le repo |
| \`/review\` | Lance une revue de code sur la PR / le diff courant |
| \`/agents\` | Gère les sous-agents disponibles |
| \`/permissions\` | Affiche/édite les règles de permission |
| \`/config\` | Ouvre la configuration (modèle, thème, etc.) |
| \`/cost\` | Affiche le coût/tokens consommés sur la session |
| \`/memory\` | Édite la mémoire (CLAUDE.md) directement |
| \`/resume\` | Reprend une session précédente |`,
      },
      {
        heading: "Gestion du contexte",
        body: `Claude Code fonctionne avec une fenêtre de contexte finie. Plus une session dure, plus elle accumule de l'historique (lectures de fichiers, sorties de commandes, etc.). Deux stratégies :

- \`/compact\` : demande à Claude de **résumer** la conversation en préservant les décisions et le travail en cours, puis continue avec un contexte allégé.
- \`/clear\` : repart de zéro — utile entre deux tâches complètement indépendantes.

Au-delà d'un certain remplissage, Claude Code peut **auto-compacter** automatiquement pour éviter de couper la conversation.`,
      },
      {
        heading: "Commandes slash personnalisées",
        body: `Vous pouvez créer vos propres commandes slash en ajoutant un fichier Markdown dans \`.claude/commands/\`. Par exemple, \`.claude/commands/release.md\` :

\`\`\`markdown
---
description: Prépare une release (changelog + bump de version)
---
Analyse les commits depuis le dernier tag, génère un CHANGELOG.md
mis à jour, et propose un bump de version sémantique cohérent.
\`\`\`

Cette commande devient disponible via \`/release\`. Les commandes peuvent aussi accepter des arguments (\`$ARGUMENTS\`) et être scoppées à un sous-dossier du projet.`,
      },
      {
        heading: "Mode interactif vs raccourcis clavier",
        body: `Quelques raccourcis utiles dans le REPL :
- **Shift+Tab** : bascule entre les modes de permission (normal / auto-accept / plan)
- **Échap** : interrompt une action en cours
- **Flèche haut** : rappelle les messages précédents
- **Ctrl+C** (double) : quitte la session

Le symbole \`!\` en début de message exécute directement une commande shell dans le contexte de la session (utile pour des commandes interactives comme \`gcloud auth login\`).`,
      },
    ],
    keyTakeaways: [
      "/clear repart de zéro, /compact résume pour économiser du contexte.",
      "/init génère un CLAUDE.md initial à partir de l'analyse du repo.",
      "Les commandes slash personnalisées sont des fichiers Markdown dans .claude/commands/.",
      "Shift+Tab change de mode de permission sans relancer la session.",
    ],
  },
  {
    slug: "claude-md-memoire",
    order: 4,
    title: "CLAUDE.md & mémoire",
    icon: "BookOpen",
    level: "Intermédiaire",
    duration: "11 min",
    summary:
      "Donner à Claude Code un contexte projet persistant : conventions, architecture, contraintes.",
    sections: [
      {
        heading: "Le rôle de CLAUDE.md",
        body: `\`CLAUDE.md\` est un fichier Markdown à la racine du projet (ou dans des sous-dossiers) que Claude Code **charge automatiquement** au démarrage de chaque session. C'est l'endroit idéal pour documenter ce qui n'est pas évident en lisant juste le code :

- conventions de code spécifiques au projet
- commandes utiles (build, test, lint, déploiement)
- architecture générale et décisions techniques
- pièges connus, comportements contre-intuitifs
- règles de workflow (toujours créer une branche, ne jamais toucher à tel dossier...)

\`/init\` génère une première version en analysant automatiquement le repo (package.json, structure de dossiers, README...).`,
      },
      {
        heading: "Hiérarchie de la mémoire",
        body: `Claude Code combine plusieurs niveaux de mémoire, du plus général au plus spécifique :

1. **Mémoire utilisateur** (\`~/.claude/CLAUDE.md\`) — préférences valables sur tous vos projets
2. **Mémoire projet** (\`./CLAUDE.md\` à la racine) — partagée avec l'équipe via git
3. **Mémoire locale** (\`./CLAUDE.local.md\`, non commitée) — vos préférences perso sur ce projet
4. **CLAUDE.md de sous-dossier** — contexte spécifique à un module/package dans un monorepo

Plus le fichier est « proche » du travail en cours, plus son contenu est pertinent et prioritaire en cas de conflit.`,
      },
      {
        heading: "Bonnes pratiques de rédaction",
        body: `- Restez **concis et actionnable** : une liste de règles claires vaut mieux qu'un essai.
- Documentez le **pourquoi**, pas seulement le quoi, quand une règle est contre-intuitive.
- Mettez à jour le fichier quand vous corrigez Claude Code en session — ça évite de répéter la même correction.
- Évitez les répétitions trouvables dans le code (architecture déductible du code n'a pas besoin d'être réécrite).
- Utilisez \`#\` en début de message dans le REPL pour ajouter rapidement une instruction à la mémoire sans éditer le fichier à la main.

\`\`\`markdown
# CLAUDE.md
## Commandes
- Build: \`npm run build\`
- Tests: \`npm test -- --watch=false\`

## Conventions
- Toujours utiliser des composants serveur sauf si interactivité requise.
- Ne jamais modifier les fichiers sous \`legacy/\`.
\`\`\``,
      },
      {
        heading: "Mémoire à long terme dans l'agent",
        body: `Au-delà de \`CLAUDE.md\`, Claude Code peut tenir un **système de mémoire structuré** (fichiers dans un dossier dédié) pour se souvenir, entre les sessions, d'informations sur l'utilisateur, le projet et les retours qu'il a reçus (préférences de workflow, décisions prises, pièges déjà rencontrés). Cette mémoire est consultée quand elle est pertinente et mise à jour activement lorsque l'utilisateur donne un retour explicite ou que des faits durables émergent — elle se distingue de \`CLAUDE.md\` en ce qu'elle est gérée par l'agent lui-même plutôt qu'éditée manuellement.`,
      },
    ],
    keyTakeaways: [
      "CLAUDE.md est chargé automatiquement à chaque session : conventions, commandes, architecture.",
      "Plusieurs niveaux de mémoire (utilisateur, projet, local, sous-dossier) se combinent.",
      "/init génère une première version ; # en début de message ajoute une instruction rapide.",
      "Une mémoire structurée et gérée par l'agent complète CLAUDE.md entre les sessions.",
    ],
  },
  {
    slug: "outils",
    order: 5,
    title: "Outils intégrés",
    icon: "Wrench",
    level: "Intermédiaire",
    duration: "10 min",
    summary:
      "Comprendre les outils que Claude Code utilise pour explorer, modifier et exécuter du code.",
    sections: [
      {
        heading: "Les outils de base",
        body: `Claude Code dispose d'un jeu d'outils natifs qu'il choisit d'invoquer selon la tâche :

| Outil | Rôle |
|---|---|
| **Read** | Lire le contenu d'un fichier (avec numéros de ligne) |
| **Edit** | Remplacer une chaîne précise dans un fichier existant |
| **Write** | Créer un nouveau fichier ou réécrire un fichier entier |
| **Glob** | Trouver des fichiers par motif (\`**/*.test.ts\`) |
| **Grep** | Rechercher du texte/regex dans les fichiers (basé sur ripgrep) |
| **Bash** | Exécuter des commandes shell (build, tests, git...) |
| **WebFetch / WebSearch** | Récupérer une page web ou faire une recherche |
| **Task / Agent** | Déléguer une sous-tâche à un agent spécialisé |
| **TodoWrite / TaskCreate** | Gérer une liste de tâches pour les travaux multi-étapes |`,
      },
      {
        heading: "Pourquoi Edit plutôt que Write ?",
        body: `Pour modifier un fichier existant, Claude Code privilégie **Edit** (remplacement ciblé d'une chaîne unique) plutôt que **Write** (réécriture complète). Cela limite le risque d'effacer du contenu non lié à la tâche et produit des diffs plus lisibles et plus faciles à relire pour vous.

\`Write\` reste l'outil approprié pour créer un nouveau fichier, ou dans les cas où une réécriture complète est réellement nécessaire.`,
      },
      {
        heading: "Recherche : Glob et Grep",
        body: `\`Glob\` répond à « quels fichiers correspondent à ce motif ? » (ex: tous les fichiers de test). \`Grep\` répond à « où apparaît ce symbole/texte dans le code ? ». Combinés, ils permettent à Claude Code d'explorer un repo inconnu sans avoir besoin d'un index préconstruit : il cherche, lit ce qui est pertinent, et ignore le reste — une approche qui s'adapte à des bases de code de toute taille.`,
      },
      {
        heading: "Bash et la prudence sur les actions destructrices",
        body: `L'outil **Bash** est le plus puissant et le plus sensible : il peut lancer des tests, mais aussi \`rm -rf\`, \`git push --force\`, ou modifier des ressources partagées. Claude Code applique une politique de prudence :

- Les commandes en lecture (tests, lint, git status/diff/log) sont généralement sûres.
- Les commandes destructrices ou difficiles à inverser (force-push, reset --hard, suppression de fichiers) doivent être confirmées explicitement, sauf autorisation explicite de l'utilisateur.
- Les hooks (voir module Hooks) peuvent intercepter et bloquer certaines commandes Bash avant exécution.`,
      },
    ],
    keyTakeaways: [
      "Read/Edit/Write pour le code, Glob/Grep pour explorer, Bash pour exécuter.",
      "Edit (remplacement ciblé) est préféré à Write (réécriture complète) sur les fichiers existants.",
      "Glob trouve des fichiers par motif, Grep recherche du contenu — combinés ils remplacent un index.",
      "Bash est l'outil le plus puissant : les actions destructrices doivent être confirmées.",
    ],
  },
  {
    slug: "permissions",
    order: 6,
    title: "Permissions & sécurité",
    icon: "ShieldCheck",
    level: "Intermédiaire",
    duration: "10 min",
    summary:
      "Maîtriser les modes de permission, le sandboxing, et configurer des règles fines.",
    sections: [
      {
        heading: "Les modes de permission",
        body: `Claude Code propose plusieurs modes qui déterminent le niveau de confirmation requis avant d'agir :

- **Normal (par défaut)** : chaque action sensible (édition, commande shell) est confirmée par l'utilisateur.
- **Auto-accept edits** : les éditions de fichiers sont acceptées automatiquement, les commandes shell sensibles restent confirmées.
- **Plan Mode** : Claude Code ne fait que lire et analyser, propose un plan, et **ne modifie rien** jusqu'à validation explicite (voir module dédié).
- **Bypass / YOLO (dangereux)** : toutes les confirmations sont désactivées — réservé à des environnements jetables et isolés (ex: conteneur sandbox).

On bascule entre les modes avec **Shift+Tab** en session, ou via la configuration.`,
      },
      {
        heading: "settings.json : règles de permission fines",
        body: `Le fichier \`.claude/settings.json\` (commitable, partagé avec l'équipe) ou \`.claude/settings.local.json\` (personnel, gitignored) permet de définir des règles d'autorisation/refus précises :

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(git status)",
      "Read(*)"
    ],
    "deny": [
      "Bash(git push --force*)",
      "Read(./.env)"
    ]
  }
}
\`\`\`

Ces règles s'appliquent **avant** que le modèle ne décide quoi que ce soit : une commande explicitement \`deny\` ne sera jamais exécutée, même si Claude Code le proposait.`,
      },
      {
        heading: "Pourquoi ne jamais désactiver les vérifications de sécurité",
        body: `Désactiver les hooks de sécurité (\`--no-verify\`) ou contourner les permissions pour « aller plus vite » revient à supprimer le filet de sécurité justement conçu pour éviter des actions irréversibles (perte de commits, secrets exposés, déploiement cassé). La bonne pratique est de **comprendre la cause racine** d'un blocage plutôt que de le bypasser : un hook ou une permission qui bloque une action signale souvent un vrai problème (test cassé, commande dangereuse, fichier sensible).`,
      },
      {
        heading: "Sandboxing et environnements isolés",
        body: `Pour des tâches qui nécessitent plus de liberté (ex: exécuter du code généré, tester des commandes risquées), on peut isoler l'exécution dans un environnement jetable : conteneur Docker, VM, ou un *worktree* git séparé. Cela permet d'autoriser des actions plus larges sans risque pour l'environnement principal — c'est le même principe que les agents qui tournent avec \`isolation: "worktree"\` pour travailler sur une copie du repo.`,
      },
    ],
    keyTakeaways: [
      "4 modes : Normal, Auto-accept edits, Plan Mode, Bypass (à éviter hors sandbox).",
      "settings.json définit des règles allow/deny précises, appliquées avant toute décision du modèle.",
      "Ne jamais bypasser un hook de sécurité : comprendre la cause racine du blocage.",
      "Les environnements isolés (sandbox, worktree) permettent plus de liberté sans risque.",
    ],
  },
  {
    slug: "skills",
    order: 7,
    title: "Skills",
    icon: "GraduationCap",
    level: "Avancé",
    duration: "10 min",
    summary:
      "Créer des capacités modulaires que Claude Code charge à la demande selon la tâche.",
    sections: [
      {
        heading: "Qu'est-ce qu'une Skill ?",
        body: `Une **Skill** est un module de connaissance/instructions packagé (typiquement un dossier avec un fichier \`SKILL.md\` et des ressources associées : scripts, templates, exemples) que Claude Code peut **découvrir et charger dynamiquement** quand le contexte de la tâche correspond.

Contrairement à \`CLAUDE.md\` (toujours chargé), une Skill n'est chargée **que si pertinente** — ce qui permet d'avoir des dizaines de capacités spécialisées sans alourdir chaque session avec du contexte inutile.`,
      },
      {
        heading: "Structure d'une Skill",
        body: `\`\`\`
.claude/skills/deploy-to-staging/
├── SKILL.md          # description + instructions + déclencheurs
├── scripts/
│   └── check-env.sh
└── templates/
    └── deploy-config.yaml
\`\`\`

\`SKILL.md\` typique :

\`\`\`markdown
---
name: deploy-to-staging
description: Déploie l'application sur l'environnement de staging après vérification des tests et de la configuration.
---
1. Vérifie que tous les tests passent (\`npm test\`).
2. Vérifie les variables d'environnement requises avec scripts/check-env.sh.
3. Lance le déploiement staging et rapporte l'URL générée.
\`\`\``,
      },
      {
        heading: "Découverte et déclenchement",
        body: `Claude Code maintient une liste légère (nom + description) de toutes les Skills disponibles. Quand une requête utilisateur correspond à la description d'une Skill, il **charge son contenu complet** avant d'agir — un mécanisme similaire à un appel de fonction, mais pour de la connaissance procédurale plutôt que du code.

Une bonne description de Skill est donc cruciale : elle doit indiquer clairement **quand** l'utiliser (mots-clés, contexte, type de tâche) pour que la découverte fonctionne de façon fiable.`,
      },
      {
        heading: "Skills vs Sous-agents vs MCP",
        body: `Trois mécanismes d'extension à ne pas confondre :

| Mécanisme | Ce que ça apporte | Exemple |
|---|---|---|
| **Skill** | Des instructions/connaissances chargées à la demande | Procédure de déploiement, style de revue de code |
| **Sous-agent** | Un agent autonome avec son propre contexte et ses propres outils, pour déléguer une tâche entière | Un agent "Explore" en lecture seule pour chercher du code |
| **MCP** | Une connexion à un service/outil externe (API, base de données, autre app) | Accès à GitHub, Slack, une base Postgres |

Une Skill peut elle-même recommander d'utiliser un sous-agent ou un serveur MCP particulier — ces mécanismes se combinent.`,
      },
    ],
    keyTakeaways: [
      "Une Skill packagise des instructions + ressources, chargées seulement si pertinentes.",
      "SKILL.md décrit le nom, la description (déclencheur) et la procédure à suivre.",
      "La description doit indiquer clairement quand utiliser la Skill pour une découverte fiable.",
      "Skills (savoir-faire), sous-agents (délégation), MCP (connexion externe) sont complémentaires.",
    ],
  },
  {
    slug: "mcp",
    order: 8,
    title: "MCP — Model Context Protocol",
    icon: "Plug",
    level: "Avancé",
    duration: "11 min",
    summary:
      "Connecter Claude Code à des outils et données externes via le protocole ouvert MCP.",
    sections: [
      {
        heading: "Le problème que MCP résout",
        body: `Avant MCP, chaque intégration entre un modèle et un outil externe (GitHub, Slack, une base de données, Figma...) nécessitait du code d'intégration sur-mesure. **MCP (Model Context Protocol)** est un protocole ouvert, standardisé par Anthropic, qui définit une interface commune : n'importe quel **serveur MCP** peut exposer des outils, des ressources et des prompts à n'importe quel **client MCP** (Claude Code, Claude Desktop, d'autres agents...).

C'est l'équivalent d'un « port USB » pour les agents IA : un serveur MCP écrit une fois peut être branché sur n'importe quel client compatible.`,
      },
      {
        heading: "Les trois primitives MCP",
        body: `| Primitive | Rôle | Analogie |
|---|---|---|
| **Tools** | Fonctions que le modèle peut appeler (avec effets de bord) | Appel d'API |
| **Resources** | Données que le client peut lire (fichiers, enregistrements...) | Lecture de fichier |
| **Prompts** | Templates de prompts réutilisables fournis par le serveur | Snippet préconfiguré |

Dans Claude Code, les outils MCP apparaissent préfixés par le nom du serveur, par exemple \`mcp__github__create_issue\`.`,
      },
      {
        heading: "Configurer un serveur MCP",
        body: `Les serveurs MCP se configurent via la CLI ou dans \`.claude/settings.json\` / \`.mcp.json\` :

\`\`\`bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github
\`\`\`

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "$GITHUB_TOKEN" }
    }
  }
}
\`\`\`

Un serveur MCP peut tourner en **local** (process lancé sur votre machine, transport stdio) ou en **distant** (HTTP/SSE, hébergé par un tiers).`,
      },
      {
        heading: "Bonnes pratiques MCP",
        body: `- N'installez que des serveurs MCP **de confiance** : un serveur malveillant peut exfiltrer des données ou exécuter des actions non désirées avec les permissions qui lui sont accordées.
- Limitez les **scopes/tokens** fournis aux serveurs MCP au strict nécessaire (principe du moindre privilège).
- Vérifiez régulièrement la liste des serveurs connectés (\`claude mcp list\`) et retirez ceux qui ne sont plus utilisés.
- Pour des données très volumineuses, préférez des outils qui **paginent/filtrent** côté serveur plutôt que de tout charger dans le contexte du modèle.`,
      },
    ],
    keyTakeaways: [
      "MCP est un protocole ouvert standard pour connecter des outils/données externes aux agents IA.",
      "Trois primitives : Tools (actions), Resources (données), Prompts (templates).",
      "Configuration via `claude mcp add` ou .mcp.json / settings.json, en local (stdio) ou distant (HTTP/SSE).",
      "N'installer que des serveurs de confiance, avec le moindre privilège possible.",
    ],
  },
  {
    slug: "agents",
    order: 9,
    title: "Agents & sous-agents",
    icon: "Bot",
    level: "Avancé",
    duration: "11 min",
    summary:
      "Déléguer des tâches à des sous-agents spécialisés pour paralléliser et protéger le contexte principal.",
    sections: [
      {
        heading: "Pourquoi déléguer à un sous-agent ?",
        body: `Un sous-agent est une instance de Claude Code lancée avec sa **propre fenêtre de contexte**, éventuellement un **prompt système spécialisé** et un **sous-ensemble d'outils**. On délègue à un sous-agent pour :

- **Protéger le contexte principal** : une recherche qui produirait beaucoup de bruit (lecture de dizaines de fichiers) reste dans le sous-agent ; seul le résumé final remonte à la conversation principale.
- **Spécialiser le comportement** : un agent "Explore" en lecture seule, un agent "code-reviewer" avec un prompt orienté qualité, etc.
- **Paralléliser** : plusieurs sous-agents indépendants peuvent travailler en même temps sur des sous-tâches distinctes.`,
      },
      {
        heading: "Définir un sous-agent",
        body: `Un sous-agent se définit dans \`.claude/agents/\` :

\`\`\`markdown
---
name: code-reviewer
description: Relit un diff pour des bugs, des problèmes de sécurité et de la dette technique.
tools: Read, Grep, Glob, Bash
model: inherit
---
Tu es un relecteur de code exigeant. Pour chaque diff, identifie :
1. Les bugs probables et cas limites non gérés.
2. Les failles de sécurité (injection, XSS, secrets en dur).
3. Les opportunités de simplification, sans sur-ingénierie.
\`\`\`

On l'invoque ensuite via l'outil **Task/Agent** (\`subagent_type: "code-reviewer"\`), ou indirectement via une commande comme \`/review\`.`,
      },
      {
        heading: "Isolation et exécution",
        body: `Un sous-agent peut tourner :
- **en avant-plan**, bloquant la conversation jusqu'à son retour (utile quand son résultat est nécessaire pour continuer) ;
- **en arrière-plan** (\`run_in_background\`), pour du travail indépendant dont le résultat n'est pas immédiatement bloquant ;
- dans un **worktree git isolé** (\`isolation: "worktree"\`), pour travailler sur une copie du repo sans risquer le répertoire de travail principal.

Un nouvel appel d'agent démarre **sans mémoire** de la conversation en cours : tout le contexte nécessaire doit être inclus explicitement dans le prompt de délégation.`,
      },
      {
        heading: "Bien rédiger un prompt de délégation",
        body: `Un sous-agent ne voit que ce qu'on lui donne. Un bon prompt de délégation :
- explique l'objectif et **pourquoi** la tâche est nécessaire ;
- donne les chemins de fichiers, noms de fonctions, contraintes déjà identifiées ;
- précise le format de réponse attendu (court résumé, liste, etc.) ;
- évite de déléguer la *compréhension* : ne demandez pas « corrige le bug », mais détaillez ce que vous savez déjà du bug et ce qu'il reste à vérifier.

Une consigne vague produit un travail générique ; un brief précis produit un travail exploitable directement.`,
      },
    ],
    keyTakeaways: [
      "Un sous-agent a son propre contexte, ses propres outils, parfois un prompt spécialisé.",
      "On délègue pour protéger le contexte principal, spécialiser le comportement, ou paralléliser.",
      "Les agents se définissent dans .claude/agents/ (nom, description, outils, prompt système).",
      "Un sous-agent démarre sans mémoire de la conversation : le prompt doit être autonome et précis.",
    ],
  },
  {
    slug: "hooks",
    order: 10,
    title: "Hooks",
    icon: "Webhook",
    level: "Avancé",
    duration: "10 min",
    summary:
      "Automatiser des actions et imposer des règles autour du cycle de vie de l'agent.",
    sections: [
      {
        heading: "Le principe des hooks",
        body: `Les **hooks** sont des commandes shell que Claude Code exécute automatiquement à des moments précis du cycle de vie de l'agent : avant d'utiliser un outil, après, quand une session démarre ou se termine, etc. Ils permettent d'imposer des règles **déterministes** (pas soumises à l'interprétation du modèle) : formatage automatique, blocage de commandes interdites, notifications, journalisation.`,
      },
      {
        heading: "Les événements disponibles",
        body: `| Événement | Déclenché... |
|---|---|
| \`PreToolUse\` | avant l'exécution d'un outil — peut **bloquer** l'appel |
| \`PostToolUse\` | après l'exécution d'un outil — peut réagir au résultat |
| \`UserPromptSubmit\` | quand l'utilisateur envoie un message |
| \`SessionStart\` / \`SessionEnd\` | au démarrage / à la fin d'une session |
| \`Stop\` | quand l'agent termine sa réponse |
| \`Notification\` | sur certains événements informatifs |`,
      },
      {
        heading: "Exemple : formater automatiquement après chaque édition",
        body: `\`.claude/settings.json\` :

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "npx prettier --write \\"$CLAUDE_FILE_PATHS\\"" }]
      }
    ]
  }
}
\`\`\`

Ici, chaque fois que Claude Code utilise \`Edit\` ou \`Write\`, Prettier reformate automatiquement le ou les fichiers concernés — sans dépendre du modèle pour s'en souvenir.`,
      },
      {
        heading: "Exemple : bloquer une commande dangereuse",
        body: `Un hook \`PreToolUse\` peut inspecter la commande proposée et la **refuser** (code de sortie non nul, ou sortie JSON \`{"decision":"block"}\`) avant qu'elle ne s'exécute :

\`\`\`bash
#!/bin/bash
# .claude/hooks/block-force-push.sh
if echo "$CLAUDE_TOOL_INPUT" | grep -q "push --force"; then
  echo "Force-push bloqué par hook de sécurité" >&2
  exit 2
fi
\`\`\`

Les hooks tournent avec les **permissions de votre utilisateur système** : ils sont puissants, mais doivent être audités comme du code de production — un hook mal écrit peut bloquer (ou pire, casser) des actions légitimes.`,
      },
    ],
    keyTakeaways: [
      "Les hooks exécutent des commandes shell à des points précis du cycle de vie de l'agent.",
      "PreToolUse peut bloquer un appel d'outil ; PostToolUse réagit après coup.",
      "Ils servent à imposer des règles déterministes : formatage auto, blocage de commandes, logs.",
      "Un hook s'exécute avec vos permissions système — à auditer comme du code de prod.",
    ],
  },
  {
    slug: "plan-mode",
    order: 11,
    title: "Plan Mode & workflow",
    icon: "ListChecks",
    level: "Intermédiaire",
    duration: "9 min",
    summary:
      "Concevoir avant d'exécuter : utiliser le Plan Mode pour les tâches complexes ou ambiguës.",
    sections: [
      {
        heading: "Pourquoi planifier avant d'agir",
        body: `Pour une tâche simple (corriger une faute de frappe), planifier serait une perte de temps. Mais pour une tâche **complexe, ambiguë, ou à fort impact** (migration de base de données, refonte d'architecture, changement touchant de nombreux fichiers), agir directement risque de partir dans une mauvaise direction sans que vous puissiez intervenir à temps.

Le **Plan Mode** répond à ce besoin : Claude Code explore le code, pose les questions nécessaires, puis présente un **plan détaillé** — sans modifier aucun fichier — que vous validez (ou ajustez) avant la moindre exécution.`,
      },
      {
        heading: "Comment l'activer",
        body: `- **Shift+Tab** dans le REPL pour basculer en Plan Mode.
- Le plan est présenté avec les étapes, fichiers concernés, et éventuels compromis (trade-offs).
- Vous pouvez itérer sur le plan avant de l'approuver ("ExitPlanMode" déclenche le passage à l'exécution une fois validé).
- En Plan Mode, les outils de lecture (Read, Grep, Glob, Bash en lecture) restent disponibles ; les outils d'écriture (Edit, Write) sont désactivés jusqu'à validation.`,
      },
      {
        heading: "Quand utiliser Plan Mode",
        body: `Utile pour :
- les migrations ou refactors qui touchent beaucoup de fichiers ;
- les tâches où plusieurs approches sont possibles et où le choix a des implications (perf, sécurité, UX) ;
- les changements sur du code critique/production où une erreur serait coûteuse à corriger.

Moins utile pour :
- des corrections de bug ponctuelles et bien définies ;
- des tâches exploratoires ("explique-moi ce fichier") qui ne modifient rien de toute façon.`,
      },
      {
        heading: "Le cycle complet : explorer → planifier → exécuter → vérifier",
        body: `Un bon workflow pour une tâche non triviale suit ce cycle :

1. **Explorer** : laisser Claude Code lire le code pertinent (ou déléguer à un sous-agent \`Explore\`).
2. **Planifier** : en Plan Mode, obtenir un plan clair, le challenger si besoin.
3. **Exécuter** : valider le plan, laisser Claude Code l'implémenter étape par étape.
4. **Vérifier** : lancer les tests, lire le diff, et — pour du code UI — observer réellement le résultat dans le navigateur plutôt que de se fier uniquement aux tests.

Ce cycle réduit drastiquement les retours en arrière sur des tâches complexes.`,
      },
    ],
    keyTakeaways: [
      "Plan Mode explore et propose un plan sans modifier aucun fichier, jusqu'à validation.",
      "On l'active avec Shift+Tab ; Read/Grep restent actifs, Edit/Write sont désactivés.",
      "Utile pour les tâches complexes/ambiguës/à fort impact, pas pour les corrections triviales.",
      "Cycle recommandé : explorer → planifier → exécuter → vérifier.",
    ],
  },
  {
    slug: "bonnes-pratiques",
    order: 12,
    title: "Bonnes pratiques & workflow avancé",
    icon: "Rocket",
    level: "Avancé",
    duration: "12 min",
    summary:
      "Git, revues de code, CI/CD, et habitudes d'un utilisateur expert de Claude Code.",
    sections: [
      {
        heading: "Workflow Git avec Claude Code",
        body: `- Laissez Claude Code rédiger les messages de commit en se basant sur le \`git diff\` réel, pas sur des suppositions.
        - Préférez toujours de **nouveaux commits** plutôt que des \`--amend\`, sauf demande explicite : un amend sur un commit déjà poussé réécrit l'historique partagé.
- Ne jamais \`git push --force\` sur une branche partagée (main/master) sans autorisation explicite.
- Pour les PR, Claude Code peut résumer **tous** les commits du diff par rapport à la branche de base, pas seulement le dernier.`,
      },
      {
        heading: "Revue de code et sécurité",
        body: `Avant de merger un changement généré ou assisté par Claude Code :
- Lancez une revue (\`/review\` ou un sous-agent \`code-reviewer\`) pour détecter bugs et failles de sécurité (injection, XSS, secrets en dur).
- Faites tourner les tests existants — et ajoutez-en si le changement n'était pas couvert.
- Pour les changements UI, **ouvrez réellement l'application** dans un navigateur pour vérifier le chemin nominal et les cas limites ; les tests vérifient la correction du code, pas la correction de la fonctionnalité perçue par l'utilisateur.`,
      },
      {
        heading: "Gérer le contexte sur de grosses tâches",
        body: `- Découpez une tâche large en sous-étapes suivies via une todo-list (TaskCreate/TodoWrite), pour garder une trace claire de ce qui est fait et restant.
- Déléguez les recherches volumineuses (lecture de beaucoup de fichiers) à des sous-agents pour ne pas saturer le contexte principal avec du détail inutile.
- Utilisez \`/compact\` proactivement avant qu'une session ne devienne trop lourde, plutôt que d'attendre la limite.`,
      },
      {
        heading: "Habitudes d'un utilisateur expert",
        body: `- **Donner le contexte du « pourquoi »**, pas seulement le « quoi » : Claude Code prend de meilleures décisions s'il comprend l'objectif réel.
- **Corriger une fois, mémoriser pour toujours** : quand vous corrigez une approche, ajoutez la règle à \`CLAUDE.md\` ou à la mémoire pour ne pas la répéter.
- **Vérifier avant de faire confiance** : pour des actions à fort impact (déploiement, migration), demander un plan avant exécution.
- **Garder l'humain dans la boucle** sur les actions irréversibles ou visibles publiquement (push, déploiement, messages envoyés) — toujours confirmer explicitement plutôt que de présumer une autorisation tacite.`,
      },
    ],
    keyTakeaways: [
      "Nouveaux commits plutôt que --amend ; jamais de force-push sans autorisation explicite.",
      "Toujours relire/tester avant de merger, et vérifier l'UI dans un vrai navigateur.",
      "Découper les grosses tâches en sous-étapes, déléguer les recherches volumineuses.",
      "Mémoriser durablement les corrections, garder l'humain dans la boucle sur l'irréversible.",
    ],
  },
];

export function getModuleBySlug(slug: string) {
  return modules.find((m) => m.slug === slug);
}

export function getAdjacentModules(slug: string) {
  const sorted = [...modules].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((m) => m.slug === slug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
