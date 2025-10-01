"use client"

import { useState } from "react"
import { TestEngine } from "@/components/test-engine/test-engine"
import { TestSelection } from "@/components/test-engine/test-selection"
import { TestResults } from "@/components/test-engine/test-results"

export interface TestConfig {
  id: string
  title: string
  description: string
  duration: number // in minutes
  questionCount: number
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed"
  categories: string[]
}

export interface TestAnswer {
  questionId: string
  answer: any
  isCorrect: boolean
  timeSpent: number
  questionType: "multiple-choice" | "coding" | "true-false"
}

export interface TestSession {
  config: TestConfig
  answers: TestAnswer[]
  startTime: number
  endTime?: number
  currentQuestionIndex: number
  isCompleted: boolean
}

export default function TestPage() {
  const [currentView, setCurrentView] = useState<"selection" | "test" | "results">("selection")
  const [testSession, setTestSession] = useState<TestSession | null>(null)

  const handleStartTest = (config: TestConfig) => {
    const session: TestSession = {
      config,
      answers: [],
      startTime: Date.now(),
      currentQuestionIndex: 0,
      isCompleted: false,
    }
    setTestSession(session)
    setCurrentView("test")
  }

  const handleTestComplete = (session: TestSession) => {
    setTestSession({ ...session, endTime: Date.now(), isCompleted: true })
    setCurrentView("results")
  }

  const handleRetakeTest = () => {
    setTestSession(null)
    setCurrentView("selection")
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === "selection" && <TestSelection onStartTest={handleStartTest} />}

      {currentView === "test" && testSession && <TestEngine session={testSession} onComplete={handleTestComplete} />}

      {currentView === "results" && testSession && (
        <TestResults session={testSession} onRetakeTest={handleRetakeTest} />
      )}
    </div>
  )
}
