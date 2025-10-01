"use client";

import { useState } from "react";
import { TestEngine } from "@/components/test-engine/test-engine";
import { TestSelection } from "@/components/test-engine/test-selection";
import { TestResults } from "@/components/test-engine/test-results";
import { TestConfigT, TestSessionT, TestViewEnum } from "@/types/test.type";

export default function TestPage() {
  const [currentView, setCurrentView] = useState<TestViewEnum>(
    TestViewEnum.SELECTION
  );
  const [testSession, setTestSession] = useState<TestSessionT | null>(null);

  const handleStartTest = (config: TestConfigT) => {
    const session: TestSessionT = {
      config,
      answers: [],
      startTime: Date.now(),
      currentQuestionIndex: 0,
      isCompleted: false,
    };
    setTestSession(session);
    setCurrentView(TestViewEnum.TEST);
  };

  const handleTestComplete = (session: TestSessionT) => {
    setTestSession({ ...session, endTime: Date.now(), isCompleted: true });
    setCurrentView(TestViewEnum.RESULTS);
  };

  const handleRetakeTest = () => {
    setTestSession(null);
    setCurrentView(TestViewEnum.SELECTION);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === TestViewEnum.SELECTION && (
        <TestSelection onStartTest={handleStartTest} />
      )}

      {currentView === TestViewEnum.TEST && testSession && (
        <TestEngine session={testSession} onComplete={handleTestComplete} />
      )}

      {currentView === TestViewEnum.RESULTS && testSession && (
        <TestResults session={testSession} onRetakeTest={handleRetakeTest} />
      )}
    </div>
  );
}
