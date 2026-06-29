import type { Metadata } from "next";
import { FichesTabs } from "@/components/fiches-tabs";

export const metadata: Metadata = {
  title: "Fiches de révision — Claude Expert",
  description:
    "Référence rapide sur Claude Code : commandes slash, raccourcis, CLAUDE.md, Hooks, MCP, Agents, Skills — plus le journal des dernières nouveautés Claude.",
};

export default function FichesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Fiches de révision
        </h1>
        <p className="mt-3 text-muted-foreground">
          Référence rapide à garder sous la main : commandes, raccourcis, configurations et
          patterns essentiels — plus le journal de toutes les évolutions de Claude et Claude Code.
        </p>
      </div>

      <FichesTabs />
    </div>
  );
}
