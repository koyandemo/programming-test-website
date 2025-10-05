import { QuestionT } from "@/types/question.type";
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type";

export const JS_QUESTIONS_DATA: QuestionT[] = [
  // JavaScript Questions
  {
    id: "js1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "JavaScript Array Methods",
    description:
      "Which array method creates a new array with all elements that pass a test implemented by the provided function?",
    options: ["map()", "filter()", "reduce()", "forEach()"],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.EASY,
    category: "JavaScript",
  },
  {
    id: "js2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "JavaScript Hoisting",
    statement:
      "In JavaScript, variable declarations using 'let' and 'const' are hoisted to the top of their scope and can be accessed before declaration.",
    correctAnswer: false,
    explanation:
      "While 'let' and 'const' declarations are hoisted, they are not initialized and cannot be accessed before their declaration due to the Temporal Dead Zone.",
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "JavaScript",
  },
  {
    id: "js3",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "JavaScript Closures",
    description:
      "What will be the output of the following code?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
    options: ["0 1 2", "3 3 3", "undefined undefined undefined", "Error"],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "JavaScript",
  },
  {
    id: "js4",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "JavaScript Equality",
    statement: "In JavaScript, the expression '0' == false evaluates to true.",
    correctAnswer: true,
    explanation:
      "Due to type coercion, '0' is converted to 0 (number) and false is converted to 0, so 0 == 0 is true.",
    difficulty: TestDifficultyEnum.EASY,
    category: "JavaScript",
  }
];
