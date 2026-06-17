"use client";

import { useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/badge";

interface ProgressEntry {
  score: number;
  total: number;
  date: string;
}

function readEntry(categorySlug: string): ProgressEntry | null {
  try {
    const raw = window.localStorage.getItem("claude-expert-quiz-progress");
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data[categorySlug] ?? null;
  } catch {
    return null;
  }
}

function useProgressEntry(categorySlug: string) {
  return useSyncExternalStore(
    () => () => {},
    () => readEntry(categorySlug),
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
