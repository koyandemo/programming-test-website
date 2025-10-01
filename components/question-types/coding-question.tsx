"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Play, CheckCircle, XCircle } from "lucide-react"
import { CodingQuestionT } from "@/types/question.type"

interface CodingQuestionProps {
  question: CodingQuestionT
  onSubmit: (questionId: string, code: string, language: string) => void
  timeRemaining?: number
}

export function CodingQuestion({ question, onSubmit, timeRemaining }: CodingQuestionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState(question.starterCode?.[selectedLanguage] || "")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; expected: string; actual: string }>
  >([])

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ]

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(question.starterCode?.[language] || "")
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => {
      const mockResults = question.examples.map((example, index) => ({
        passed: Math.random() > 0.3, // Mock some passing/failing tests
        input: example.input,
        expected: example.output,
        actual: Math.random() > 0.3 ? example.output : "Different output",
      }))
      setTestResults(mockResults)
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmit = () => {
    onSubmit(question.id, code, selectedLanguage)
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
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Question Header */}
      <Card>
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
        <CardContent>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="constraints">Constraints</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">{question.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-6 space-y-4">
              {question.examples.map((example, index) => (
                <div key={index} className="border border-border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div>
                      <span className="text-muted-foreground">Input: </span>
                      <span className="text-foreground">{example.input}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Output: </span>
                      <span className="text-foreground">{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="text-muted-foreground">Explanation: </span>
                        <span className="text-foreground">{example.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="constraints" className="mt-6">
              <ul className="space-y-2">
                {question.constraints.map((constraint, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {constraint}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Code Editor */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Write your ${languages.find((l) => l.value === selectedLanguage)?.label} code here...`}
              className="min-h-96 font-mono text-sm bg-muted/30"
            />
            <div className="flex gap-3 mt-4">
              <Button onClick={handleRunCode} disabled={isRunning} variant="outline">
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
              <Button onClick={handleSubmit} disabled={!code.trim()}>
                Submit Solution
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            {testResults.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Run your code to see test results</p>
              </div>
            ) : (
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.passed ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.passed ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className="font-semibold">Test Case {index + 1}</span>
                    </div>
                    <div className="font-mono text-sm space-y-1">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span>{result.input}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected: </span>
                        <span>{result.expected}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actual: </span>
                        <span>{result.actual}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
