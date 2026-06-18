"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ModuleToc({ headings }: { headings: { id: string; label: string }[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headings.map((h) => h.id).join(",")]);

  return (
    <nav className="flex flex-col gap-1 border-l border-border pl-4 text-sm">
      {headings.map((h) => {
        const isActive = h.id === activeId;
        return (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={cn(
              "relative py-1 transition-colors",
              isActive ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <span className="absolute -left-4 top-0 h-full w-0.5 rounded-full bg-primary" />
            )}
            {h.label}
          </a>
        );
      })}
    </nav>
  );
}
