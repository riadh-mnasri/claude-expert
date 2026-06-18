import type { Metadata } from "next";
import { ModuleCard } from "@/components/module-card";
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
          <ModuleCard key={m.slug} module={m} showMeta />
        ))}
      </div>
    </div>
  );
}
