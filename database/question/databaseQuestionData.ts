import { QuestionT } from "@/types/question.type";
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type";

export const DATABASE_QUESTIONS_DATA: QuestionT[] = [
  // Database Questions
  {
    id: "db1",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "Database Normalization",
    statement:
      "Third Normal Form (3NF) eliminates all transitive dependencies in a database table.",
    correctAnswer: true,
    explanation:
      "3NF requires that all non-key attributes are fully functionally dependent on the primary key and eliminates transitive dependencies.",
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "Database",
  },
  {
    id: "db2",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "SQL Joins",
    description:
      "Which SQL JOIN returns all records from both tables, filling in NULL values where there's no match?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correctAnswer: 3,
    difficulty: TestDifficultyEnum.EASY,
    category: "Database",
  },
];
