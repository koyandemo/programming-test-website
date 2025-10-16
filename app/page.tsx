"use client";

import { Button } from "@/components/ui/button";
import { getCategoriesWithStats } from "@/database/api/categoryApi";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import CategoryCard from "@/components/shared/CategoryCard";
import BackgroundContainter from "@/components/shared/BackgroundContainter";


export default function HomePage() {
  const categories = getCategoriesWithStats();

  return (
    <div className="relative min-h-screen  overflow-hidden">
     
      <section className="relative overflow-hidden border-b border-border">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" /> */}
        <div className="container relative mx-auto px-4 pt-10 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              No Login Required - Start Testing Instantly
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Master Your Programming Skills with{" "}
              <span className="text-primary">CodeTest Pro</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Take comprehensive programming assessments across multiple
              languages and topics. Get instant feedback, detailed explanations,
              and track your progress — all without creating an account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <Button size="lg" className="text-lg px-8 cursor-pointer">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-card/30 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Our Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from a wide range of programming topics and start testing
              your skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-10">
            <Link href="/categories">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 bg-transparent cursor-pointer"
              >
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// const router = useRouter();
// const { addFromCategoryStore } = useTestSessionStore();

// const features = [
//   {
//     icon: Zap,
//     title: "Instant Start",
//     description: "No signup required. Start testing your skills immediately.",
//   },
//   {
//     icon: Brain,
//     title: "Multiple Categories",
//     description: "JavaScript, Python, React, Algorithms, and more.",
//   },
//   {
//     icon: Target,
//     title: "Difficulty Levels",
//     description: "Choose from Easy, Medium, Hard, or Mixed challenges.",
//   },
//   {
//     icon: CheckCircle,
//     title: "Instant Feedback",
//     description: "Get detailed explanations for every question.",
//   },
//   {
//     icon: Clock,
//     title: "Timed Tests",
//     description: "Practice under real interview conditions.",
//   },
//   {
//     icon: TrendingUp,
//     title: "Track Progress",
//     description: "See your performance and areas for improvement.",
//   },
// ];

//  {/* Features Section */}
//  <section className="py-20 px-4 hidden">
//  <div className="container mx-auto max-w-6xl">
//    <div className="text-center mb-12">
//      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//        Why Choose CodeTest Pro?
//      </h2>
//      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//        Everything you need to prepare for technical interviews and
//        improve your coding skills
//      </p>
//    </div>

//    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//      {features.map((feature, index) => {
//        const Icon = feature.icon;
//        return (
//          <Card
//            key={index}
//            className="p-6 border-2 hover:border-primary/50 transition-all duration-300"
//          >
//            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
//              <Icon className="w-6 h-6" />
//            </div>
//            <h3 className="text-xl font-bold text-foreground mb-2">
//              {feature.title}
//            </h3>
//            <p className="text-muted-foreground">{feature.description}</p>
//          </Card>
//        );
//      })}
//    </div>
//  </div>
// </section>

//  {/* CTA Section */}
//  <section className="py-20 px-4 border-t border-border hidden">
//  <div className="container mx-auto max-w-4xl text-center">
//    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//      Ready to Test Your Skills?
//    </h2>
//    <p className="text-lg text-muted-foreground mb-8">
//      Choose from our curated categories or jump right into a quick
//      assessment
//    </p>
//    <div className="flex flex-col sm:flex-row gap-4 justify-center">
//      <Link href="/categories">
//        <Button size="lg" className="text-lg px-8 cursor-pointer">
//          <Code2 className="w-5 h-5 mr-2" />
//          Explore Categories
//        </Button>
//      </Link>
//      <Button
//        onClick={() => {
//          addFromCategoryStore(false);
//          router.push("/test");
//        }}
//        size="lg"
//        variant="outline"
//        className="text-lg px-8 bg-transparent cursor-pointer"
//      >
//        Start Testing Now
//      </Button>
//    </div>
//  </div>
// </section>
