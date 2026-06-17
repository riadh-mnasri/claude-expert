export type Level = "Débutant" | "Intermédiaire" | "Avancé";

export interface ModuleSection {
  heading: string;
  body: string; // markdown
}

export interface Module {
  slug: string;
  order: number;
  title: string;
  icon: string; // lucide icon name
  level: Level;
  summary: string;
  duration: string; // estimated reading time
  sections: ModuleSection[];
  keyTakeaways: string[];
}

export type Difficulty = "Facile" | "Moyen" | "Difficile";

export interface QuizQuestion {
  id: string;
  categorySlug: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  difficulty: Difficulty;
}

export interface QuizCategory {
  slug: string;
  title: string;
  icon: string;
  description: string;
}
