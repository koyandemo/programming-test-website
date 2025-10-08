# Setup Instructions for Programming Test Website

## Issue: Empty Questions Array

If you're seeing an empty `allQuestions` array, it means **Contentlayer hasn't generated the data yet**.

### Solution

Run the development server to generate Contentlayer data:

\`\`\`bash
npm run dev
\`\`\`

This will:
1. Process all MDX files in the `content/javaScript/` directory
2. Generate TypeScript types and data in `.contentlayer/generated/`
3. Populate the `allQuestions` array with parsed question data

### How It Works

1. **Content Storage**: Questions are stored as MDX files in `content/javaScript/` organized by difficulty (easy/, medium/, hard/)
2. **Contentlayer Processing**: The `contentlayer.config.ts` file defines how to parse these MDX files
3. **Data Generation**: When you run `npm run dev` or `npm run build`, Contentlayer generates the data
4. **Import**: The `questionApi.ts` imports the generated data from `contentlayer/generated`

### Adding New Questions

To add new questions:

1. Create a new `.mdx` file in `content/javaScript/[difficulty]/`
2. Follow the frontmatter format from existing questions
3. The data will be automatically regenerated when you save

### Current Questions

The project includes sample questions:
- `js1-array-methods.mdx` - Easy
- `js2-variable-scope.mdx` - Easy
- `js4-equality.mdx` - Easy
- `js5-typeof-operator.mdx` - Easy
- `js3-closures.mdx` - Medium
- `js6-promises.mdx` - Medium
- `js7-event-loop.mdx` - Hard

### Troubleshooting

If questions still don't appear:
1. Check that `.contentlayer/generated` directory exists
2. Look for any Contentlayer errors in the console
3. Verify MDX frontmatter format matches the schema in `contentlayer.config.ts`
4. Try deleting `.contentlayer` and running `npm run dev` again
