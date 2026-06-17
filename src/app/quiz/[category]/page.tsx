import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { quizCategories } from "@/lib/quiz-categories";
import { getQuestionsByCategory, quizQuestions } from "@/lib/quiz-data";

export function generateStaticParams() {
  return [...quizCategories.map((c) => ({ category: c.slug })), { category: "examen" }];
}

function resolveCategory(slug: string) {
  if (slug === "examen") {
    return { title: "Examen complet", questions: quizQuestions };
  }
  const category = quizCategories.find((c) => c.slug === slug);
  if (!category) return null;
  return { title: category.title, questions: getQuestionsByCategory(slug) };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolved = resolveCategory(category);
  if (!resolved) return {};
  return {
    title: `Quiz — ${resolved.title} — Claude Expert`,
    description: `${resolved.questions.length} questions corrigées sur ${resolved.title}.`,
  };
}

export default async function QuizCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolved = resolveCategory(category);
  if (!resolved) notFound();

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-6">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Toutes les catégories
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{resolved.title}</h1>
      </div>
      <QuizRunner questions={resolved.questions} title={resolved.title} categorySlug={category} />
    </div>
  );
}
