"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  FileText,
  ArrowRight,
  Code,
  Database,
  Cpu,
  Timer,
  TimerOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TestConfigT } from "@/types/test.type";
import { getDifficultyColor } from "@/lib/utils";
import { GENRES_DATA } from "@/database/api/genreApi";

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
      {/* {!fromCategoryStore && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Select Your Programming Test
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from our curated collection of programming assessments
                designed to test your skills
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GENRES_DATA.map((config) => (
                <Card
                  key={config.id}
                  className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200 group cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {getIcon(config.categories)}
                      </div>
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(config.difficulty)}
                      >
                        {config.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-balance">
                      {config.title}
                    </CardTitle>
                    <CardDescription className="text-balance">
                      {config.description}
                    </CardDescription>
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
                      {config.categories.map((category: string) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleOpenDialog(config)}
                      className="w-full cursor-pointer group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      Start Test
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* Countdown Choice Dialog */}
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


//   const getIcon = (categories: string[]) => {
//     if (
//       categories.some(
//         (cat) => cat.includes("System") || cat.includes("Architecture")
//       )
//     ) {
//       return <Cpu className="w-6 h-6" />;
//     }
//     if (categories.some((cat) => cat.includes("Database"))) {
//       return <Database className="w-6 h-6" />;
//     }
//     return <Code className="w-6 h-6" />;
//   };
