import type { QuizQuestion } from "./types";
import { introductionQuestions } from "./quiz/introduction";
import { installationQuestions } from "./quiz/installation";
import { cliReplQuestions } from "./quiz/cli-repl";
import { claudeMdMemoireQuestions } from "./quiz/claude-md-memoire";
import { outilsQuestions } from "./quiz/outils";
import { permissionsQuestions } from "./quiz/permissions";
import { skillsQuestions } from "./quiz/skills";
import { mcpQuestions } from "./quiz/mcp";
import { agentsQuestions } from "./quiz/agents";
import { hooksQuestions } from "./quiz/hooks";
import { planModeQuestions } from "./quiz/plan-mode";
import { bonnesPratiquesQuestions } from "./quiz/bonnes-pratiques";

export const quizQuestions: QuizQuestion[] = [
  ...introductionQuestions,
  ...installationQuestions,
  ...cliReplQuestions,
  ...claudeMdMemoireQuestions,
  ...outilsQuestions,
  ...permissionsQuestions,
  ...skillsQuestions,
  ...mcpQuestions,
  ...agentsQuestions,
  ...hooksQuestions,
  ...planModeQuestions,
  ...bonnesPratiquesQuestions,
];

export function getQuestionsByCategory(categorySlug: string) {
  return quizQuestions.filter((q) => q.categorySlug === categorySlug);
}

export function getQuestionCountByCategory(categorySlug: string) {
  return quizQuestions.filter((q) => q.categorySlug === categorySlug).length;
}
