import { QuestionT } from "@/types/question.type";
import { TestDifficultyEnum, TestQuestionTypeEnum } from "@/types/test.type";

export const sampleQuestions: QuestionT[] = [
  // JavaScript Questions
  {
    id: "js1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "JavaScript Array Methods",
    description:
      "Which array method creates a new array with all elements that pass a test implemented by the provided function?",
    options: ["map()", "filter()", "reduce()", "forEach()"],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.EASY,
    category: "JavaScript",
  },
  {
    id: "js2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "JavaScript Hoisting",
    statement:
      "In JavaScript, variable declarations using 'let' and 'const' are hoisted to the top of their scope and can be accessed before declaration.",
    correctAnswer: false,
    explanation:
      "While 'let' and 'const' declarations are hoisted, they are not initialized and cannot be accessed before their declaration due to the Temporal Dead Zone.",
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "JavaScript",
  },
  {
    id: "js3",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "JavaScript Closures",
    description:
      "What will be the output of the following code?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
    options: ["0 1 2", "3 3 3", "undefined undefined undefined", "Error"],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "JavaScript",
  },
  {
    id: "js4",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "JavaScript Equality",
    statement: "In JavaScript, the expression '0' == false evaluates to true.",
    correctAnswer: true,
    explanation:
      "Due to type coercion, '0' is converted to 0 (number) and false is converted to 0, so 0 == 0 is true.",
    difficulty: TestDifficultyEnum.EASY,
    category: "JavaScript",
  },

  // Python Questions
  {
    id: "py1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "Python List Comprehension",
    description:
      "What is the equivalent list comprehension for the following code?\n\nresult = []\nfor x in range(10):\n    if x % 2 == 0:\n        result.append(x**2)",
    options: [
      "[x**2 for x in range(10)]",
      "[x**2 for x in range(10) if x % 2 == 0]",
      "[x for x in range(10) if x**2 % 2 == 0]",
      "[x**2 if x % 2 == 0 for x in range(10)]",
    ],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.EASY,
    category: "Python",
  },
  {
    id: "py2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "Python Mutability",
    statement:
      "In Python, tuples are mutable, meaning you can change their elements after creation.",
    correctAnswer: false,
    explanation:
      "Tuples are immutable in Python. Once created, you cannot change, add, or remove elements from a tuple.",
    difficulty: TestDifficultyEnum.EASY,
    category: "Python",
  },

  // Data Structures & Algorithms
  {
    id: "dsa1",
    type: TestQuestionTypeEnum.CODING,
    title: "Two Sum Problem",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    difficulty: TestDifficultyEnum.EASY,
    category: "Algorithms",
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Your code here
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
}`,
    },
  },
  {
    id: "dsa2",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "Big O Notation",
    description:
      "What is the time complexity of searching for an element in a balanced binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "Data Structures",
  },
  {
    id: "dsa3",
    type: TestQuestionTypeEnum.CODING,
    title: "Reverse Linked List",
    description:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
      },
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
    difficulty: TestDifficultyEnum.EASY,
    category: "Data Structures",
    starterCode: {
      javascript: `function reverseList(head) {
    // Your code here
}`,
      python: `def reverse_list(head):
    # Your code here
    pass`,
      java: `public ListNode reverseList(ListNode head) {
    // Your code here
}`,
      cpp: `ListNode* reverseList(ListNode* head) {
    // Your code here
}`,
    },
  },
  {
    id: "dsa4",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "Stack vs Queue",
    statement:
      "A stack follows the FIFO (First In, First Out) principle, while a queue follows the LIFO (Last In, First Out) principle.",
    correctAnswer: false,
    explanation:
      "This is backwards. A stack follows LIFO (Last In, First Out) and a queue follows FIFO (First In, First Out).",
    difficulty: TestDifficultyEnum.EASY,
    category: "Data Structures",
  },

  // System Design
  {
    id: "sd1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "Database Scaling",
    description:
      "Which approach is typically used to handle read-heavy workloads in database systems?",
    options: [
      "Vertical scaling only",
      "Read replicas",
      "Write sharding",
      "Connection pooling",
    ],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "System Design",
  },
  {
    id: "sd2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "Microservices Architecture",
    statement:
      "In a microservices architecture, all services should share the same database to ensure data consistency.",
    correctAnswer: false,
    explanation:
      "Microservices should have their own databases to maintain independence and avoid tight coupling between services.",
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "System Design",
  },

  // Database Questions
  {
    id: "db1",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "Database Normalization",
    statement:
      "Third Normal Form (3NF) eliminates all transitive dependencies in a database table.",
    correctAnswer: true,
    explanation:
      "3NF requires that all non-key attributes are fully functionally dependent on the primary key and eliminates transitive dependencies.",
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "Database",
  },
  {
    id: "db2",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "SQL Joins",
    description:
      "Which SQL JOIN returns all records from both tables, filling in NULL values where there's no match?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correctAnswer: 3,
    difficulty: TestDifficultyEnum.EASY,
    category: "Database",
  },

  // Web Development
  {
    id: "web1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "HTTP Status Codes",
    description: "What does the HTTP status code 404 indicate?",
    options: ["Server Error", "Unauthorized", "Not Found", "Bad Request"],
    correctAnswer: 2,
    difficulty: TestDifficultyEnum.EASY,
    category: "Web Development",
  },
  {
    id: "web2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "REST API Design",
    statement:
      "In RESTful API design, the HTTP method POST should be used for retrieving data from the server.",
    correctAnswer: false,
    explanation:
      "GET method should be used for retrieving data. POST is typically used for creating new resources.",
    difficulty: TestDifficultyEnum.EASY,
    category: "Web Development",
  },

  // React Questions
  {
    id: "react1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "React Hooks",
    description:
      "Which React Hook is used to perform side effects in functional components?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.EASY,
    category: "React",
  },
  {
    id: "react2",
    type: TestQuestionTypeEnum.TRUE_FALSE,
    title: "React State",
    statement:
      "In React, you should directly mutate the state object to update component state.",
    correctAnswer: false,
    explanation:
      "State should never be mutated directly. Always use setState or the state setter function from useState to update state.",
    difficulty: TestDifficultyEnum.EASY,
    category: "React",
  },

  // Advanced Coding Problems
  {
    id: "adv1",
    type: TestQuestionTypeEnum.CODING,
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets and in the correct order.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    difficulty: TestDifficultyEnum.EASY,
    category: "Algorithms",
    starterCode: {
      javascript: `function isValid(s) {
    // Your code here
}`,
      python: `def is_valid(s):
    # Your code here
    pass`,
      java: `public boolean isValid(String s) {
    // Your code here
}`,
      cpp: `bool isValid(string s) {
    // Your code here
}`,
    },
  },
  {
    id: "adv2",
    type: TestQuestionTypeEnum.CODING,
    title: "Binary Tree Maximum Depth",
    description:
      "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
      },
      {
        input: "root = [1,null,2]",
        output: "2",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100",
    ],
    difficulty: TestDifficultyEnum.EASY,
    category: "Data Structures",
    starterCode: {
      javascript: `function maxDepth(root) {
    // Your code here
}`,
      python: `def max_depth(root):
    # Your code here
    pass`,
      java: `public int maxDepth(TreeNode root) {
    // Your code here
}`,
      cpp: `int maxDepth(TreeNode* root) {
    // Your code here
}`,
    },
  },

  // More challenging questions
  {
    id: "hard1",
    type: TestQuestionTypeEnum.MULTIPLE_CHOICE,
    title: "Concurrency Concepts",
    description: "In concurrent programming, what is a race condition?",
    options: [
      "When two threads run at the same speed",
      "When multiple threads access shared data simultaneously without proper synchronization",
      "When a thread finishes before another thread starts",
      "When threads are scheduled in a specific order",
    ],
    correctAnswer: 1,
    difficulty: TestDifficultyEnum.HARD,
    category: "Concurrency",
  },
  {
    id: "hard2",
    type: TestQuestionTypeEnum.CODING,
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab" or "aba"',
        explanation: "Both are valid answers.",
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters.",
    ],
    difficulty: TestDifficultyEnum.MEDIUM,
    category: "Algorithms",
    starterCode: {
      javascript: `function longestPalindrome(s) {
    // Your code here
}`,
      python: `def longest_palindrome(s):
    # Your code here
    pass`,
      java: `public String longestPalindrome(String s) {
    // Your code here
}`,
      cpp: `string longestPalindrome(string s) {
    // Your code here
}`,
    },
  },
];

// Helper functions for question management
export function getQuestionsByCategory(category: string): QuestionT[] {
  return sampleQuestions.filter((q) => q.category === category);
}

export function getQuestionsByDifficulty(
  difficulty: TestDifficultyEnum
): QuestionT[] {
  return sampleQuestions.filter((q) => q.difficulty === difficulty);
}

export function getQuestionsByType(type: TestQuestionTypeEnum): QuestionT[] {
  return sampleQuestions.filter((q) => q.type === type);
}

export function getRandomQuestions(
  count: number,
  categories?: string[],
  difficulty?: TestDifficultyEnum
): QuestionT[] {
  let filteredQuestions = [...sampleQuestions];

  if (categories && categories.length > 0) {
    filteredQuestions = filteredQuestions.filter((q) =>
      categories.includes(q.category)
    );
  }

  if (difficulty && difficulty !== "Mixed") {
    filteredQuestions = filteredQuestions.filter(
      (q) => q.difficulty === difficulty
    );
  }

  // Shuffle and return requested count
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getAllCategories(): string[] {
  const categories = new Set(sampleQuestions.map((q) => q.category));
  return Array.from(categories).sort();
}

export function getQuestionStats() {
  const stats = {
    total: sampleQuestions.length,
    byDifficulty: {
      Easy: sampleQuestions.filter(
        (q) => q.difficulty === TestDifficultyEnum.EASY
      ).length,
      Medium: sampleQuestions.filter(
        (q) => q.difficulty === TestDifficultyEnum.MEDIUM
      ).length,
      Hard: sampleQuestions.filter(
        (q) => q.difficulty === TestDifficultyEnum.HARD
      ).length,
    },
    byType: {
      "multiple-choice": sampleQuestions.filter(
        (q) => q.type === TestQuestionTypeEnum.MULTIPLE_CHOICE
      ).length,
      coding: sampleQuestions.filter(
        (q) => q.type === TestQuestionTypeEnum.CODING
      ).length,
      "true-false": sampleQuestions.filter(
        (q) => q.type === TestQuestionTypeEnum.TRUE_FALSE
      ).length,
    },
    byCategory: {} as Record<string, number>,
  };

  getAllCategories().forEach((category) => {
    stats.byCategory[category] = sampleQuestions.filter(
      (q) => q.category === category
    ).length;
  });

  return stats;
}
