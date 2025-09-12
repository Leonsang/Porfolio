# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern personal portfolio website built with Next.js 15 and TypeScript. It features:
- Multilingual support (Spanish/English) using next-intl
- Modern UI with Tailwind CSS and Framer Motion animations
- 3D graphics integration with Three.js and React Three Fiber
- AI chat assistant integration with Hugging Face API
- Interactive data visualizations with Chart.js
- Responsive design optimized for all devices

## Development Commands

### Core Development
- `pnpm run dev` - Start development server with Turbo (localhost:3000)
- `pnpm run build` - Build production version with Turbo
- `pnpm run start` - Start production server
- `pnpm run analyze` - Build with bundle analysis

### Code Quality
- `pnpm run lint` - Run ESLint checks
- `pnpm run type-check` - Run TypeScript type checking
- `pnpm run ci:check` - Run both type-check and lint (CI pipeline)

## Architecture Overview

### Directory Structure
- `src/app/` - Next.js 15 App Router with internationalization
  - `[locale]/` - Localized routes (ES/EN)
  - `api/` - API routes (e.g., Athena chat endpoint)
- `src/components/` - Reusable UI components organized by type
  - `sections/` - Main portfolio sections (Hero, About, Experience, etc.)
  - `layout/` - Layout components (Navigation, Theme switcher, etc.)
  - `effects/` - Special effects and interactive components
  - `charts/` - Data visualization components
- `src/config/` - Application configuration
  - `portfolio.ts` - Main portfolio data and content
  - `cv.ts` - CV/Resume related configuration
- `src/i18n/` - Internationalization setup and configuration
- `src/types/` - TypeScript type definitions
- `messages/` - Translation files (en.json, es.json)
- `public/` - Static assets including images and documents

### Key Configuration Files
- Portfolio content is centralized in `src/config/portfolio.ts`
- Internationalization uses next-intl with routing configuration
- Theme and styling managed through Tailwind CSS configuration
- TypeScript paths configured with `@/*` alias for src directory

### Technology Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS 4 with custom theme configuration
- **Animations**: Framer Motion for smooth transitions
- **3D Graphics**: Three.js with React Three Fiber integration
- **Charts**: Chart.js with React Chart.js 2
- **Internationalization**: next-intl for ES/EN support
- **Icons**: Lucide React
- **Package Manager**: pnpm (use pnpm instead of npm/yarn)

### State Management
- The portfolio uses a config-driven approach with data centralized in `src/config/portfolio.ts`
- Component state managed through React hooks and context where needed
- Internationalization handled by next-intl provider and hooks

### Content Management
- All portfolio content (personal info, projects, experience, skills) is defined in `src/config/portfolio.ts`
- Translations stored in `messages/en.json` and `messages/es.json`
- Static assets organized in `public/images/` and `public/docs/`

### Development Notes
- Project uses Next.js 15 App Router with file-based routing
- Turbopack is enabled for faster development builds
- ESLint follows Next.js recommended configuration with TypeScript support
- The project is designed as a personal portfolio showcasing data engineering expertise
- AI chat integration requires HUGGINGFACE_API_TOKEN environment variable (optional)