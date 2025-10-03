export enum TestViewEnum {
  SELECTION = "selection",
  TEST = "test",
  RESULTS = "results",
}

export enum TestDifficultyEnum {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
  MIXED = "Mixed",
}

export enum TestQuestionTypeEnum {
  MULTIPLE_CHOICE = "multiple-choice",
  CODING = "coding",
  TRUE_FALSE = "true-false",
//   MIXED = "mixed",
}

export interface TestConfigT {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questionCount: number;
  difficulty: TestDifficultyEnum;
  categories: string[];
}

export interface TestAnswerT {
  questionId: string;
  answer: any;
  isCorrect: boolean;
  timeSpent: number;
  questionType: TestQuestionTypeEnum;
}

export interface TestSessionT {
  config: TestConfigT;
  isCountDowning: boolean;
  answers: TestAnswerT[];
  startTime: number;
  endTime?: number;
  currentQuestionIndex: number;
  isCompleted: boolean;
}
