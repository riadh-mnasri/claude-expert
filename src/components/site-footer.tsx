import Link from "next/link";
import { Sparkles } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4" />
          <span>
            Claude Expert — Une formation proposée par{" "}
            <span className="font-medium text-foreground">WeHighTech</span>, non officielle à
            Claude Code.
          </span>
        </div>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/apprendre" className="hover:text-foreground">
            Apprendre
          </Link>
          <Link href="/quiz" className="hover:text-foreground">
            Quiz
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {year} WeHighTech — Riadh MNASRI. Tous droits réservés.
      </div>
    </footer>
  );
}
