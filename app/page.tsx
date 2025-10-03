"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Brain, CheckCircle, Clock, Code2, Sparkles, Target, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Instant Start",
      description: "No signup required. Start testing your skills immediately.",
    },
    {
      icon: Brain,
      title: "Multiple Categories",
      description: "JavaScript, Python, React, Algorithms, and more.",
    },
    {
      icon: Target,
      title: "Difficulty Levels",
      description: "Choose from Easy, Medium, Hard, or Mixed challenges.",
    },
    {
      icon: CheckCircle,
      title: "Instant Feedback",
      description: "Get detailed explanations for every question.",
    },
    {
      icon: Clock,
      title: "Timed Tests",
      description: "Practice under real interview conditions.",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "See your performance and areas for improvement.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              No Login Required - Start Testing Instantly
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Master Your Programming Skills with <span className="text-primary">CodeTest Pro</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Take comprehensive programming assessments across multiple languages and topics. Get instant feedback,
              detailed explanations, and track your progress - all without creating an account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <Button size="lg" className="text-lg px-8">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Categories
                </Button>
              </Link>
              <Link href="/test">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  <Target className="w-5 h-5 mr-2" />
                  Quick Start Test
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose CodeTest Pro?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to prepare for technical interviews and improve your coding skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 border-2 hover:border-primary/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Test Your Skills?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose from our curated categories or jump right into a quick assessment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories">
              <Button size="lg" className="text-lg px-8">
                <Code2 className="w-5 h-5 mr-2" />
                Explore Categories
              </Button>
            </Link>
            <Link href="/test">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Start Testing Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
