import { defineDocumentType, makeSource } from "contentlayer/source-files"

export const Question = defineDocumentType(() => ({
  name: "Question",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    id: {
      type: "string",
      required: true,
    },
    questionType: {
      type: "enum",
      options: ["MULTIPLE_CHOICE", "TRUE_FALSE", "CODING"],
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    difficulty: {
      type: "enum",
      options: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    timeLimit: {
      type: "number",
      required: false,
    },
    // Multiple Choice fields
    options: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
    correctAnswer: {
      type: "json",
      required: false,
    },
    // True/False fields
    statement: {
      type: "string",
      required: false,
    },
    explanation: {
      type: "string",
      required: false,
    },
    // Coding fields
    examples: {
      type: "json",
      required: false,
    },
    constraints: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
    starterCode: {
      type: "json",
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/questions/${doc._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Question],
})
