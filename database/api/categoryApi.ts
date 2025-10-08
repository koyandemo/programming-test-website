import type { CategoryT } from "@/types/category.type"
import { getQuestionStats } from "./questionApi"

let allCategories: any[] = []
try {
  const contentlayer = require("contentlayer/generated")
  allCategories = contentlayer.allCategories || []
} catch (error) {
  console.warn("[v0] Contentlayer categories not generated yet. Run 'npm run dev' to generate.")
  allCategories = []
}

export const CATEGORIES_DATA: CategoryT[] = allCategories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  slug: cat.slug,
  description: cat.description,
  icon: cat.icon,
  color: cat.color,
}))

export function getCategoriesWithStats(): CategoryT[] {
  const stats = getQuestionStats()

  return CATEGORIES_DATA.map((category) => ({
    ...category,
    questionCount: stats.byCategory[category.name] || 0,
  }))
}

export function getCategoryBySlug(slug: string): CategoryT | undefined {
  const stats = getQuestionStats()
  const category = CATEGORIES_DATA.find((cat) => cat.slug === slug)

  if (category) {
    return {
      ...category,
      questionCount: stats.byCategory[category.name] || 0,
    }
  }

  return undefined
}

export function getRelatedCategories(currentSlug: string, limit = 3): CategoryT[] {
  const stats = getQuestionStats()

  return CATEGORIES_DATA.filter((cat) => cat.slug !== currentSlug)
    .slice(0, limit)
    .map((category) => ({
      ...category,
      questionCount: stats.byCategory[category.name] || 0,
    }))
}
