import type { QuizQuestion } from "../types";

export const introductionQuestions: QuizQuestion[] = [
  {
    id: "intro-1",
    categorySlug: "introduction",
    question: "Qu'est-ce qui distingue principalement Claude Code d'un chatbot classique ?",
    options: [
      "Il a une interface graphique plus moderne",
      "Il accomplit des tâches de bout en bout via une boucle agentique avec des outils",
      "Il ne peut répondre qu'en anglais",
      "Il n'utilise pas de modèle de langage",
    ],
    answerIndex: 1,
    explanation:
      "Claude Code est un agent : il planifie, utilise des outils (fichiers, shell...), observe les résultats et ajuste son comportement en boucle, contrairement à un chatbot qui se limite à répondre à une question.",
    difficulty: "Facile",
  },
  {
    id: "intro-2",
    categorySlug: "introduction",
    question: "Sur quelles interfaces Claude Code est-il disponible ?",
    options: [
      "Uniquement en CLI",
      "CLI, extensions IDE, application desktop et application web",
      "Uniquement comme extension de navigateur",
      "Uniquement via l'API Anthropic",
    ],
    answerIndex: 1,
    explanation:
      "Claude Code partage le même moteur agentique entre la CLI, les extensions IDE (VS Code, JetBrains), l'application desktop et l'application web (claude.ai/code).",
    difficulty: "Facile",
  },
  {
    id: "intro-3",
    categorySlug: "introduction",
    question: "Que décrit le terme « boucle agentique » (agentic loop) ?",
    options: [
      "Une boucle infinie qui doit être arrêtée manuellement",
      "Le cycle planifier → agir avec des outils → observer → ajuster, jusqu'à la fin de la tâche",
      "Le rechargement automatique de la page web",
      "La synchronisation entre plusieurs comptes utilisateurs",
    ],
    answerIndex: 1,
    explanation:
      "La boucle agentique est le mécanisme central : le modèle décide des outils à appeler, observe leurs résultats, et continue jusqu'à juger la tâche terminée.",
    difficulty: "Moyen",
  },
  {
    id: "intro-4",
    categorySlug: "introduction",
    question: "Quel fichier permet de donner un contexte persistant à Claude Code sur un projet ?",
    options: ["README.md", "CLAUDE.md", "package.json", ".gitignore"],
    answerIndex: 1,
    explanation:
      "CLAUDE.md est chargé automatiquement à chaque session pour fournir des conventions, commandes et contraintes propres au projet.",
    difficulty: "Facile",
  },
  {
    id: "intro-5",
    categorySlug: "introduction",
    question:
      "Parmi ces affirmations, laquelle est correcte concernant l'accès au système de fichiers ?",
    options: [
      "Claude Code ne peut que lire des fichiers, jamais en écrire",
      "Claude Code peut lire, écrire et exécuter du code dans le projet",
      "Claude Code nécessite un serveur distant pour accéder aux fichiers",
      "Claude Code ne fonctionne que sur des fichiers texte de moins de 1 Ko",
    ],
    answerIndex: 1,
    explanation:
      "Claude Code a accès au système de fichiers local du projet : il peut lire, écrire et exécuter des commandes shell.",
    difficulty: "Facile",
  },
  {
    id: "intro-6",
    categorySlug: "introduction",
    question: "Quel mécanisme permet à Claude Code de connecter des outils ou données externes ?",
    options: ["CLAUDE.md", "MCP (Model Context Protocol)", "Le mode Plan", "Les commandes slash"],
    answerIndex: 1,
    explanation:
      "MCP est le protocole ouvert qui standardise la connexion entre Claude Code et des outils/données externes (GitHub, Slack, bases de données...).",
    difficulty: "Moyen",
  },
  {
    id: "intro-7",
    categorySlug: "introduction",
    question: "Quel concept permet de déléguer une sous-tâche à une instance spécialisée de Claude Code ?",
    options: ["Un hook", "Un sous-agent (subagent)", "Une commande slash", "Un fichier .env"],
    answerIndex: 1,
    explanation:
      "Un sous-agent est une instance dédiée avec son propre contexte et éventuellement un prompt système spécialisé, utilisée pour déléguer une tâche entière.",
    difficulty: "Moyen",
  },
  {
    id: "intro-8",
    categorySlug: "introduction",
    question: "Quelle est la fonction principale d'une Skill dans Claude Code ?",
    options: [
      "Bloquer des commandes shell dangereuses",
      "Empaqueter des instructions/connaissances chargées à la demande selon la tâche",
      "Gérer l'authentification utilisateur",
      "Remplacer entièrement CLAUDE.md",
    ],
    answerIndex: 1,
    explanation:
      "Une Skill packagise des instructions et ressources, chargées dynamiquement seulement quand la tâche en cours correspond à sa description.",
    difficulty: "Moyen",
  },
  {
    id: "intro-9",
    categorySlug: "introduction",
    question: "Que sont les Hooks dans Claude Code ?",
    options: [
      "Des raccourcis clavier pour naviguer dans le REPL",
      "Des commandes shell exécutées automatiquement à des moments précis du cycle de vie de l'agent",
      "Des modèles d'IA alternatifs à Claude",
      "Des fichiers de configuration de l'éditeur de texte",
    ],
    answerIndex: 1,
    explanation:
      "Les hooks exécutent des commandes shell de façon déterministe à des points précis (avant/après un outil, début/fin de session...).",
    difficulty: "Moyen",
  },
  {
    id: "intro-10",
    categorySlug: "introduction",
    question:
      "Pourquoi dit-on que Claude Code « s'adapte à des bases de code de toute taille » sans index préconstruit ?",
    options: [
      "Parce qu'il charge tout le code en mémoire au démarrage",
      "Parce qu'il explore via Glob/Grep à la demande, en lisant seulement ce qui est pertinent",
      "Parce qu'il limite les projets à 100 fichiers maximum",
      "Parce qu'il utilise une base de données vectorielle obligatoire",
    ],
    answerIndex: 1,
    explanation:
      "Claude Code recherche dynamiquement (Glob pour les motifs de fichiers, Grep pour le contenu) plutôt que de dépendre d'un index préconstruit, ce qui s'adapte à des repos de toute taille.",
    difficulty: "Difficile",
  },
  {
    id: "intro-11",
    categorySlug: "introduction",
    question: "Quel mode garantit qu'aucun fichier n'est modifié avant validation explicite d'un plan ?",
    options: ["Auto-accept edits", "Bypass", "Plan Mode", "Normal"],
    answerIndex: 2,
    explanation:
      "Le Plan Mode désactive les outils d'écriture (Edit/Write) jusqu'à ce que le plan proposé soit explicitement validé par l'utilisateur.",
    difficulty: "Moyen",
  },
  {
    id: "intro-12",
    categorySlug: "introduction",
    question: "Quel élément des quatre piliers (CLAUDE.md, Skills, MCP, Hooks) sert à connecter Claude Code à des services tiers comme GitHub ou Slack ?",
    options: ["CLAUDE.md", "Skills", "MCP", "Hooks"],
    answerIndex: 2,
    explanation:
      "MCP est conçu spécifiquement pour standardiser la connexion à des outils et services externes.",
    difficulty: "Facile",
  },
];
