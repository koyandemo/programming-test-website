# Overview

CodeTest Pro is a programming interview platform built with Next.js that allows users to test their coding skills through interactive assessments. The platform features multiple question types (multiple choice, true/false, and coding challenges) across various programming categories including JavaScript, Python, React, Database, Algorithms, and System Design. The application uses a content-driven architecture where questions are stored as MDX files and processed through Contentlayer for type-safe content management.

**Replit Migration Status**: Successfully migrated from Vercel to Replit on October 12, 2025. The application is configured to run on port 5000 with proper network binding for the Replit environment.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Next.js 14+ with App Router and React Server Components
- Uses TypeScript for type safety throughout the application
- Implements client-side state management with Zustand for test session persistence
- Utilizes Radix UI primitives and shadcn/ui components for consistent, accessible UI
- Applies Tailwind CSS with custom design tokens for styling (dark theme by default)
- Implements geist fonts (sans and mono) for typography

**Routing Structure**:
- `/` - Landing page with category overview and features
- `/categories` - Browse all available question categories
- `/categories/[slug]` - Individual category detail pages
- `/test` - Main test engine with three views (selection, test, results)

**State Management Pattern**:
- Zustand store (`testSessionStore`) manages:
  - Current test session configuration and answers
  - View state (SELECTION → TEST → RESULTS)
  - Category navigation context
  - Persistent storage via localStorage

**Component Architecture**:
- Question type components are isolated and self-contained:
  - `MultipleChoiceQuestion` - Handles MCQ with radio selection
  - `TrueFalseQuestion` - Binary choice questions
  - `CodingQuestion` - Code editor with language selection and test execution
- Test engine uses ref-based submission pattern to decouple parent/child interaction
- Client layout dynamically shows/hides header based on test view state

## Content Management System

**Contentlayer Integration**:
- MDX-based content authoring for questions, categories, and test genres
- Automatic TypeScript type generation from content schemas
- Content organized hierarchically: `content/[category]/[difficulty]/[question].mdx`
- Three content types defined:
  - `Question` - Individual test questions with type-specific fields
  - `Category` - Programming topic categories with metadata
  - `Genre` - Pre-configured test suites with duration and difficulty settings

**Content Processing Flow**:
1. MDX files authored in `content/` directory with frontmatter
2. Contentlayer processes files on build/dev
3. Generates typed data in `.contentlayer/generated/`
4. API layer (`database/api/`) transforms Contentlayer output to application types
5. Components consume typed data via API functions

**Question Type System**:
- Enum-based type discrimination (`MULTIPLE_CHOICE`, `TRUE_FALSE`, `CODING`)
- Type-specific fields validated at content layer
- Random question selection algorithm supports filtering by:
  - Category (JavaScript, Python, React, etc.)
  - Difficulty (EASY, MEDIUM, HARD, MIXED)
  - Question count limits

## Test Engine Architecture

**Test Flow**:
1. **Selection Phase** - User chooses test configuration (genre/category, difficulty, duration)
2. **Countdown Dialog** - Optional 3-second preparation countdown
3. **Test Phase** - Question-by-question progression with:
   - Timer management (optional countdown mode)
   - Answer submission tracking
   - Progress indicator
   - Navigation controls (next/previous)
4. **Results Phase** - Performance analysis with:
   - Score calculation and performance level
   - Question-by-question review
   - Time spent per question
   - Detailed explanations

**Timer System**:
- Configurable test duration in minutes
- Real-time countdown with 5-minute warning
- Auto-submission on time expiration
- Per-question time tracking for analytics

**Answer Validation**:
- Immediate validation on submission (not on selection)
- Ref-based submission pattern allows parent to trigger child validation
- Prevents navigation without answering current question
- Tracks correctness and time spent per question

## Data Layer Design

**API Abstraction**:
- `questionApi.ts` - Question CRUD and filtering logic
- `categoryApi.ts` - Category management with question count statistics
- `genreApi.ts` - Pre-configured test suite management
- Graceful fallback when Contentlayer hasn't generated data yet

**Type System**:
- Discriminated unions for question types ensure type safety
- Separate types for test configuration, session state, and answers
- Enum-based constants for difficulty and question types prevent magic strings

**Question Selection Algorithm**:
- Filters questions by category and difficulty criteria
- Randomizes selection for test variety
- Supports mixed difficulty by proportional sampling
- Ensures no duplicate questions in single test session

## Build and Development Pipeline

**Development Workflow**:
- `pnpm run dev` - Runs Contentlayer in watch mode + Next.js dev server on port 5000 (bound to 0.0.0.0 for Replit)
- Content changes trigger automatic regeneration
- Hot module replacement for instant UI updates
- Package manager: pnpm (uses pnpm-lock.yaml)

**Production Build**:
- `contentlayer build` runs before `next build`
- Generates optimized static content at build time
- Type-safe imports prevent runtime content errors
- Deployment configured for Replit autoscale target

**Content Generation**:
- Must run dev server at least once to generate `.contentlayer/generated/` data
- Contentlayer package.json provides module exports for type safety
- TypeScript paths configured for `contentlayer/generated` imports with baseUrl set to "."

**Replit Configuration**:
- Next.js dev server configured to bind to 0.0.0.0:5000 for proper proxy support
- Deployment target: autoscale (stateless Next.js application)
- Workflow: "Next.js Dev Server" runs `pnpm run dev` with webview output
- Known warnings: Contentlayer skips `javaScript/README.md` (non-blocking)

# External Dependencies

## UI and Styling
- **Radix UI** - Headless component primitives (dialog, select, tabs, radio, progress, etc.)
- **shadcn/ui** - Pre-built accessible components built on Radix
- **Tailwind CSS** - Utility-first styling with custom design system
- **Geist Fonts** - Typography system (sans and mono variants)
- **Lucide React** - Icon library for UI elements
- **class-variance-authority** - Component variant management
- **tailwind-merge/clsx** - Conditional class name utilities

## Content and Data
- **Contentlayer** - MDX content processing and type generation
- **@mdx-js/mdx** - MDX parsing and rendering
- **date-fns** - Date formatting and manipulation
- **Zustand** - Lightweight state management with persistence

## Forms and Validation
- **React Hook Form** - Form state management
- **@hookform/resolvers** - Validation schema resolvers
- **Zod** (implied by resolvers) - Runtime type validation

## Development and Deployment
- **Vercel Analytics** - Performance and usage tracking
- **Next.js** - React framework with app router
- **TypeScript** - Type safety and developer experience
- **ESLint** - Code quality and consistency

## Build Tools
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS transformation
- **Contentlayer CLI** - Content build pipeline

## Testing Platform Features
- **Code Execution** - Client-side code evaluation for coding questions (simulated, not actual execution)
- **Timer Management** - Countdown timers with warning thresholds
- **Progress Tracking** - Session persistence and analytics
- **Results Analysis** - Performance scoring and question review