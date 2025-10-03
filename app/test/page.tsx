"use client";

import { useState } from "react";
import { TestEngine } from "@/components/test-engine/test-engine";
import { TestSelection } from "@/components/test-engine/test-selection";
import { TestResults } from "@/components/test-engine/test-results";
import { TestConfigT, TestSessionT, TestViewEnum } from "@/types/test.type";
import useTestSessionStore from "@/store/testSessionStore";

export default function TestPage() {
  const [currentView, setCurrentView] = useState<TestViewEnum>(
    TestViewEnum.SELECTION
  );

  const {
    testSessionStore,
    addTestSessionStore,
    fromCategoryStore,
    addFromCategoryStore,
  } = useTestSessionStore();
  const [testSession, setTestSession] = useState<TestSessionT | null>(null);
  const [isCountDown, setIsCountDown] = useState<boolean>(false);

  const handleStartTest = (config: TestConfigT) => {
    const session: TestSessionT = {
      config,
      answers: [],
      startTime: Date.now(),
      currentQuestionIndex: 0,
      isCompleted: false,
      isCountDowning: false,
    };
    setTestSession(session);
    addTestSessionStore(session);
    setCurrentView(TestViewEnum.TEST);
  };

  const handleTestComplete = (session: TestSessionT) => {
    setTestSession({ ...session, endTime: Date.now(), isCompleted: true });
    setCurrentView(TestViewEnum.RESULTS);
  };

  const handleRetakeTest = () => {
    setTestSession(testSessionStore);
    setCurrentView(TestViewEnum.SELECTION);
  };

  const handleReset = () => {
    setTestSession(null);
    setCurrentView(TestViewEnum.SELECTION);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === TestViewEnum.SELECTION && (
        <TestSelection
          onStartTest={handleStartTest}
          setIsCountDown={setIsCountDown}
          fromCategoryStore={fromCategoryStore}
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
        <TestResults
          session={testSession}
          goHome={handleReset}
          onRetakeTest={handleRetakeTest}
        />
      )}
    </div>
  );
}
