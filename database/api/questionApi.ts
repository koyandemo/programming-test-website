import type { QuestionT } from "@/types/question.type"
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type"

let allQuestions: any[] = []
try {
  const contentlayer = require("contentlayer/generated")
  allQuestions = contentlayer.allQuestions || []
} catch (error) {
  console.warn("[v0] Contentlayer data not generated yet. Run 'npm run dev' to generate.")
  allQuestions = []
}

// Function to convert Contentlayer questions to QuestionT format
function convertContentlayerQuestion(doc: any): QuestionT {
  const base = {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    difficulty: doc.difficulty as TestDifficultyEnum,
    category: doc.category,
    timeLimit: doc.timeLimit,
  }

  if (doc.type === "MULTIPLE_CHOICE") {
    return {
      ...base,
      type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
      options: doc.options || [],
      correctAnswer: doc.correctAnswer,
    }
  } else if (doc.type === "TRUE_FALSE") {
    return {
      ...base,
      type: TestQuestionTypeEnum.TRUE_FALSE,
      statement: doc.statement || "",
      correctAnswer: doc.correctAnswer,
      explanation: doc.explanation || "",
    }
  } else if (doc.type === "CODING") {
    return {
      ...base,
      type: TestQuestionTypeEnum.CODING,
      examples: doc.examples || [],
      constraints: doc.constraints || [],
      starterCode: doc.starterCode,
    }
  }

  throw new Error(`Unknown question type: ${doc.type}`)
}

export const QUESTIONS_DATA: QuestionT[] = allQuestions.map(convertContentlayerQuestion)

// Helper functions for question management
export function getQuestionsByCategory(category: string): QuestionT[] {
  return QUESTIONS_DATA.filter((q) => q.category === category)
}

export function getQuestionsByDifficulty(difficulty: TestDifficultyEnum): QuestionT[] {
  return QUESTIONS_DATA.filter((q) => q.difficulty === difficulty)
}

export function getQuestionsByType(type: TestQuestionTypeEnum): QuestionT[] {
  return QUESTIONS_DATA.filter((q) => q.type === type)
}

export function getRandomQuestions(count: number, categories?: string[], difficulty?: TestDifficultyEnum): QuestionT[] {
  let filteredQuestions = [...QUESTIONS_DATA]

  if (categories && categories.length > 0) {
    filteredQuestions = filteredQuestions.filter((q) => categories.includes(q.category))
  }

  if (difficulty && difficulty !== "MIXED") {
    filteredQuestions = filteredQuestions.filter((q) => q.difficulty === difficulty)
  }

  // Shuffle and return requested count
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function getAllCategories(): string[] {
  const categories = new Set(QUESTIONS_DATA.map((q) => q.category))
  return Array.from(categories).sort()
}

export function getQuestionStats() {
  const stats = {
    total: QUESTIONS_DATA.length,
    byDifficulty: {
      Easy: QUESTIONS_DATA.filter((q) => q.difficulty === TestDifficultyEnum.EASY).length,
      Medium: QUESTIONS_DATA.filter((q) => q.difficulty === TestDifficultyEnum.MEDIUM).length,
      Hard: QUESTIONS_DATA.filter((q) => q.difficulty === TestDifficultyEnum.HARD).length,
    },
    byType: {
      "multiple-choice": QUESTIONS_DATA.filter((q) => q.type === TestQuestionTypeEnum.MULTIPLE_CHOICE).length,
      coding: QUESTIONS_DATA.filter((q) => q.type === TestQuestionTypeEnum.CODING).length,
      "true-false": QUESTIONS_DATA.filter((q) => q.type === TestQuestionTypeEnum.TRUE_FALSE).length,
    },
    byCategory: {} as Record<string, number>,
  }

  getAllCategories().forEach((category) => {
    stats.byCategory[category] = QUESTIONS_DATA.filter((q) => q.category === category).length
  })

  return stats
}
