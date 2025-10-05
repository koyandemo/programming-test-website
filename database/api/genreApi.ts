import type { TestConfigT } from "@/types/test.type";
import matter from "gray-matter";
import genreData from "../mdx/genreData.mdx?raw";

function parseMDXGenres(): TestConfigT[] {
  const { data } = matter(genreData);
  return data.genres || [];
}

export const GENRES_DATA: TestConfigT[] = parseMDXGenres();
