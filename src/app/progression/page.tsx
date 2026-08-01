import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress-dashboard";

export const metadata: Metadata = {
  title: "Ma progression",
  description: "Suivez votre avancement dans les modules de cours et vos scores aux quiz Claude Code.",
};

export default function ProgressionPage() {
  return <ProgressDashboard />;
}
