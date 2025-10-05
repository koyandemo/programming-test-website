"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MultipleChoiceQuestion } from "@/components/question-types/multiple-choice-question";
import { CodingQuestion } from "@/components/question-types/coding-question";
import { TrueFalseQuestion } from "@/components/question-types/true-false-question";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  AlertTriangle,
} from "lucide-react";
import {
  TestAnswerT,
  TestQuestionTypeEnum,
  TestSessionT,
} from "@/types/test.type";
import { getRandomQuestions } from "@/database/api/questionApi";

interface TestEngineProps {
  session: TestSessionT;
  isCountDown: boolean;
  onComplete: (session: TestSessionT) => void;
  addFromCategoryStore: (value: boolean) => void;
}

export function TestEngine({
  session,
  isCountDown,
  onComplete,
  addFromCategoryStore,
}: TestEngineProps) {
  const [currentSession, setCurrentSession] = useState<TestSessionT>(session);
  const [timeRemaining, setTimeRemaining] = useState(
    session.config.duration * 60
  );
  const [questions] = useState(() =>
    getRandomQuestions(
      session.config.questionCount,
      session.config.categories,
      session.config.difficulty
    )
  );
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  useEffect(() => {
    addFromCategoryStore(false);
  }, []);

  const handleTimeUp = useCallback(() => {
    const completedSession = {
      ...currentSession,
      isCompleted: true,
      endTime: Date.now(),
    };
    onComplete(completedSession);
  }, [currentSession, onComplete]);

  // Timer effect (only run if countdown is enabled)
  useEffect(() => {
    if (!isCountDown) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }

        // Show warning when 5 minutes remaining
        if (prev === 300 && !showTimeWarning) {
          setShowTimeWarning(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCountDown, showTimeWarning, handleTimeUp]);

  const handleAnswer = (
    questionId: string,
    answer: any,
    isCorrect: boolean
  ) => {
    const currentTime = Date.now();
    const questionStartTime =
      currentSession.startTime + currentSession.currentQuestionIndex * 60000; // Rough estimate
    const timeSpent = Math.floor((currentTime - questionStartTime) / 1000);

    const newAnswer: TestAnswerT = {
      questionId,
      answer,
      isCorrect,
      timeSpent,
      questionType: questions[currentSession.currentQuestionIndex].type as any,
    };

    const updatedAnswers = [...currentSession.answers];
    const existingIndex = updatedAnswers.findIndex(
      (a) => a.questionId === questionId
    );

    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    setCurrentSession((prev) => ({
      ...prev,
      answers: updatedAnswers,
    }));
  };

  const handleNext = () => {
    if (currentSession.currentQuestionIndex < questions.length - 1) {
      setCurrentSession((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  };

  const handlePrevious = () => {
    if (currentSession.currentQuestionIndex > 0) {
      setCurrentSession((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const handleSubmitTest = () => {
    const completedSession = {
      ...currentSession,
      isCompleted: true,
      endTime: Date.now(),
    };
    onComplete(completedSession);
  };

  const currentQuestion = questions[currentSession.currentQuestionIndex];
  const currentAnswer = currentSession.answers.find(
    (a) => a.questionId === currentQuestion?.id
  );
  const progress =
    ((currentSession.currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = currentSession.answers.length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      {/* Test Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{session.config.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentSession.currentQuestionIndex + 1} of{" "}
                {questions.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {answeredCount}/{questions.length} answered
                </Badge>
              </div>

              {/* Show timer only if countdown mode is enabled */}
              {isCountDown && (
                <div
                  className={`flex items-center gap-2 ${
                    timeRemaining <= 300
                      ? "text-red-400"
                      : "text-muted-foreground"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-lg">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Time Warning (only in countdown mode) */}
      {isCountDown &&
        showTimeWarning &&
        timeRemaining <= 300 &&
        timeRemaining > 0 && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">
            <div className="container mx-auto flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Warning: Only 5 minutes remaining!
              </span>
            </div>
          </div>
        )}

      {/* Question Content */}
      <main className="py-8 px-4">
        <div className="container mx-auto">
          {currentQuestion.type === TestQuestionTypeEnum.MULTIPLE_CHOICE && (
            <MultipleChoiceQuestion
              question={currentQuestion}
              onAnswer={handleAnswer}
              selectedAnswer={currentAnswer?.answer}
              timeRemaining={isCountDown ? timeRemaining : undefined}
            />
          )}

          {currentQuestion.type === TestQuestionTypeEnum.CODING && (
            <CodingQuestion
              question={currentQuestion}
              onSubmit={(questionId, code, language) => {
                handleAnswer(questionId, { code, language }, true); // Mock evaluation
              }}
              timeRemaining={isCountDown ? timeRemaining : undefined}
            />
          )}

          {currentQuestion.type === TestQuestionTypeEnum.TRUE_FALSE && (
            <TrueFalseQuestion
              question={currentQuestion}
              onAnswer={handleAnswer}
              selectedAnswer={currentAnswer?.answer}
              timeRemaining={isCountDown ? timeRemaining : undefined}
            />
          )}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSession.currentQuestionIndex === 0}
              className="cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              {currentSession.currentQuestionIndex === questions.length - 1 ? (
                <Button
                  onClick={handleSubmitTest}
                  size="lg"
                  className="cursor-pointer"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
