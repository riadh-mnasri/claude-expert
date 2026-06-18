import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DynamicIcon } from "@/components/dynamic-icon";
import { LevelBadge } from "@/components/level-badge";
import { MarkdownContent } from "@/components/markdown-content";
import { MarkModuleRead } from "@/components/mark-module-read";
import { ModuleToc } from "@/components/module-toc";
import { ReadingProgressBar } from "@/components/reading-progress-bar";
import { getAdjacentModules, getModuleBySlug, modules } from "@/lib/modules";
import { getQuestionCountByCategory } from "@/lib/quiz-data";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) return {};
  return {
    title: `${mod.title} — Claude Expert`,
    description: mod.summary,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) notFound();

  const { prev, next } = getAdjacentModules(mod.slug);
  const questionCount = getQuestionCountByCategory(mod.slug);
  const headings = mod.sections.map((section) => ({
    id: slugify(section.heading),
    label: section.heading,
  }));

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_260px]">
      <ReadingProgressBar />
      <MarkModuleRead slug={mod.slug} />
      <article>
        <Link
          href="/apprendre"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Tous les modules
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-chart-5/15 text-primary">
            <DynamicIcon name={mod.icon} className="size-5" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Module {mod.order} / {modules.length}
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{mod.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{mod.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <LevelBadge level={mod.level} />
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="size-3.5" />
            {mod.duration} de lecture
          </span>
        </div>

        <Separator className="my-8" />

        <div className="space-y-10">
          {mod.sections.map((section) => (
            <section key={section.heading} id={slugify(section.heading)}>
              <h2 className="mb-3 text-xl font-semibold tracking-tight scroll-mt-24">
                {section.heading}
              </h2>
              <MarkdownContent content={section.body} />
            </section>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 to-chart-5/5 p-6">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <CheckCircle2 className="size-4 text-primary" />
            Points clés à retenir
          </h3>
          <ul className="space-y-2.5 text-sm">
            {mod.keyTakeaways.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {questionCount > 0 && (
          <Link href={`/quiz/${mod.slug}`} className="mt-6 block">
            <div className="card-hover flex items-center justify-between rounded-xl border border-border bg-card p-5 hover:border-primary/40">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <ListChecks className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Tester ce module</p>
                  <p className="text-xs text-muted-foreground">
                    {questionCount} questions corrigées sur « {mod.title} »
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </div>
          </Link>
        )}

        <div className="mt-10 flex items-center justify-between gap-4">
          {prev ? (
            <Button
              variant="outline"
              className="max-w-[48%] justify-start"
              render={<Link href={`/apprendre/${prev.slug}`} />}
            >
              <ArrowLeft className="size-4 shrink-0" />
              <span className="truncate">{prev.title}</span>
            </Button>
          ) : (
            <span />
          )}
          {next && (
            <Button className="max-w-[48%] justify-end" render={<Link href={`/apprendre/${next.slug}`} />}>
              <span className="truncate">{next.title}</span>
              <ArrowRight className="size-4 shrink-0" />
            </Button>
          )}
        </div>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Au sommaire
          </p>
          <ModuleToc headings={headings} />
        </div>
      </aside>
    </div>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
