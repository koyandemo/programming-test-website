"use client";

import CategoryCard from "@/components/shared/CategoryCard";
import { getCategoriesWithStats } from "@/database/api/categoryApi";

export default function CategoriesPage() {
  const categories = getCategoriesWithStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Browse Categories
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose a category to start your programming assessment. Each
              category contains carefully curated questions to test your
              knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}