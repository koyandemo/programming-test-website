import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";
import { CategoryT } from "@/types/category";
import { ArrowRight, BookOpen } from "lucide-react";

type Props = {
  category: CategoryT;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      key={category.id}
      href={`/categories/${category.slug}`}
      className="group"
    >
      <Card className="h-full p-6 hover:shadow-lg  transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/50">
        <div className="flex flex-col h-full">
          {/* Icon with gradient background */}
          <div className="mb-4">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg`}
            >
              {category.icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed line-clamp-2">
            {category.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{category.questionCount} questions</span>
            </div>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
