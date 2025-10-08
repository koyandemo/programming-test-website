import type { TestConfigT } from "@/types/test.type"

let allGenres: any[] = []
try {
  const contentlayer = require("contentlayer/generated")
  allGenres = contentlayer.allGenres || []
} catch (error) {
  console.warn("[v0] Contentlayer genres not generated yet. Run 'npm run dev' to generate.")
  allGenres = []
}

export const GENRES_DATA: TestConfigT[] = allGenres.map((genre) => ({
  id: genre.id,
  title: genre.title,
  description: genre.description,
  duration: genre.duration,
  questionCount: genre.questionCount,
  difficulty: genre.difficulty as any,
  categories: genre.categories,
}))
