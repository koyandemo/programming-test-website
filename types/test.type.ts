export enum TestViewEnum {
  SELECTION = "selection",
  TEST = "test",
  RESULTS = "results",
}

export enum TestDifficultyEnum {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  MIXED = "MIXED",
}

export enum TestQuestionTypeEnum {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CODING = "CODING",
  TRUE_FALSE = "TRUE_FALSE",
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
