"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface TrueFalseQuestionProps {
  question: {
    id: string
    title: string
    statement: string
    correctAnswer: boolean
    explanation: string
    difficulty: "Easy" | "Medium" | "Hard"
    category: string
    timeLimit?: number
  }
  onAnswer: (questionId: string, selectedAnswer: boolean, isCorrect: boolean) => void
  showResult?: boolean
  selectedAnswer?: boolean
  timeRemaining?: number
}

export function TrueFalseQuestion({
  question,
  onAnswer,
  showResult = false,
  selectedAnswer,
  timeRemaining,
}: TrueFalseQuestionProps) {
  const [selected, setSelected] = useState<boolean | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)

  const handleAnswer = (answer: boolean) => {
    if (hasAnswered || showResult) return

    setSelected(answer)
    setHasAnswered(true)
    const isCorrect = answer === question.correctAnswer
    onAnswer(question.id, answer, isCorrect)
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

  const getButtonStyle = (isTrue: boolean) => {
    const isSelected = selectedAnswer === isTrue || selected === isTrue
    const isCorrect = question.correctAnswer === isTrue
    const showCorrectAnswer = showResult || hasAnswered

    if (showCorrectAnswer) {
      if (isCorrect) {
        return "border-green-500 bg-green-500/20 text-green-400 hover:bg-green-500/30"
      } else if (isSelected && !isCorrect) {
        return "border-red-500 bg-red-500/20 text-red-400 hover:bg-red-500/30"
      }
    } else if (isSelected) {
      return "border-primary bg-primary/20 text-primary hover:bg-primary/30"
    }

    return "border-border hover:border-border/80"
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
          <p className="text-lg leading-relaxed text-balance">{question.statement}</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleAnswer(true)}
            disabled={hasAnswered || showResult}
            className={`px-12 py-6 text-lg ${getButtonStyle(true)}`}
          >
            <div className="flex items-center gap-3">
              {(showResult || hasAnswered) && question.correctAnswer === true && <CheckCircle className="w-5 h-5" />}
              {(showResult || hasAnswered) &&
                (selectedAnswer === true || selected === true) &&
                question.correctAnswer !== true && <XCircle className="w-5 h-5" />}
              True
            </div>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => handleAnswer(false)}
            disabled={hasAnswered || showResult}
            className={`px-12 py-6 text-lg ${getButtonStyle(false)}`}
          >
            <div className="flex items-center gap-3">
              {(showResult || hasAnswered) && question.correctAnswer === false && <CheckCircle className="w-5 h-5" />}
              {(showResult || hasAnswered) &&
                (selectedAnswer === false || selected === false) &&
                question.correctAnswer !== false && <XCircle className="w-5 h-5" />}
              False
            </div>
          </Button>
        </div>

        {(hasAnswered || showResult) && (
          <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p className="text-muted-foreground leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
