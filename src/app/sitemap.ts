import type { MetadataRoute } from "next";
import { modules } from "@/lib/modules";
import { quizCategories } from "@/lib/quiz-categories";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/apprendre`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/quiz`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/quiz/examen`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/progression`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const moduleRoutes: MetadataRoute.Sitemap = modules.map((module) => ({
    url: `${SITE_URL}/apprendre/${module.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const quizRoutes: MetadataRoute.Sitemap = quizCategories.map((category) => ({
    url: `${SITE_URL}/quiz/${category.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...moduleRoutes, ...quizRoutes];
}
