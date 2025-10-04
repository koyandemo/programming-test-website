import matter from "gray-matter"
import type { CategoryT } from "@/types/category"

import mdxContent from "@/database/categoryData.mdx?raw"

export function parseMDXCategories(): CategoryT[] {
  try {
    // Parse the MDX frontmatter
    const { data } = matter(mdxContent)

    // Extract categories from frontmatter
    if (data.categories && Array.isArray(data.categories)) {
      return data.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        color: cat.color,
        description: cat.description,
      }))
    }

    return []
  } catch (error) {
    console.error("[v0] Error parsing MDX categories:", error)
    return []
  }
}
