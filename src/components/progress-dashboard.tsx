"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  ListChecks,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DynamicIcon } from "@/components/dynamic-icon";
import { modules } from "@/lib/modules";
import { quizCategories } from "@/lib/quiz-categories";
import {
  clearAllProgress,
  getModulesReadServerSnapshot,
  getModulesReadSnapshot,
  getQuizProgressServerSnapshot,
  getQuizProgressSnapshot,
} from "@/lib/progress-storage";

function useModulesRead() {
  return useSyncExternalStore(
    () => () => {},
    getModulesReadSnapshot,
    getModulesReadServerSnapshot
  );
}

function useQuizProgress() {
  return useSyncExternalStore(
    () => () => {},
    getQuizProgressSnapshot,
    getQuizProgressServerSnapshot
  );
}

export function ProgressDashboard() {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);
  const modulesRead = useModulesRead();
  const quizProgress = useQuizProgress();
  const [resetCount, setResetCount] = useState(0);

  const readSet = new Set(modulesRead);
  const modulesReadCount = sortedModules.filter((m) => readSet.has(m.slug)).length;
  const categoriesTested = quizCategories.filter((c) => quizProgress[c.slug]).length;

  const scoredCategories = quizCategories.filter((c) => quizProgress[c.slug]);
  const averageScorePct = scoredCategories.length
    ? Math.round(
        (scoredCategories.reduce(
          (sum, c) => sum + quizProgress[c.slug].score / quizProgress[c.slug].total,
          0
        ) /
          scoredCategories.length) *
          100
      )
    : 0;

  const nextModule = sortedModules.find((m) => !readSet.has(m.slug));
  const overallPct = Math.round(
    ((modulesReadCount + categoriesTested) / (sortedModules.length + quizCategories.length)) * 100
  );

  function handleReset() {
    if (
      typeof window !== "undefined" &&
      window.confirm("Réinitialiser toute votre progression (modules lus et scores de quiz) ?")
    ) {
      clearAllProgress();
      setResetCount((n) => n + 1);
    }
  }

  return (
    <div key={resetCount} className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Votre progression</h1>
          <p className="mt-3 text-muted-foreground">
            Suivi local de votre avancement : modules lus et scores de quiz, enregistrés dans ce
            navigateur.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="size-4" />
          Réinitialiser
        </Button>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<BookOpen className="size-5" />}
          value={`${modulesReadCount}/${sortedModules.length}`}
          label="Modules lus"
        />
        <StatCard
          icon={<ListChecks className="size-5" />}
          value={`${categoriesTested}/${quizCategories.length}`}
          label="Catégories testées"
        />
        <StatCard
          icon={<Trophy className="size-5" />}
          value={scoredCategories.length ? `${averageScorePct}%` : "—"}
          label="Score moyen aux quiz"
        />
      </div>

      <div className="mb-10 rounded-xl border border-border bg-card p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">Progression globale</span>
          <span className="text-muted-foreground">{overallPct}%</span>
        </div>
        <Progress value={overallPct} />
        {nextModule ? (
          <Button className="mt-4" render={<Link href={`/apprendre/${nextModule.slug}`} />}>
            Continuer avec « {nextModule.title} »
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button className="mt-4" render={<Link href="/quiz/examen" />}>
            Tous les modules sont lus — lancer l&apos;examen complet
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-lg font-semibold">Modules</h2>
          <div className="flex flex-col gap-2">
            {sortedModules.map((m) => {
              const isRead = readSet.has(m.slug);
              return (
                <Link key={m.slug} href={`/apprendre/${m.slug}`}>
                  <Card className="transition-colors hover:border-primary/40">
                    <CardContent className="flex items-center gap-3 py-3">
                      {isRead ? (
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      ) : (
                        <Circle className="size-4 shrink-0 text-muted-foreground" />
                      )}
                      <DynamicIcon name={m.icon} className="size-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1 text-sm font-medium">
                        {m.order}. {m.title}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Quiz</h2>
          <div className="flex flex-col gap-2">
            {quizCategories.map((c) => {
              const entry = quizProgress[c.slug];
              const pct = entry ? Math.round((entry.score / entry.total) * 100) : null;
              return (
                <Link key={c.slug} href={`/quiz/${c.slug}`}>
                  <Card className="transition-colors hover:border-primary/40">
                    <CardContent className="flex items-center gap-3 py-3">
                      {entry ? (
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      ) : (
                        <Circle className="size-4 shrink-0 text-muted-foreground" />
                      )}
                      <DynamicIcon name={c.icon} className="size-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1 text-sm font-medium">{c.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {entry ? `${entry.score}/${entry.total} (${pct}%)` : "À faire"}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
