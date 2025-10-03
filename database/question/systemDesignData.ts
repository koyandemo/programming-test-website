import { QuestionT } from "@/types/question.type";
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type";

export const SYSTEM_DESIGN_QUESTIONS_DATA: QuestionT[] = [
  // System Design
  {
    id: "sd1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "Database Scaling",
    description:
      "Which approach is typically used to handle read-heavy workloads in database systems?",
    options: [
      "Vertical scaling only",
      "Read replicas",
      "Write sharding",
      "Connection pooling",
    ],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "System Design",
  },
  {
    id: "sd2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "Microservices Architecture",
    statement:
      "In a microservices architecture, all services should share the same database to ensure data consistency.",
    correctAnswer: false,
    explanation:
      "Microservices should have their own databases to maintain independence and avoid tight coupling between services.",
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "System Design",
  },
];
