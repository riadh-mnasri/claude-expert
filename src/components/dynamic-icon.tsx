import {
  Sparkles,
  Terminal,
  SquareTerminal,
  BookOpen,
  Wrench,
  ShieldCheck,
  GraduationCap,
  Plug,
  Bot,
  Webhook,
  ListChecks,
  Rocket,
  type LucideProps,
} from "lucide-react";

const ICONS = {
  Sparkles,
  Terminal,
  SquareTerminal,
  BookOpen,
  Wrench,
  ShieldCheck,
  GraduationCap,
  Plug,
  Bot,
  Webhook,
  ListChecks,
  Rocket,
} as const;

export type IconName = keyof typeof ICONS;

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICONS[name as IconName] ?? Sparkles;
  return <Icon {...props} />;
}
