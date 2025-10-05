import { QuestionT } from "@/types/question.type";
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type";

export const PYTHON_QUESTIONS_DATA: QuestionT[] = [
  //Python Questions
  {
    id: "py1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "Python List Comprehension",
    description:
      "What is the equivalent list comprehension for the following code?\n\nresult = []\nfor x in range(10):\n    if x % 2 == 0:\n        result.append(x**2)",
    options: [
      "[x**2 for x in range(10)]",
      "[x**2 for x in range(10) if x % 2 == 0]",
      "[x for x in range(10) if x**2 % 2 == 0]",
      "[x**2 if x % 2 == 0 for x in range(10)]",
    ],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.EASY,
    category: "Python",
  },
  {
    id: "py2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "Python Mutability",
    statement:
      "In Python, tuples are mutable, meaning you can change their elements after creation.",
    correctAnswer: false,
    explanation:
      "Tuples are immutable in Python. Once created, you cannot change, add, or remove elements from a tuple.",
    difficulty: TestDifficultyEnum.EASY,
    category: "Python",
  },
];
