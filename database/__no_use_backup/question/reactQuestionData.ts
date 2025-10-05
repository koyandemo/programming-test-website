import { QuestionT } from "@/types/question.type";
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type";

export const REACT_QUESTIONS_DATA: QuestionT[] = [
  // React Questions
  {
    id: "react1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "React Hooks",
    description:
      "Which React Hook is used to perform side effects in functional components?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.EASY,
    category: "React",
  },
  {
    id: "react2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "React State",
    statement:
      "In React, you should directly mutate the state object to update component state.",
    correctAnswer: false,
    explanation:
      "State should never be mutated directly. Always use setState or the state setter function from useState to update state.",
    difficulty: TestDifficultyEnum.EASY,
    category: "React",
  },
];
