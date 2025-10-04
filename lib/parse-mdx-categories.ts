// import type { CategoryT } from "@/types/category.type"
// import fs from "fs"
// import path from "path"
// import matter from "gray-matter"

// /**
//  * Parse the categoryData.mdx file and convert it to an array
//  */
// export function parseMDXCategories(): CategoryT[] {
//   try {
//     // Read the MDX file
//     const mdxPath = path.join(process.cwd(), "database", "categoryData.mdx")
//     const fileContents = fs.readFileSync(mdxPath, "utf8")

//     // Parse the frontmatter
//     const { data } = matter(fileContents)

//     // Convert the categories from the frontmatter to the CategoryT format
//     if (data.categories && Array.isArray(data.categories)) {
//       return data.categories.map((cat: any) => ({
//         id: cat.id,
//         name: cat.name,
//         slug: cat.slug,
//         description: cat.description,
//         icon: cat.icon,
//         color: cat.color,
//       }))
//     }

//     return []
//   } catch (error) {
//     console.error("Error parsing MDX categories:", error)
//     return []
//   }
// }


import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import type { CategoryT } from "@/types/category.type";

// Direct import of the MDX file as a raw string
// ✅ Works in Next.js (with mdx/loader or contentlayer setup)
// If not configured, add `?raw` to import MDX as plain text (Vite-style)
//@ts-ignore
import categoryData from "@/database/categoryData.mdx?raw";

/**
 * Parse the categoryData.mdx file and convert it to an array of CategoryT
 */
export async function parseMDXCategories(): Promise<CategoryT[]> {
  try {
    // Extract frontmatter using gray-matter
    const { data, content } = matter(categoryData);

    // Optionally compile MDX content (if you need rendered output later)
    await compile(content, { outputFormat: "function-body" });

    // Map categories from frontmatter
    if (Array.isArray(data.categories)) {
      return data.categories.map((cat: any): CategoryT => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        color: cat.color,
        description: cat.description,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error parsing MDX categories:", error);
    return [];
  }
}
