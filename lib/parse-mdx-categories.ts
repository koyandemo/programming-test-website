import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import type { CategoryT } from "@/types/category.type";

/**
 * Parse the categoryData.mdx file and convert it to an array of CategoryT
 */
export async function parseMDXCategories(): Promise<CategoryT[]> {
  try {
    // Locate the MDX file
    const mdxPath = path.join(process.cwd(), "database", "categoryData.mdx");
    const fileContents = fs.readFileSync(mdxPath, "utf8");

    // Extract frontmatter using gray-matter
    const { data, content } = matter(fileContents);

    // Optionally compile the MDX body (if you want to render markdown later)
    await compile(content, { outputFormat: "function-body" });

    // Convert the frontmatter categories into CategoryT[]
    if (data.categories && Array.isArray(data.categories)) {
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
