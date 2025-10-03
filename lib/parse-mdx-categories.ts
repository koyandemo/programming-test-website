import type { CategoryT } from "@/types/category.type"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

/**
 * Parse the categoryData.mdx file and convert it to an array
 */
export function parseMDXCategories(): CategoryT[] {
  try {
    // Read the MDX file
    const mdxPath = path.join(process.cwd(), "database", "categoryData.mdx")
    const fileContents = fs.readFileSync(mdxPath, "utf8")

    // Parse the frontmatter
    const { data } = matter(fileContents)

    // Convert the categories from the frontmatter to the CategoryT format
    if (data.categories && Array.isArray(data.categories)) {
      return data.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
      }))
    }

    return []
  } catch (error) {
    console.error("Error parsing MDX categories:", error)
    return []
  }
}
