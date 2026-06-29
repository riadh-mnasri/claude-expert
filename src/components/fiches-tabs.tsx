"use client";

import { useState } from "react";
import { BookMarked, ChevronDown, Code2, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DynamicIcon } from "@/components/dynamic-icon";
import { cn } from "@/lib/utils";
import {
  fiches,
  nouveautes,
  type FicheCategory,
} from "@/lib/fiches-data";

type Filter = FicheCategory | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "cli", label: "CLI" },
  { value: "config", label: "Configuration" },
  { value: "architecture", label: "Architecture" },
  { value: "workflow", label: "Workflow" },
];

const CATEGORY_STYLES: Record<
  FicheCategory,
  { border: string; badge: string; iconBg: string; iconColor: string }
> = {
  cli: {
    border: "border-l-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-700 dark:text-emerald-400",
  },
  config: {
    border: "border-l-blue-500",
    badge: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-700 dark:text-blue-400",
  },
  architecture: {
    border: "border-l-violet-500",
    badge: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-700 dark:text-violet-400",
  },
  workflow: {
    border: "border-l-amber-500",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-700 dark:text-amber-400",
  },
};

const IMPACT_DOT: Record<string, string> = {
  majeur: "bg-primary",
  important: "bg-blue-500",
  mineur: "bg-muted-foreground/50",
};

const IMPACT_LABEL: Record<string, string> = {
  majeur: "Majeur",
  important: "Important",
  mineur: "Mineur",
};

const TYPE_BADGE: Record<string, string> = {
  "Modèle": "bg-primary/10 text-primary",
  "Claude Code": "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  "API": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Plateforme": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

function CodeToggle({ code }: { code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border/40">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1.5 px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <Code2 className="size-3 shrink-0" />
        {open ? "Masquer l'exemple" : "Voir un exemple"}
        <ChevronDown
          className={cn(
            "ml-auto size-3 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <pre className="overflow-x-auto whitespace-pre border-t border-border/40 bg-muted/50 px-4 py-3 font-mono text-[11px] leading-relaxed text-foreground/80">
          {code}
        </pre>
      )}
    </div>
  );
}

export function FichesTabs() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered =
    activeFilter === "all"
      ? fiches
      : fiches.filter((f) => f.category === activeFilter);

  return (
    <Tabs defaultValue="fiches">
      <TabsList
        variant="line"
        className="mb-8 h-auto w-full justify-start gap-1 rounded-none border-b border-border/60 bg-transparent pb-0"
      >
        <TabsTrigger
          value="fiches"
          className="gap-2 rounded-none border-b-2 border-transparent pb-3 pt-1 text-sm data-active:border-primary"
        >
          <BookMarked className="size-4" />
          Fiches de révision
        </TabsTrigger>
        <TabsTrigger
          value="nouveautes"
          className="gap-2 rounded-none border-b-2 border-transparent pb-3 pt-1 text-sm data-active:border-primary"
        >
          <Sparkles className="size-4" />
          Nouveautés Claude
        </TabsTrigger>
      </TabsList>

      {/* ── Fiches tab ─────────────────────────────────── */}
      <TabsContent value="fiches">
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                activeFilter === f.value
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((fiche) => {
            const s = CATEGORY_STYLES[fiche.category];
            return (
              <div
                key={fiche.slug}
                className={cn(
                  "flex flex-col overflow-hidden rounded-xl border border-l-4 border-border/60 bg-card",
                  s.border
                )}
              >
                <div className="flex items-center gap-3 border-b border-border/40 px-4 py-3">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg",
                      s.iconBg,
                      s.iconColor
                    )}
                  >
                    <DynamicIcon name={fiche.icon} className="size-4" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm font-semibold">
                    {fiche.title}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                      s.badge
                    )}
                  >
                    {fiche.categoryLabel}
                  </span>
                </div>

                <div className="flex-1 divide-y divide-border/30">
                  {fiche.entries.map((entry) => (
                    <div key={entry.term} className="flex items-start gap-2 px-4 py-2">
                      <code className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] leading-snug text-foreground/80">
                        {entry.term}
                      </code>
                      <span className="text-xs leading-snug text-muted-foreground">
                        {entry.desc}
                      </span>
                    </div>
                  ))}
                </div>

                {fiche.code && <CodeToggle code={fiche.code} />}
              </div>
            );
          })}
        </div>
      </TabsContent>

      {/* ── Nouveautés tab ─────────────────────────────── */}
      <TabsContent value="nouveautes">
        <div className="relative pl-6 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-border/60">
          {nouveautes.map((item) => (
            <div key={item.id} className="relative mb-5 last:mb-0">
              <span
                className={cn(
                  "absolute -left-[23px] top-[22px] size-3 rounded-full border-2 border-background",
                  IMPACT_DOT[item.impact]
                )}
              />
              <div className="rounded-xl border border-border/60 bg-card p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium",
                      TYPE_BADGE[item.type]
                    )}
                  >
                    {item.type}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                      item.impact === "majeur"
                        ? "bg-primary/10 text-primary"
                        : item.impact === "important"
                        ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn("size-1.5 rounded-full", IMPACT_DOT[item.impact])}
                    />
                    {IMPACT_LABEL[item.impact]}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {item.period}
                  </span>
                </div>

                <h3 className="mb-3 font-semibold">{item.title}</h3>

                <ul className="space-y-1.5">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
