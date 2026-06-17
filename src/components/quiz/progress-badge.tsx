"use client";

import { useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/badge";
import { readQuizEntry } from "@/lib/progress-storage";

function useProgressEntry(categorySlug: string) {
  return useSyncExternalStore(
    () => () => {},
    () => readQuizEntry(categorySlug),
    () => null
  );
}

export function ProgressBadge({ categorySlug }: { categorySlug: string }) {
  const entry = useProgressEntry(categorySlug);

  if (!entry) return null;

  const pct = Math.round((entry.score / entry.total) * 100);

  return (
    <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
      Dernier score : {entry.score}/{entry.total} ({pct}%)
    </Badge>
  );
}
