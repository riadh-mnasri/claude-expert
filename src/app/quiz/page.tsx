import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Flame, ListChecks } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/dynamic-icon";
import { ProgressBadge } from "@/components/quiz/progress-badge";
import { quizCategories } from "@/lib/quiz-categories";
import { getQuestionCountByCategory, quizQuestions } from "@/lib/quiz-data";

export const metadata: Metadata = {
  title: "Quiz — Claude Expert",
  description:
    "Quiz complet sur Claude Code : bases, CLAUDE.md, Skills, MCP, Agents, Hooks, Plan Mode et bonnes pratiques, avec solutions et explications.",
};

export default function QuizHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Section Quiz</h1>
        <p className="mt-3 text-muted-foreground">
          {quizQuestions.length} questions corrigées et expliquées, réparties en{" "}
          {quizCategories.length} catégories. Choisissez une catégorie pour réviser un thème
          précis, ou lancez l&apos;examen complet pour vous tester sur tout le programme.
        </p>
      </div>

      <Link href="/quiz/examen" className="mb-8 block">
        <Card className="card-hover relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-chart-5/10">
          <div className="bg-dot-grid absolute inset-0 opacity-40" />
          <CardContent className="relative flex items-center justify-between gap-4 pt-6">
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-5 text-primary-foreground shadow-md shadow-primary/20">
                <Flame className="size-5" />
              </span>
              <div>
                <p className="font-semibold">Examen complet</p>
                <p className="text-sm text-muted-foreground">
                  Les {quizQuestions.length} questions, toutes catégories mélangées
                </p>
              </div>
            </div>
            <ArrowRight className="size-5 text-primary" />
          </CardContent>
        </Card>
      </Link>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizCategories.map((c) => {
          const count = getQuestionCountByCategory(c.slug);
          return (
            <Link key={c.slug} href={`/quiz/${c.slug}`}>
              <Card className="card-hover h-full border-border/60 hover:border-primary/40">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-chart-5/15 text-primary">
                      <DynamicIcon name={c.icon} className="size-5" />
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ListChecks className="size-3.5" />
                      {count} questions
                    </span>
                  </div>
                  <p className="mt-3 font-semibold leading-snug">{c.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-4">
                    <ProgressBadge categorySlug={c.slug} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
