import Link from "next/link";
import { ArrowRight, CheckCircle2, ListChecks, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/dynamic-icon";
import { LevelBadge } from "@/components/level-badge";
import { modules } from "@/lib/modules";
import { quizCategories } from "@/lib/quiz-categories";
import { quizQuestions } from "@/lib/quiz-data";

export default function Home() {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);
  const totalQuestions = quizQuestions.length;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-hero-glow border-b border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 sm:py-28">
          <Badge variant="outline" className="gap-2 border-primary/30 bg-primary/5 px-3 py-1 text-primary">
            <Sparkles className="size-3.5" />
            Une formation WeHighTech — complète, non officielle, à Claude Code
          </Badge>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Devenez{" "}
            <span className="bg-gradient-to-r from-primary to-chart-5 bg-clip-text text-transparent">
              expert Claude Code
            </span>{" "}
            le plus vite possible
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            {sortedModules.length} modules pour maîtriser les bases, CLAUDE.md, les Skills, MCP,
            les Agents, les Hooks et le Plan Mode — puis {totalQuestions} questions de quiz
            corrigées et expliquées pour valider chaque acquis.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/apprendre" />}>
              Commencer à apprendre
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/quiz" />}>
              <ListChecks className="size-4" />
              Tester mes connaissances
            </Button>
          </div>

          <div className="grid w-full max-w-2xl grid-cols-3 gap-4 pt-6">
            <Stat value={`${sortedModules.length}`} label="Modules de cours" />
            <Stat value={`${totalQuestions}`} label="Questions de quiz" />
            <Stat value={`${quizCategories.length}`} label="Catégories" />
          </div>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <FeaturePoint
            title="Du concret, pas de la théorie creuse"
            description="Chaque module est écrit pour être appliqué immédiatement dans votre terminal : commandes, fichiers de config, exemples réels."
          />
          <FeaturePoint
            title="Tous les piliers de l'expertise"
            description="CLAUDE.md, Skills, MCP, Agents, Hooks, Plan Mode, permissions : la formation couvre l'écosystème complet, pas seulement les bases."
          />
          <FeaturePoint
            title="Vérifiez vraiment vos acquis"
            description="Chaque question de quiz est corrigée avec une explication — vous comprenez le pourquoi, pas seulement la bonne réponse."
          />
        </div>
      </section>

      {/* Modules */}
      <section className="border-t border-border/60 bg-secondary/20 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Le parcours de formation
              </h2>
              <p className="mt-2 text-muted-foreground">
                12 modules ordonnés, du premier lancement à l&apos;expertise avancée.
              </p>
            </div>
            <Button variant="ghost" render={<Link href="/apprendre" />}>
              Voir tous les modules
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedModules.map((m) => (
              <Link key={m.slug} href={`/apprendre/${m.slug}`} className="group">
                <Card className="h-full transition-all hover:border-primary/40 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <DynamicIcon name={m.icon} className="size-5" />
                      </span>
                      <LevelBadge level={m.level} />
                    </div>
                    <CardTitle className="pt-2 text-base leading-snug">
                      {m.order}. {m.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{m.summary}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Section Quiz : {totalQuestions} questions corrigées
            </h2>
            <p className="mt-2 text-muted-foreground">
              QCM avec explications détaillées, organisés par catégorie ou en mode examen complet.
            </p>
          </div>
          <Button variant="ghost" render={<Link href="/quiz" />}>
            Aller au quiz
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quizCategories.map((c) => (
            <Link key={c.slug} href={`/quiz/${c.slug}`}>
              <Card className="h-full transition-all hover:border-primary/40 hover:shadow-md">
                <CardContent className="flex items-start gap-3 pt-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <DynamicIcon name={c.icon} className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-snug">{c.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="border-t border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Prêt à devenir expert Claude Code ?
          </h2>
          <p className="max-w-xl text-primary-foreground/80">
            Commencez par le module « Qu&apos;est-ce que Claude Code ? », puis enchaînez les
            modules dans l&apos;ordre pour une progression cohérente.
          </p>
          <Button size="lg" variant="secondary" render={<Link href="/apprendre/introduction" />}>
            Démarrer le module 1
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 px-4 py-3">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function FeaturePoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-border/60 bg-card p-5">
      <CheckCircle2 className="size-5 shrink-0 text-primary" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
