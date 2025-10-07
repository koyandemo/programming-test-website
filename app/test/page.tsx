"use client"

import { useState } from "react"
import { TestEngine } from "@/components/test-engine/test-engine"
import { TestResults } from "@/components/test-engine/test-results"
import { type TestConfigT, type TestSessionT, TestViewEnum } from "@/types/test.type"
import useTestSessionStore from "@/store/testSessionStore"
import CountDownDialog from "@/components/shared/dialog/CountDownDialog"

export default function TestPage() {
  const {
    testSessionStore,
    addTestSessionStore,
    fromCategoryStore,
    addFromCategoryStore,
    currentView,
    setCurrentView,
  } = useTestSessionStore()

  const [testSession, setTestSession] = useState<TestSessionT | null>(null)
  const [isCountDown, setIsCountDown] = useState<boolean>(false)

  const handleStartTest = (config: TestConfigT) => {
    const session: TestSessionT = {
      config,
      answers: [],
      startTime: Date.now(),
      currentQuestionIndex: 0,
      isCompleted: false,
      isCountDowning: false,
    }
    setTestSession(session)
    addTestSessionStore(session)
    setCurrentView(TestViewEnum.TEST)
  }

  const handleTestComplete = (session: TestSessionT) => {
    setTestSession({ ...session, endTime: Date.now(), isCompleted: true })
    setCurrentView(TestViewEnum.RESULTS)
  }

  const handleRetakeTest = () => {
    setTestSession(testSessionStore)
    setCurrentView(TestViewEnum.SELECTION)
  }

  const handleReset = () => {
    setTestSession(null)
    setCurrentView(TestViewEnum.SELECTION)
  }

  return (
    <div className="min-h-screen  flex flex-col justify-between">
      {currentView === TestViewEnum.SELECTION && (
        <CountDownDialog
          fromCategoryStore={fromCategoryStore}
          setIsCountDown={setIsCountDown}
          onStartTest={handleStartTest}
        />
      )}

      {currentView === TestViewEnum.TEST && testSession && (
        <TestEngine
          session={testSession}
          isCountDown={isCountDown}
          onComplete={handleTestComplete}
          addFromCategoryStore={addFromCategoryStore}
        />
      )}

      {currentView === TestViewEnum.RESULTS && testSession && (
        <TestResults session={testSession} goHome={handleReset} onRetakeTest={handleRetakeTest} />
      )}
    </div>
  )
}
