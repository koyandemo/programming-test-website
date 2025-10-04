import type { CategoryT } from "@/types/category.type";
import { getQuestionStats } from "../question/questionData";
import matter from "gray-matter";
//@ts-ignore
import categoryData from "../mdx/categoryData.mdx?raw";


function parseMDXCategories(): CategoryT[] {
  const { data } = matter(categoryData);
  return data.categories || [];
}

export const CATEGORIES_DATA: CategoryT[] = parseMDXCategories();

export function getCategoriesWithStats(): CategoryT[] {
  const stats = getQuestionStats();

  return CATEGORIES_DATA.map((category) => ({
    ...category,
    questionCount: stats.byCategory[category.name] || 0,
  }));
}

export function getCategoryBySlug(slug: string): CategoryT | undefined {
  const stats = getQuestionStats();
  const category = CATEGORIES_DATA.find((cat) => cat.slug === slug);

  if (category) {
    return {
      ...category,
      questionCount: stats.byCategory[category.name] || 0,
    };
  }

  return undefined;
}

export function getRelatedCategories(
  currentSlug: string,
  limit = 3
): CategoryT[] {
  const stats = getQuestionStats();

  return CATEGORIES_DATA.filter((cat) => cat.slug !== currentSlug)
    .slice(0, limit)
    .map((category) => ({
      ...category,
      questionCount: stats.byCategory[category.name] || 0,
    }));
}
