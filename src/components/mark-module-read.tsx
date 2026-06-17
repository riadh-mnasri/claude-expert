"use client";

import { useEffect } from "react";
import { markModuleRead } from "@/lib/progress-storage";

export function MarkModuleRead({ slug }: { slug: string }) {
  useEffect(() => {
    markModuleRead(slug);
  }, [slug]);

  return null;
}
