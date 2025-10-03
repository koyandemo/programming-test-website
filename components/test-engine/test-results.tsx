"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  RotateCcw,
  Share2,
  Home,
  Code,
} from "lucide-react";
import Link from "next/link";
import { TestSessionT } from "@/types/test.type";
import { getPerformanceLevel } from "@/lib/utils";
import { QUESTIONS_DATA } from "@/database/question/questionData";

interface TestResultsProps {
  session: TestSessionT;
  onRetakeTest: () => void;
  goHome: () => void;
}

export function TestResults({
  session,
  onRetakeTest,
  goHome,
}: TestResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate results
  const totalQuestions = session.config.questionCount;
  const answeredQuestions = session.answers.length;
  const correctAnswers = session.answers.filter((a) => a.isCorrect).length;
  const scorePercentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;
  const totalTimeSpent = session.endTime
    ? Math.floor((session.endTime - session.startTime) / 1000)
    : 0;
  const averageTimePerQuestion =
    answeredQuestions > 0 ? Math.floor(totalTimeSpent / answeredQuestions) : 0;

  const performance = getPerformanceLevel(scorePercentage);

  // Category breakdown
  const categoryStats = session.answers.reduce((acc, answer) => {
    const question = QUESTIONS_DATA.find((q) => q.id === answer.questionId);
    if (question) {
      const category = question.category;
      if (!acc[category]) {
        acc[category] = { total: 0, correct: 0 };
      }
      acc[category].total++;
      if (answer.isCorrect) {
        acc[category].correct++;
      }
    }
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleShare = () => {
    const shareText = `I just completed the ${session.config.title} test on CodeTest Pro and scored ${scorePercentage}%! 🎯`;
    if (navigator.share) {
      navigator.share({
        title: "CodeTest Pro Results",
        text: shareText,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                CodeTest Pro
              </span>
            </Link>
            <Badge variant="secondary">Test Complete</Badge>
          </div>
        </div>
      </header> */}

      {/* Results Content */}
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Results Header */}
          <div className="text-center mb-10">
            <div
              className={`w-20 h-20 rounded-full ${performance.bgColor} flex items-center justify-center mx-auto mb-4`}
            >
              <Trophy className={`w-10 h-10 ${performance.color}`} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Test Complete!
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {session.config.title}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge
                variant="outline"
                className={`${performance.color} border-current`}
              >
                {performance.level}
              </Badge>
              <span className="text-3xl font-bold">{scorePercentage}%</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 my-10">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">{correctAnswers}</div>
                <div className="text-sm text-muted-foreground">
                  Correct Answers
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold">{answeredQuestions}</div>
                <div className="text-sm text-muted-foreground">
                  Questions Answered
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">
                  {formatTime(totalTimeSpent)}
                </div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold">
                  {formatTime(averageTimePerQuestion)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg per Question
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="breakdown">Category Breakdown</TabsTrigger>
              <TabsTrigger value="questions">Question Review</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 min-h-[500px]">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>
                      Your overall test performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Overall Score</span>
                        <span className="font-semibold">
                          {scorePercentage}%
                        </span>
                      </div>
                      <Progress value={scorePercentage} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Completion Rate</span>
                        <span className="font-semibold">
                          {Math.round(
                            (answeredQuestions / totalQuestions) * 100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(answeredQuestions / totalQuestions) * 100}
                        className="h-3"
                      />
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold mb-3">Recommendations</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {scorePercentage >= 80 ? (
                          <>
                            <li>
                              • Excellent work! You have a strong grasp of the
                              concepts.
                            </li>
                            <li>
                              • Consider taking more advanced tests to challenge
                              yourself.
                            </li>
                            <li>• Share your achievement with your network!</li>
                          </>
                        ) : scorePercentage >= 60 ? (
                          <>
                            <li>
                              • Good foundation! Focus on areas where you scored
                              lower.
                            </li>
                            <li>
                              • Practice more problems in your weaker
                              categories.
                            </li>
                            <li>
                              • Consider retaking the test after more
                              preparation.
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              • Review fundamental concepts in your weaker
                              areas.
                            </li>
                            <li>
                              • Practice with easier questions before retaking.
                            </li>
                            <li>
                              • Consider studying the explanations for missed
                              questions.
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Test Information</CardTitle>
                    <CardDescription>
                      Details about your test session
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Test Name</span>
                        <div className="font-semibold">
                          {session.config.title}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Difficulty
                        </span>
                        <div className="font-semibold">
                          {session.config.difficulty}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Total Questions
                        </span>
                        <div className="font-semibold">{totalQuestions}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Time Limit
                        </span>
                        <div className="font-semibold">
                          {session.config.duration} minutes
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Started</span>
                        <div className="font-semibold">
                          {new Date(session.startTime).toLocaleTimeString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completed</span>
                        <div className="font-semibold">
                          {session.endTime
                            ? new Date(session.endTime).toLocaleTimeString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold mb-3">Categories Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {session.config.categories.map((category: string) => (
                          <Badge key={category} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="breakdown" className="mt-6 min-h-[500px]">
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>
                    Your performance broken down by topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(categoryStats).map(([category, stats]) => {
                      const percentage = Math.round(
                        (stats.correct / stats.total) * 100
                      );
                      const categoryPerformance =
                        getPerformanceLevel(percentage);

                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold">{category}</h4>
                              <Badge
                                variant="outline"
                                className={`${categoryPerformance.color} border-current text-xs`}
                              >
                                {categoryPerformance.level}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {stats.correct}/{stats.total} ({percentage}%)
                            </div>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="mt-6 min-h-[500px]">
              <Card>
                <CardHeader>
                  <CardTitle>Question Review</CardTitle>
                  <CardDescription>
                    Review your answers for each question
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {session.answers.map((answer, index) => {
                      const question = QUESTIONS_DATA.find(
                        (q) => q.id === answer.questionId
                      );
                      if (!question) return null;

                      return (
                        <div
                          key={answer.questionId}
                          className={`p-4 rounded-lg border ${
                            answer.isCorrect
                              ? "border-green-500/50 bg-green-500/10"
                              : "border-red-500/50 bg-red-500/10"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {answer.isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                              )}
                              <div>
                                <h4 className="font-semibold">
                                  Question {index + 1}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {question.title}
                                </p>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatTime(answer.timeSpent)}
                            </div>
                          </div>
                          <div className="ml-8">
                            <Badge variant="secondary" className="text-xs">
                              {question.category}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button
              onClick={onRetakeTest}
              size="lg"
              variant="outline"
              className="cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Test
            </Button>
            <Button
              onClick={handleShare}
              size="lg"
              variant="outline"
              className="cursor-pointer"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
            <Button
              size="lg"
              variant={"outline"}
              className="cursor-pointer"
              onClick={goHome}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
