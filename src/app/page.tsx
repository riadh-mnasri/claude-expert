import Link from "next/link";
import { ArrowRight, BookMarked, CheckCircle2, ListChecks, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/dynamic-icon";
import { ModuleCard } from "@/components/module-card";
import { modules } from "@/lib/modules";
import { quizCategories } from "@/lib/quiz-categories";
import { quizQuestions } from "@/lib/quiz-data";
import { fiches, nouveautes } from "@/lib/fiches-data";

export default function Home() {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);
  const totalQuestions = quizQuestions.length;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="bg-hero-glow bg-dot-grid absolute inset-0" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 sm:py-28">
          <Badge
            variant="outline"
            className="gap-2 border-primary/30 bg-background/80 px-3 py-1 text-primary shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            Une formation indépendante de WeHighTech sur Claude Code
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
            <Button size="lg" className="shadow-lg shadow-primary/20" render={<Link href="/apprendre" />}>
              Commencer à apprendre
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur-sm" render={<Link href="/quiz" />}>
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
              <ModuleCard key={m.slug} module={m} />
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
              <Card className="card-hover h-full border-border/60 hover:border-primary/40">
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

      {/* Fiches teaser */}
      <section className="border-t border-border/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Fiches de révision & Nouveautés
              </h2>
              <p className="mt-2 text-muted-foreground">
                Référence rapide à garder sous la main, et le journal de toutes les évolutions de Claude.
              </p>
            </div>
            <Button variant="ghost" render={<Link href="/fiches" />}>
              Explorer les fiches
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/fiches">
              <Card className="card-hover h-full border-border/60 hover:border-primary/40">
                <CardContent className="flex items-start gap-3 pt-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <BookMarked className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Fiches de révision</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {fiches.length} fiches de référence : commandes slash, raccourcis, CLAUDE.md, Hooks, MCP, Agents, Skills.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/fiches">
              <Card className="card-hover h-full border-border/60 hover:border-primary/40">
                <CardContent className="flex items-start gap-3 pt-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Sparkles className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Nouveautés Claude</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {nouveautes.length} mises à jour : Fable 5, famille Claude 4, Fast Mode, agents planifiés, boucles autonomes…
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="relative overflow-hidden border-t border-border/60 bg-primary text-primary-foreground">
        <div className="bg-dot-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Prêt à devenir expert Claude Code ?
          </h2>
          <p className="max-w-xl text-primary-foreground/80">
            Commencez par le module « Qu&apos;est-ce que Claude Code ? », puis enchaînez les
            modules dans l&apos;ordre pour une progression cohérente.
          </p>
          <Button size="lg" variant="secondary" className="shadow-lg" render={<Link href="/apprendre/introduction" />}>
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
    <div className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 shadow-sm backdrop-blur-sm">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function FeaturePoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="card-hover flex gap-3 rounded-xl border border-border/60 bg-card p-5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-chart-5/15 text-primary">
        <CheckCircle2 className="size-5" />
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
