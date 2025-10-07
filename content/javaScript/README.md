# JavaScript Questions

This directory contains JavaScript programming questions organized by difficulty level.

## Structure

- `easy/` - Beginner-friendly questions
- `medium/` - Intermediate level questions  
- `hard/` - Advanced level questions

## Adding New Questions

Each question should be a separate MDX file with frontmatter containing:

- `id`: Unique identifier
- `type`: Question type (MULTIPLE_CHOICE, TRUE_FALSE, or CODING)
- `title`: Question title
- `description`: Question description (optional)
- `difficulty`: EASY, MEDIUM, or HARD
- `category`: "JavaScript"
- Additional fields based on question type

### Example Multiple Choice Question

\`\`\`mdx
---
id: "js-unique-id"
type: "MULTIPLE_CHOICE"
title: "Question Title"
description: "Question description"
difficulty: "EASY"
category: "JavaScript"
options:
  - "Option 1"
  - "Option 2"
  - "Option 3"
correctAnswer: 0
---

# Question Content

Additional explanation or context can go here.
\`\`\`
