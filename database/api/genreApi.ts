import type { TestConfigT } from "@/types/test.type"
import { allGenres } from "contentlayer/generated"

export const GENRES_DATA: TestConfigT[] = allGenres.map((genre) => ({
  id: genre.id,
  title: genre.title,
  description: genre.description,
  duration: genre.duration,
  questionCount: genre.questionCount,
  difficulty: genre.difficulty as any,
  categories: genre.categories,
}))
