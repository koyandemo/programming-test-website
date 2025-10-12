"use client";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Timer, TimerOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TestConfigT } from "@/types/test.type";

type Props = {
  fromCategoryStore: boolean;
  setIsCountDown: (isCountDown: boolean) => void;
  onStartTest: (config: TestConfigT) => void;
};

const CountDownDialog = ({
  fromCategoryStore,
  setIsCountDown,
  onStartTest,
}: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<TestConfigT | null>(
    null
  );

  useEffect(() => {
    if (!fromCategoryStore) {
      router.back();
      return;
    }
    const pendingConfig = sessionStorage.getItem("pendingTestConfig");
    if (pendingConfig) {
      try {
        const config = JSON.parse(pendingConfig);
        sessionStorage.removeItem("pendingTestConfig");
        handleOpenDialog(config);
      } catch (error) {
        console.error("Failed to parse pending test config:", error);
      }
    }
  }, [fromCategoryStore]);

  const handleOpenDialog = (config: TestConfigT) => {
    setSelectedConfig(config);
    setOpen(true);
  };

  const handleChoice = (countdown: boolean) => {
    setIsCountDown(countdown);
    if (selectedConfig) {
      onStartTest(selectedConfig);
    }
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          if (fromCategoryStore) {
            router.back();
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Select Test Mode</DialogTitle>
            <DialogDescription>
              Do you want to enable countdown mode for this test?
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card
              className="cursor-pointer hover:bg-accent transition p-4 text-center"
              onClick={() => handleChoice(true)}
            >
              <Timer className="w-8 h-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold">Countdown</h3>
              <p className="text-sm text-muted-foreground">
                Timed challenge with countdown
              </p>
            </Card>

            <Card
              className="cursor-pointer hover:bg-accent transition p-4 text-center"
              onClick={() => handleChoice(false)}
            >
              <TimerOff className="w-8 h-8 mx-auto text-destructive mb-2" />
              <h3 className="font-semibold">No Countdown</h3>
              <p className="text-sm text-muted-foreground">
                Practice freely without a timer
              </p>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CountDownDialog;
