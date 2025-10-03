import type { CategoryT } from "@/types/category.type"
import { getQuestionStats } from "./question/questionData"

// Markdown formatted category data
export const CATEGORIES_DATA_MARKDOWN = `
# JavaScript
**Slug:** javascript  
**Icon:** ⚡  
**Color:** from-yellow-500 to-orange-500  
**Description:** Master JavaScript fundamentals, ES6+ features, async programming, and modern JavaScript patterns

---

# Python
**Slug:** python  
**Icon:** 🐍  
**Color:** from-blue-500 to-cyan-500  
**Description:** Test your Python skills including syntax, data structures, OOP, and Pythonic coding practices

---

# React
**Slug:** react  
**Icon:** ⚛️  
**Color:** from-cyan-400 to-blue-500  
**Description:** Evaluate your React knowledge covering hooks, components, state management, and best practices

---

# Data Structures
**Slug:** data-structures  
**Icon:** 🔗  
**Color:** from-purple-500 to-pink-500  
**Description:** Challenge yourself with arrays, linked lists, trees, graphs, and fundamental data structures

---

# Algorithms
**Slug:** algorithms  
**Icon:** 🧮  
**Color:** from-green-500 to-emerald-500  
**Description:** Solve algorithmic problems including sorting, searching, dynamic programming, and optimization

---

# System Design
**Slug:** system-design  
**Icon:** 🏗️  
**Color:** from-red-500 to-orange-500  
**Description:** Explore scalability, distributed systems, caching strategies, and architectural patterns

---

# Database
**Slug:** database  
**Icon:** 🗄️  
**Color:** from-indigo-500 to-purple-500  
**Description:** Test your database knowledge including SQL, NoSQL, indexing, transactions, and optimization

---

# Web Development
**Slug:** web-development  
**Icon:** 🌐  
**Color:** from-teal-500 to-green-500  
**Description:** Assess your web development skills covering HTML, CSS, HTTP, APIs, and web fundamentals
`

// JSON array converted from markdown format
export const CATEGORIES_DATA_JSON: CategoryT[] = [
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    description: "Master JavaScript fundamentals, ES6+ features, async programming, and modern JavaScript patterns",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "python",
    name: "Python",
    slug: "python",
    description: "Test your Python skills including syntax, data structures, OOP, and Pythonic coding practices",
    icon: "🐍",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "react",
    name: "React",
    slug: "react",
    description: "Evaluate your React knowledge covering hooks, components, state management, and best practices",
    icon: "⚛️",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: "data-structures",
    name: "Data Structures",
    slug: "data-structures",
    description: "Challenge yourself with arrays, linked lists, trees, graphs, and fundamental data structures",
    icon: "🔗",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "algorithms",
    name: "Algorithms",
    slug: "algorithms",
    description: "Solve algorithmic problems including sorting, searching, dynamic programming, and optimization",
    icon: "🧮",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "system-design",
    name: "System Design",
    slug: "system-design",
    description: "Explore scalability, distributed systems, caching strategies, and architectural patterns",
    icon: "🏗️",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "database",
    name: "Database",
    slug: "database",
    description: "Test your database knowledge including SQL, NoSQL, indexing, transactions, and optimization",
    icon: "🗄️",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    description: "Assess your web development skills covering HTML, CSS, HTTP, APIs, and web fundamentals",
    icon: "🌐",
    color: "from-teal-500 to-green-500",
  },
]

// Get category with question count
export function getCategoriesWithStats(): CategoryT[] {
  const stats = getQuestionStats()

  return CATEGORIES_DATA_JSON.map((category) => ({
    ...category,
    questionCount: stats.byCategory[category.name] || 0,
  }))
}

// Get category by slug
export function getCategoryBySlug(slug: string): CategoryT | undefined {
  const stats = getQuestionStats()
  const category = CATEGORIES_DATA_JSON.find((cat) => cat.slug === slug)

  if (category) {
    return {
      ...category,
      questionCount: stats.byCategory[category.name] || 0,
    }
  }

  return undefined
}

// Get related categories (exclude current)
export function getRelatedCategories(currentSlug: string, limit = 3): CategoryT[] {
  const stats = getQuestionStats()

  return CATEGORIES_DATA_JSON.filter((cat) => cat.slug !== currentSlug)
    .slice(0, limit)
    .map((category) => ({
      ...category,
      questionCount: stats.byCategory[category.name] || 0,
    }))
}
