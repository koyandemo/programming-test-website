"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import useTestSessionStore from "@/store/testSessionStore";
import { TestViewEnum } from "@/types/test.type";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import BackgroundContainter from "../shared/BackgroundContainter";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { currentView, setCurrentView } = useTestSessionStore();

  // Check if we're on the test page and in TEST view
  const isTestPage = pathname === "/test";
  const isTestView = currentView === TestViewEnum.TEST;
  const shouldHideHeader = isTestPage && isTestView;

  const handleBackClick = () => {
    setCurrentView(TestViewEnum.SELECTION);
  };

  return (
    <>
      {!shouldHideHeader && <Header />}

      {shouldHideHeader && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Selection
            </Button>
          </div>
        </div>
      )}
      <BackgroundContainter />
      <div className={`${shouldHideHeader ? "pt-14" : "pt-20"} z-30`}>{children}</div>
    </>
  );
}
