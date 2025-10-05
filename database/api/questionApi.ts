import matter from "gray-matter";
import type { QuestionT } from "@/types/question.type";

// Import each question MDX file as raw text
import questionData from "../mdx/questionData.mdx?raw";
import dataBaseData from "../mdx/question/databaseQuestionData.mdx?raw";
import javaScriptData from "../mdx/question/javaScriptQuestionData.mdx?raw";
import pythonData from "../mdx/question/pythonQuestionData.mdx?raw";
import reactData from "../mdx/question/reactQuestionData.mdx?raw";
import systemData from "../mdx/question/systemDesignData.mdx?raw";
import webDevelopmentData from "../mdx/question/webDevelopmentQuestionData.mdx?raw";
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type";

function parseMDXFile(raw: string): QuestionT[] {
  const { data } = matter(raw);
  return data.questions || [];
}

function parseMDXQuestions(): QuestionT[] {
  const allQuestions = [
    questionData,
    dataBaseData,
    javaScriptData,
    pythonData,
    reactData,
    systemData,
    webDevelopmentData,
  ]
    .map(parseMDXFile) // parse each MDX file individually
    .flat(); // flatten into a single array
  return allQuestions;
}



export const QUESTIONS_DATA: QuestionT[] = parseMDXQuestions();

// Helper functions for question management
export function getQuestionsByCategory(category: string): QuestionT[] {
  return QUESTIONS_DATA.filter((q) => q.category === category);
}

export function getQuestionsByDifficulty(
  difficulty: TestDifficultyEnum
): QuestionT[] {
  return QUESTIONS_DATA.filter((q) => q.difficulty === difficulty);
}

export function getQuestionsByType(type: TestQuestionTypeEnum): QuestionT[] {
  return QUESTIONS_DATA.filter((q) => q.type === type);
}

export function getRandomQuestions(
  count: number,
  categories?: string[],
  difficulty?: TestDifficultyEnum
): QuestionT[] {
  let filteredQuestions = [...QUESTIONS_DATA];

  if (categories && categories.length > 0) {
    filteredQuestions = filteredQuestions.filter((q) =>
      categories.includes(q.category)
    );
  }

  if (difficulty && difficulty !== "MIXED") {
    filteredQuestions = filteredQuestions.filter(
      (q) => q.difficulty === difficulty
    );
  }

  // Shuffle and return requested count
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getAllCategories(): string[] {
  const categories = new Set(QUESTIONS_DATA.map((q) => q.category));
  return Array.from(categories).sort();
}

export function getQuestionStats() {
  const stats = {
    total: QUESTIONS_DATA.length,
    byDifficulty: {
      Easy: QUESTIONS_DATA.filter(
        (q) => q.difficulty === TestDifficultyEnum.EASY
      ).length,
      Medium: QUESTIONS_DATA.filter(
        (q) => q.difficulty === TestDifficultyEnum.MEDIUM
      ).length,
      Hard: QUESTIONS_DATA.filter(
        (q) => q.difficulty === TestDifficultyEnum.HARD
      ).length,
    },
    byType: {
      "multiple-choice": QUESTIONS_DATA.filter(
        (q) => q.type === TestQuestionTypeEnum.MULTIPLE_CHOICE
      ).length,
      coding: QUESTIONS_DATA.filter(
        (q) => q.type === TestQuestionTypeEnum.CODING
      ).length,
      "true-false": QUESTIONS_DATA.filter(
        (q) => q.type === TestQuestionTypeEnum.TRUE_FALSE
      ).length,
    },
    byCategory: {} as Record<string, number>,
  };

  getAllCategories().forEach((category) => {
    stats.byCategory[category] = QUESTIONS_DATA.filter(
      (q) => q.category === category
    ).length;
  });

  return stats;
}
