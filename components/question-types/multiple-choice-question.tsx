"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { MultipleChoiceQuestionT } from "@/types/question.type"

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionT
  onAnswer: (questionId: string, selectedAnswer: number, isCorrect: boolean) => void
  showResult?: boolean
  selectedAnswer?: number
  timeRemaining?: number
}

export function MultipleChoiceQuestion({
  question,
  onAnswer,
  showResult = false,
  selectedAnswer,
  timeRemaining,
}: MultipleChoiceQuestionProps) {
  const [selected, setSelected] = useState<string>("")
  const [hasAnswered, setHasAnswered] = useState(false)

  const handleSubmit = () => {
    if (!selected) return

    const selectedIndex = Number.parseInt(selected)
    const isCorrect = selectedIndex === question.correctAnswer
    setHasAnswered(true)
    onAnswer(question.id, selectedIndex, isCorrect)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "Hard":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
              {question.difficulty}
            </Badge>
            <Badge variant="secondary">{question.category}</Badge>
          </div>
          {timeRemaining !== undefined && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-mono">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl text-balance">{question.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">{question.description}</p>
        </div>

        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          disabled={hasAnswered || showResult}
          className="space-y-3"
        >
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index || Number.parseInt(selected) === index
            const isCorrect = index === question.correctAnswer
            const showCorrectAnswer = showResult || hasAnswered

            return (
              <div
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${
                  showCorrectAnswer
                    ? isCorrect
                      ? "border-green-500/50 bg-green-500/10"
                      : isSelected && !isCorrect
                        ? "border-red-500/50 bg-red-500/10"
                        : "border-border"
                    : isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-border/80"
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer leading-relaxed">
                  {option}
                </Label>
                {showCorrectAnswer && (
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : isSelected && !isCorrect ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : null}
                  </div>
                )}
              </div>
            )
          })}
        </RadioGroup>

        {!hasAnswered && !showResult && (
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={!selected} size="lg">
              Submit Answer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
