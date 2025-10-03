import type { CategoryT } from "@/types/category.type"
import { getQuestionStats } from "./question/questionData"
import { parseMDXCategories } from "@/lib/parse-mdx-categories"

// export const CATEGORIES_DATA: CategoryT[] = [
//   {
//     id: "javascript",
//     name: "JavaScript",
//     slug: "javascript",
//     icon: "⚡",
//     color: "from-yellow-500 to-orange-500",
//     description: "Master JavaScript fundamentals, ES6+ features, async programming, and modern JavaScript patterns",
//   },
//   {
//     id: "python",
//     name: "Python",
//     slug: "python",
//     icon: "🐍",
//     color: "from-blue-500 to-cyan-500",
//     description: "Test your Python skills including syntax, data structures, OOP, and Pythonic coding practices",
//   },
//   {
//     id: "react",
//     name: "React",
//     slug: "react",
//     icon: "⚛️",
//     color: "from-cyan-400 to-blue-500",
//     description: "Evaluate your React knowledge covering hooks, components, state management, and best practices",
//   },
//   {
//     id: "data-structures",
//     name: "Data Structures",
//     slug: "data-structures",
//     icon: "🔗",
//     color: "from-purple-500 to-pink-500",
//     description: "Challenge yourself with arrays, linked lists, trees, graphs, and fundamental data structures",
//   },
//   {
//     id: "algorithms",
//     name: "Algorithms",
//     slug: "algorithms",
//     icon: "🧮",
//     color: "from-green-500 to-emerald-500",
//     description: "Solve algorithmic problems including sorting, searching, dynamic programming, and optimization",
//   },
//   {
//     id: "system-design",
//     name: "System Design",
//     slug: "system-design",
//     icon: "🏗️",
//     color: "from-red-500 to-orange-500",
//     description: "Explore scalability, distributed systems, caching strategies, and architectural patterns",
//   },
//   {
//     id: "database",
//     name: "Database",
//     slug: "database",
//     icon: "🗄️",
//     color: "from-indigo-500 to-purple-500",
//     description: "Test your database knowledge including SQL, NoSQL, indexing, transactions, and optimization",
//   },
//   {
//     id: "web-development",
//     name: "Web Development",
//     slug: "web-development",
//     icon: "🌐",
//     color: "from-teal-500 to-green-500",
//     description: "Assess your web development skills covering HTML, CSS, HTTP, APIs, and web fundamentals",
//   },
// ]

export const CATEGORIES_DATA: CategoryT[] = parseMDXCategories()

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
