import matter from "gray-matter"
import type { CategoryT } from "@/types/category.type"

// Direct import of the MDX file as a raw string
//@ts-ignore
import categoryData from "@/database/categoryData.mdx?raw"

/**
 * Parse the categoryData.mdx file and convert it to an array of CategoryT
 * Made function synchronous by removing async compile step
 */
export function parseMDXCategories(): CategoryT[] {
  try {
    // Extract frontmatter using gray-matter
    const { data } = matter(categoryData)

    // Map categories from frontmatter
    if (Array.isArray(data.categories)) {
      return data.categories.map(
        (cat: any): CategoryT => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          icon: cat.icon,
          color: cat.color,
          description: cat.description,
        }),
      )
    }

    return []
  } catch (error) {
    console.error("Error parsing MDX categories:", error)
    return []
  }
}
