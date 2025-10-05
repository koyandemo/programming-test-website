"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getCategoryBySlug,
  getRelatedCategories,
} from "@/database/api/categoryApi";
import { getQuestionsByCategory } from "@/database/api/questionApi";
import useTestSessionStore from "@/store/testSessionStore";
import { type TestConfigT, TestDifficultyEnum } from "@/types/test.type";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Flame,
  Mountain,
  Shuffle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { addFromCategoryStore } = useTestSessionStore();
  const category = getCategoryBySlug(slug);
  const relatedCategories = getRelatedCategories(slug, 3);

  const questions = useMemo(() => {
    if (!category) return [];
    return getQuestionsByCategory(category.name);
  }, [category]);


  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Category not found
          </h1>
          <Link href="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const DIFFICULTY_OPTIONS_DATA = [
    {
      difficulty: TestDifficultyEnum.EASY,
      title: "Easy",
      description: "Perfect for beginners and warming up",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      questionCount: questions.filter(
        (q) => q.difficulty === TestDifficultyEnum.EASY
      ).length,
      duration: 20,
    },
    {
      difficulty: TestDifficultyEnum.MEDIUM,
      title: "Medium",
      description: "Intermediate level challenges",
      icon: Flame,
      color: "from-orange-500 to-yellow-500",
      questionCount: questions.filter(
        (q) => q.difficulty === TestDifficultyEnum.MEDIUM
      ).length,
      duration: 30,
    },
    {
      difficulty: TestDifficultyEnum.HARD,
      title: "Hard",
      description: "Advanced problems for experts",
      icon: Mountain,
      color: "from-red-500 to-pink-500",
      questionCount: questions.filter(
        (q) => q.difficulty === TestDifficultyEnum.HARD
      ).length,
      duration: 45,
    },
    {
      difficulty: TestDifficultyEnum.MIXED,
      title: "Mixed",
      description: "All difficulty levels combined",
      icon: Shuffle,
      color: "from-purple-500 to-indigo-500",
      questionCount: questions.length,
      duration: 40,
    },
  ];

  const handleStartTest = (difficulty: TestDifficultyEnum) => {
    const option = DIFFICULTY_OPTIONS_DATA.find(
      (opt) => opt.difficulty === difficulty
    );
    if (!option) return;

    const testConfig: TestConfigT = {
      id: `${category.slug}-${difficulty.toLowerCase()}`,
      title: `${category.name} - ${difficulty}`,
      description: `Test your ${
        category.name
      } skills with ${difficulty.toLowerCase()} level questions`,
      duration: option.duration,
      questionCount: Math.min(option.questionCount, 15),
      difficulty: difficulty,
      categories: [category.name],
    };

    // Store config in sessionStorage and navigate to test page
    sessionStorage.setItem("pendingTestConfig", JSON.stringify(testConfig));
    addFromCategoryStore(true);
    router.push("/test");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>

          <div className="flex items-start gap-6">
            {/* Category Icon */}
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl shadow-lg flex-shrink-0`}
            >
              {category.icon}
            </div>

            {/* Category Info */}
            <div className="flex-grow">
              <h1 className="text-4xl font-bold text-foreground mb-3">
                {category.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-4 max-w-3xl leading-relaxed">
                {category.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{category.questionCount} questions available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Options */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Choose Your Difficulty
          </h2>
          <p className="text-muted-foreground">
            Select a difficulty level to start your assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {DIFFICULTY_OPTIONS_DATA.map((option) => {
            const Icon = option.icon;
            const isDisabled = option.questionCount === 0;

            return (
              <Card
                key={option.difficulty}
                className={`p-6 border-2 transition-all duration-300 ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 cursor-pointer"
                }`}
                onClick={() =>
                  !isDisabled && handleStartTest(option.difficulty)
                }
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 shadow-md`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {option.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{option.questionCount} questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{option.duration} minutes</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full"
                    disabled={isDisabled}
                    variant={isDisabled ? "outline" : "default"}
                  >
                    {isDisabled ? "No Questions" : "Start Test"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCategories.map((relatedCat) => (
                <Link
                  key={relatedCat.id}
                  href={`/categories/${relatedCat.slug}`}
                  className="group"
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/50">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${relatedCat.color} flex items-center justify-center text-2xl mb-3 shadow-md`}
                    >
                      {relatedCat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedCat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedCat.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                      <BookOpen className="w-3 h-3" />
                      <span>{relatedCat.questionCount} questions</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
