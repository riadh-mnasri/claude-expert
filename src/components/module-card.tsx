"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicIcon } from "@/components/dynamic-icon";
import { LevelBadge } from "@/components/level-badge";
import { cn } from "@/lib/utils";
import {
  getModulesReadServerSnapshot,
  getModulesReadSnapshot,
} from "@/lib/progress-storage";
import type { Module } from "@/lib/types";

function useModulesRead() {
  return useSyncExternalStore(
    () => () => {},
    getModulesReadSnapshot,
    getModulesReadServerSnapshot
  );
}

export function ModuleCard({ module, showMeta = false }: { module: Module; showMeta?: boolean }) {
  const modulesRead = useModulesRead();
  const isRead = modulesRead.includes(module.slug);

  return (
    <Link href={`/apprendre/${module.slug}`} className="group block h-full">
      <Card
        className={cn(
          "card-hover h-full border-border/60 hover:border-primary/40",
          isRead && "border-emerald-500/25"
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <span className="relative flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-chart-5/15 text-primary">
              <DynamicIcon name={module.icon} className="size-5" />
              {isRead && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-card">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              )}
            </span>
            <LevelBadge level={module.level} />
          </div>
          <CardTitle className="pt-2 text-base leading-snug">
            {module.order}. {module.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{module.summary}</p>
          {showMeta && (
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {module.duration}
              </span>
              <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Lire
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
