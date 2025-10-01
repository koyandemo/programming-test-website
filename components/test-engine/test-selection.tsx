"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Target, ArrowRight, Code, Database, Cpu } from "lucide-react"
import Link from "next/link"
import type { TestConfig } from "@/app/test/page"

interface TestSelectionProps {
  onStartTest: (config: TestConfig) => void
}

export function TestSelection({ onStartTest }: TestSelectionProps) {
  const testConfigs: TestConfig[] = [
    {
      id: "js-fundamentals",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics, ES6+ features, and core concepts",
      duration: 30,
      questionCount: 15,
      difficulty: "Easy",
      categories: ["JavaScript", "Programming Basics"],
    },
    {
      id: "data-structures",
      title: "Data Structures & Algorithms",
      description: "Challenge yourself with arrays, linked lists, trees, and algorithmic thinking",
      duration: 45,
      questionCount: 20,
      difficulty: "Medium",
      categories: ["Data Structures", "Algorithms"],
    },
    {
      id: "system-design",
      title: "System Design Concepts",
      description: "Explore scalability, databases, caching, and distributed systems",
      duration: 60,
      questionCount: 12,
      difficulty: "Hard",
      categories: ["System Design", "Architecture"],
    },
    {
      id: "python-coding",
      title: "Python Programming",
      description: "Solve coding problems and demonstrate Python proficiency",
      duration: 40,
      questionCount: 18,
      difficulty: "Medium",
      categories: ["Python", "Coding Challenges"],
    },
    {
      id: "full-stack-mixed",
      title: "Full-Stack Developer Assessment",
      description: "Comprehensive test covering frontend, backend, and database concepts",
      duration: 75,
      questionCount: 25,
      difficulty: "Mixed",
      categories: ["Frontend", "Backend", "Database"],
    },
    {
      id: "quick-assessment",
      title: "Quick Skills Assessment",
      description: "A rapid-fire test to gauge your overall programming knowledge",
      duration: 15,
      questionCount: 10,
      difficulty: "Mixed",
      categories: ["General Programming"],
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "Hard":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "Mixed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getIcon = (categories: string[]) => {
    if (categories.some((cat) => cat.includes("System") || cat.includes("Architecture"))) {
      return <Cpu className="w-6 h-6" />
    }
    if (categories.some((cat) => cat.includes("Database"))) {
      return <Database className="w-6 h-6" />
    }
    return <Code className="w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CodeTest Pro</span>
            </Link>
            <Badge variant="secondary">Choose Your Test</Badge>
          </div>
        </div>
      </header>

      {/* Test Selection */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Select Your Programming Test</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our curated collection of programming assessments designed to test your skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testConfigs.map((config) => (
              <Card
                key={config.id}
                className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200 group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {getIcon(config.categories)}
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(config.difficulty)}>
                      {config.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-balance">
                    {config.title}
                  </CardTitle>
                  <CardDescription className="text-balance">{config.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{config.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{config.questionCount} questions</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {config.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    onClick={() => onStartTest(config)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    Start Test
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center">
            <Card className="max-w-3xl mx-auto bg-card/30 border-border">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">No Registration</h3>
                    <p className="text-sm text-muted-foreground">
                      Start testing immediately without any signup process
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">Timed Challenges</h3>
                    <p className="text-sm text-muted-foreground">Real interview conditions with time limits</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Instant Results</h3>
                    <p className="text-sm text-muted-foreground">Get detailed feedback immediately after completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
