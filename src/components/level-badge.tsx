import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Level } from "@/lib/types";

const LEVEL_STYLES: Record<Level, string> = {
  Débutant:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  Intermédiaire:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  Avancé: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <Badge variant="outline" className={cn("border", LEVEL_STYLES[level])}>
      {level}
    </Badge>
  );
}
