import { QuestionT } from "@/types/question.type";
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type";

export const WEB_DEVELOPMENT_QUESTIONS_DATA: QuestionT[] = [
  // Web Development
  {
    id: "web1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "HTTP Status Codes",
    description: "What does the HTTP status code 404 indicate?",
    options: ["Server Error", "Unauthorized", "Not Found", "Bad Request"],
    correctAnswer: 2,
    difficulty: TestDifficultyEnum.EASY,
    category: "Web Development",
  },
  {
    id: "web2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "REST API Design",
    statement:
      "In RESTful API design, the HTTP method POST should be used for retrieving data from the server.",
    correctAnswer: false,
    explanation:
      "GET method should be used for retrieving data. POST is typically used for creating new resources.",
    difficulty: TestDifficultyEnum.EASY,
    category: "Web Development",
  },
];
