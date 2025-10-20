# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Filipino Quiz Website - "Ang Matanda at ang Dagat" is an interactive educational quiz application with ocean-themed design. Built with React, TypeScript, Vite, and Supabase, it features a two-part quiz structure for students and a teacher dashboard for viewing results.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Run development server (opens on http://localhost:3000)
npm run dev

# Build for production
npm run build
```

### Note on Testing
This project does not currently have a test suite configured. No test commands are available.

## Architecture Overview

### Application Flow
The app uses a multi-screen state machine pattern managed in App.tsx:
1. **WelcomeScreen** - Student name entry
2. **PagbabalikaralScreen** - Part 1: Review section (10 questions)
3. **UnlockedScreen** - Celebration screen between parts
4. **QuizScreen** - Part 2: Main quiz (5 questions)
5. **ResultScreen** - Final score display
6. **AdminLogin** - Teacher authentication (route: `/admin`)
7. **TeacherDashboard** - Score management and statistics

App.tsx deleted (see git status), so the current working version is in `.history/src/App_20251020103642.tsx` or newer.

### Data Flow Pattern

**Two-Part Quiz Scoring:**
- Part 1 completion → `savePart1Score()` creates database record, returns `recordId`
- Store `recordId` in App state
- Part 2 completion → `updatePart2Score(recordId, ...)` updates the same record with combined scores

**Real-time Updates:**
- Teacher dashboard subscribes to database changes via `subscribeToQuizScores()`
- New student submissions appear automatically without refresh

### Key Files Structure

```
src/
├── App.tsx (DELETED - check .history/ for latest)
├── main.tsx - React entry point
├── components/
│   ├── WelcomeScreen.tsx
│   ├── PagbabalikaralScreen.tsx - Part 1 review
│   ├── UnlockedScreen.tsx - Transition celebration
│   ├── QuizScreen.tsx - Part 2 main quiz
│   ├── ResultScreen.tsx
│   ├── AdminLogin.tsx - Teacher authentication
│   ├── TeacherDashboard.tsx - Score management
│   ├── FloatingFish.tsx - Animation component
│   ├── WaveAnimation.tsx - Animation component
│   └── ui/ - Radix UI components (shadcn/ui)
├── utils/supabase/
│   ├── client.ts - Supabase client + TypeScript types
│   ├── database.ts - CRUD operations for quiz_scores
│   └── auth.ts - Teacher authentication functions
└── supabase/
    └── functions/server/ - Edge functions (if any)
```

## Supabase Integration

### Database Functions (utils/supabase/database.ts)

**Core Functions:**
- `saveQuizScore(score)` - Save complete quiz score
- `getAllQuizScores()` - Fetch all scores for dashboard
- `getScoresByStudent(name)` - Filter by student
- `getQuizStatistics()` - Calculate averages, perfect scores
- `deleteQuizScore(id)` - Admin deletion
- `subscribeToQuizScores(callback)` - Real-time subscription

**Two-Part Quiz Functions:**
- `savePart1Score(name, score, total)` - Creates record, returns `recordId`
- `updatePart2Score(recordId, score, total)` - Updates existing record with combined scores

### Authentication Functions (utils/supabase/auth.ts)

- `signUpTeacher(email, password)` - Create teacher account
- `signInTeacher(email, password)` - Login teacher
- `signOutTeacher()` - Logout
- `getCurrentTeacher()` - Get session status

### Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Important Implementation Notes

### Current State Issues
- `src/App.tsx` is DELETED according to git status
- Latest working version likely in `.history/src/App_20251020103642.tsx`
- Before making changes, check if App.tsx needs to be restored

### Component Patterns

**UI Components:**
- Uses shadcn/ui components from `components/ui/` (Radix UI primitives)
- All UI components use Tailwind CSS for styling
- Path alias `@/` configured in vite.config.ts points to `./src`

**Animation Components:**
- FloatingFish.tsx and WaveAnimation.tsx use Framer Motion (imported as 'motion')
- Motion library handles all animations and transitions

### Database Schema

```sql
quiz_scores table:
├── id (BIGSERIAL PRIMARY KEY)
├── student_name (TEXT)
├── score (INTEGER)
├── total_questions (INTEGER)
├── percentage (DECIMAL(5,2))
├── quiz_topic (TEXT)
└── created_at (TIMESTAMP)
```

### Routing Behavior

- Main app uses client-side routing (no react-router)
- `/admin` route managed via `window.location.pathname` checks
- `window.history.pushState()` updates URL without page reload
- Admin access protected by authentication state

## Design System

### Color Palette
- Deep Sea Blue: `#0B3D91`
- Sunset Gold: `#FDB813`
- Seafoam Green: `#4ECDC4`
- Coral Red: `#FF6B6B`
- Sand Beige: `#F5E8C7`

### Theme
Ocean-themed Filipino cultural design with animated waves, floating fish, particle effects, and confetti celebrations.

## Security Model

1. **Row Level Security (RLS)** - Configured in Supabase
2. **Teacher Authentication** - Required for dashboard access
3. **Environment Variables** - API keys never committed
4. **Public INSERT** - Students can submit scores
5. **Authenticated SELECT** - Teachers see all scores

## Common Tasks

### Adding New Questions
1. Edit question arrays in QuizScreen.tsx or PagbabalikaralScreen.tsx
2. Update `totalQuestions` constants in App.tsx
3. No database changes needed

### Modifying Quiz Flow
1. Update state machine logic in App.tsx
2. Modify screen transitions in handler functions
3. Ensure `recordId` tracking for two-part scoring

### Working with Deleted Files
The following files are deleted but may exist in `.history/`:
- src/App.tsx
- Multiple .md documentation files

Before editing, check if restoration is needed or work from history files.

## Technology Stack

- **Frontend:** React 18, TypeScript, Vite 6
- **UI Library:** Radix UI (shadcn/ui components)
- **Styling:** Tailwind CSS (inline via className)
- **Animation:** Motion (Framer Motion)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Build Tool:** Vite with SWC plugin

## Deployment Notes

- Build output directory: `build/`
- Dev server port: 3000
- Production: Add environment variables to hosting platform
- Compatible with Vercel, Netlify, and similar platforms
