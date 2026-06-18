"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ListChecks,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadialProgress } from "@/components/radial-progress";
import { cn } from "@/lib/utils";
import { persistQuizScore } from "@/lib/progress-storage";
import type { QuizQuestion } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Facile: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Moyen: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Difficile: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

interface Answer {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

// L'ordre mélangé ne peut être calculé que côté client (Math.random) : on rend
// l'ordre original pendant le SSR/l'hydratation, puis on mélange une fois monté,
// pour éviter un mismatch d'hydratation entre serveur et client.
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function QuizRunner({
  questions,
  title,
  categorySlug,
}: {
  questions: QuizQuestion[];
  title: string;
  categorySlug: string;
}) {
  const hydrated = useHydrated();
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const order = useMemo(
    () => (hydrated ? shuffle(questions) : questions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hydrated, questions, shuffleSeed]
  );
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);

  const current = order[index];
  const progressPct = Math.round((index / order.length) * 100);
  const score = useMemo(() => answers.filter((a) => a.correct).length, [answers]);

  function handleValidate() {
    if (selected === null || !current) return;
    setRevealed(true);
    setAnswers((prev) => [
      ...prev,
      {
        questionId: current.id,
        selectedIndex: selected,
        correct: selected === current.answerIndex,
      },
    ]);
  }

  function handleNext() {
    if (index + 1 >= order.length) {
      setFinished(true);
      persistScore();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function persistScore() {
    persistQuizScore(categorySlug, {
      score,
      total: order.length,
      date: new Date().toISOString(),
    });
  }

  function handleRestart() {
    setShuffleSeed((s) => s + 1);
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const finalScore = answers.filter((a) => a.correct).length;
    const pct = Math.round((finalScore / order.length) * 100);
    const tier =
      pct >= 80
        ? { ring: "stroke-emerald-500", icon: "text-emerald-600 bg-emerald-500/10" }
        : pct >= 50
          ? { ring: "stroke-amber-500", icon: "text-amber-600 bg-amber-500/10" }
          : { ring: "stroke-rose-500", icon: "text-rose-600 bg-rose-500/10" };
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <RadialProgress value={pct} size={128} strokeWidth={10} indicatorClassName={tier.ring} className="mx-auto mb-6">
          <span className={cn("flex size-16 items-center justify-center rounded-full", tier.icon)}>
            <Trophy className="size-7" />
          </span>
        </RadialProgress>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Résultat : {title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Score : <span className="font-semibold text-foreground">{finalScore}</span> /{" "}
          {order.length} ({pct}%)
        </p>

        <div className="mt-10 space-y-4 text-left">
          <h2 className="text-lg font-semibold">Révision détaillée</h2>
          {order.map((q, i) => {
            const a = answers[i];
            return (
              <Card key={q.id} className={cn(a?.correct ? "border-emerald-500/30" : "border-rose-500/30")}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    {a?.correct ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    ) : (
                      <XCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{q.question}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Réponse correcte : </span>
                        {q.options[q.answerIndex]}
                      </p>
                      {!a?.correct && (
                        <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                          Votre réponse : {q.options[a?.selectedIndex ?? 0]}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">{q.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={handleRestart} variant="outline">
            <RotateCcw className="size-4" />
            Recommencer ce quiz
          </Button>
          <Button render={<Link href="/quiz" />}>
            <ListChecks className="size-4" />
            Toutes les catégories
          </Button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {index + 1} / {order.length}
          </span>
          <span>
            Score provisoire : {score}/{answers.length}
          </span>
        </div>
        <Progress value={progressPct} />
      </div>

      <Card key={current.id} className="animate-in fade-in-0 slide-in-from-bottom-2 shadow-sm duration-300">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <Badge
              variant="outline"
              className={cn("border-0", DIFFICULTY_STYLES[current.difficulty])}
            >
              {current.difficulty}
            </Badge>
          </div>

          <h2 className="text-lg font-semibold leading-snug">{current.question}</h2>

          <div className="mt-5 flex flex-col gap-2">
            {current.options.map((option, i) => {
              const isSelected = selected === i;
              const isCorrectOption = i === current.answerIndex;
              return (
                <button
                  key={option}
                  type="button"
                  data-testid="quiz-option"
                  disabled={revealed}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all",
                    !revealed &&
                      isSelected &&
                      "border-primary bg-primary/5 ring-1 ring-primary",
                    !revealed && !isSelected && "border-border hover:border-primary/40 hover:bg-muted/40",
                    revealed && isCorrectOption && "border-emerald-500 bg-emerald-500/10",
                    revealed &&
                      isSelected &&
                      !isCorrectOption &&
                      "border-rose-500 bg-rose-500/10",
                    revealed && !isSelected && !isCorrectOption && "border-border opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                      !revealed && isSelected && "bg-primary text-primary-foreground",
                      !revealed && !isSelected && "bg-muted text-muted-foreground",
                      revealed && isCorrectOption && "bg-emerald-500 text-white",
                      revealed && isSelected && !isCorrectOption && "bg-rose-500 text-white",
                      revealed && !isSelected && !isCorrectOption && "bg-muted text-muted-foreground"
                    )}
                  >
                    {revealed && isCorrectOption ? (
                      <CheckCircle2 className="size-3.5" />
                    ) : revealed && isSelected && !isCorrectOption ? (
                      <XCircle className="size-3.5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {revealed && (
            <div className="mt-5 animate-in fade-in-0 rounded-lg bg-secondary/50 p-4 text-sm">
              <p className="font-medium">Explication</p>
              <p className="mt-1 text-muted-foreground">{current.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!revealed ? (
              <Button data-testid="quiz-validate" onClick={handleValidate} disabled={selected === null}>
                Valider
              </Button>
            ) : (
              <Button data-testid="quiz-next" onClick={handleNext}>
                {index + 1 >= order.length ? "Voir les résultats" : "Question suivante"}
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
