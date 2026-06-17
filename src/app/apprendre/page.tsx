import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicIcon } from "@/components/dynamic-icon";
import { LevelBadge } from "@/components/level-badge";
import { modules } from "@/lib/modules";

export const metadata: Metadata = {
  title: "Apprendre — Claude Expert",
  description: "Les 12 modules pour devenir expert de Claude Code, du premier lancement à l'expertise avancée.",
};

export default function ApprendrePage() {
  const sorted = [...modules].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Le parcours de formation
        </h1>
        <p className="mt-3 text-muted-foreground">
          12 modules ordonnés. Suivez-les dans l&apos;ordre pour une progression cohérente, des
          bases jusqu&apos;aux mécanismes avancés (Skills, MCP, Agents, Hooks).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((m) => (
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
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {m.duration}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Lire
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
