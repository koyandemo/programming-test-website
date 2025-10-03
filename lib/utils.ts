import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-500/10 text-green-400 border-green-500/20";
    case "Medium":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    case "Hard":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    case "Mixed":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getPerformanceLevel = (percentage: number) => {
  if (percentage >= 90)
    return {
      level: "Excellent",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    };
  if (percentage >= 80)
    return {
      level: "Very Good",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    };
  if (percentage >= 70)
    return {
      level: "Good",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    };
  if (percentage >= 60)
    return {
      level: "Fair",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    };
  return {
    level: "Needs Improvement",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  };
};
