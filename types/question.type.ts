import { TestDifficultyEnum, TestQuestionTypeEnum } from "./test.type";

export interface BaseQuestionT {
  id: string;
  type: TestQuestionTypeEnum;
  title: string;
  description?: string;
  difficulty: TestDifficultyEnum;
  category: string;
  timeLimit?: number;
}

export interface MultipleChoiceQuestionT extends BaseQuestionT {
  type: TestQuestionTypeEnum.MULTIPLE_CHOICE;
  options: string[];
  correctAnswer: number; // index
}

export interface TrueFalseQuestionT extends BaseQuestionT {
  type: TestQuestionTypeEnum.TRUE_FALSE;
  correctAnswer: boolean;
  statement:string;
  explanation:string;
}

export interface CodingQuestionT extends BaseQuestionT {
  type: TestQuestionTypeEnum.CODING;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  starterCode?: Record<string, string>;
}

//   export interface DescriptiveQuestionT extends BaseQuestionT {
//     type: TestQuestionTypeEnum.DESCRIPTIVE;
//     statement: string;
//   }

export type QuestionT =
  | MultipleChoiceQuestionT
  | TrueFalseQuestionT
  | CodingQuestionT;
//   | DescriptiveQuestionT;
