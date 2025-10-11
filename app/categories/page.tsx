"use client"

import { Card } from "@/components/ui/card"
import { getCategoriesWithStats } from "@/database/api/categoryApi"
import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  const categories = getCategoriesWithStats()
  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">Browse Categories</h1>
            <p className="text-lg text-muted-foreground">
              Choose a category to start your programming assessment. Each category contains carefully curated questions
              to test your knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="group">
              <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/50">
                <div className="flex flex-col h-full">
                  {/* Icon with gradient background */}
                  <div className="mb-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl shadow-lg`}
                    >
                      {category.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 flex-grow leading-relaxed">{category.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{category.questionCount} questions</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
