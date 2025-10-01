import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Clock,
  Trophy,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                CodeTest Pro
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#tests"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Tests
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            No Login Required
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Master Programming
            <span className="text-primary block">Interview Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Test your coding skills with our comprehensive collection of
            programming interview questions. Practice algorithms, data
            structures, and problem-solving without any signup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/test">
                Start Testing Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose CodeTest Pro?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to ace your programming interviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Multiple Languages</CardTitle>
                <CardDescription>
                  Practice in JavaScript, Python, Java, C++, and more
                  programming languages
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Timed Challenges</CardTitle>
                <CardDescription>
                  Simulate real interview conditions with time-limited coding
                  challenges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Instant Results</CardTitle>
                <CardDescription>
                  Get immediate feedback on your solutions with detailed
                  explanations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>No Registration</CardTitle>
                <CardDescription>
                  Start practicing immediately without creating an account or
                  signing up
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Difficulty Levels</CardTitle>
                <CardDescription>
                  From beginner to expert level questions covering all skill
                  ranges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Real Interview Questions</CardTitle>
                <CardDescription>
                  Practice with questions from top tech companies and coding
                  interviews
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section id="tests" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Test Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from various programming topics and difficulty levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Data Structures",
                questions: 45,
                difficulty: "Beginner to Advanced",
              },
              {
                title: "Algorithms",
                questions: 60,
                difficulty: "Intermediate to Expert",
              },
              { title: "System Design", questions: 25, difficulty: "Advanced" },
              {
                title: "JavaScript Fundamentals",
                questions: 40,
                difficulty: "Beginner to Intermediate",
              },
              {
                title: "Python Programming",
                questions: 50,
                difficulty: "All Levels",
              },
              {
                title: "Database Queries",
                questions: 30,
                difficulty: "Intermediate",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors cursor-pointer group"
              >
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    {category.questions} questions • {category.difficulty}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer   group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers who have improved their coding skills
            with our platform
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/test">
              Start Your First Test
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Code className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">CodeTest Pro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 CodeTest Pro. Built for developers, by developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
