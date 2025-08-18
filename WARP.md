# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview
- Type: Vite + TypeScript single-page application (portfolio)
- Package manager: npm (package-lock.json present)
- Entry: index.html with src/ TypeScript sources
- Dev server: Vite on port 3000 (auto-open)

Common commands
- Install dependencies (fresh clone or CI):
  - npm ci
  - If npm ci fails locally (modified lockfile), use: npm install
- Start dev server (hot reload on http://localhost:3000):
  - npm run dev
- Type-check and build for production (outputs to dist/):
  - npm run build
- Preview the production build locally (http://localhost:4173):
  - npm run preview
- Serve spline-test.html on a separate port (for the Spline loader/runtime demo):
  - npm run test-spline  # opens on port 3001

Notes on linting and tests
- Linting: No linter is configured in this repo (no ESLint/Prettier config files detected).
- Tests: No test runner is configured; there are no test scripts. Running a single test is not applicable in the current setup.

High-level architecture and structure
- Modular sections architecture (see ARCHITECTURE.md):
  - components/sections/
    - BaseSection.ts: abstract base with lifecycle (init, show, hide, destroy), event listener setup/cleanup, and hooks (onShow, onHide).
    - ProjectsSection.ts: concrete example section extending BaseSection; owns its DOM/content and events; integrates with translations.
    - Additional planned sections (About, Overview, Technical, Experience, Contact) are marked TODO.
  - components/layout/
    - PortfolioNavigation.ts: builds navigation tabs dynamically, handles section switching animations, integrates with i18n.
    - SectionContainer.ts (TODO): layout wrapper for sections.
  - components/ui/ (TODO): shared UI like DashboardCard, SectionHeader.
  - components/PortfolioManager.ts: orchestrates the app—initializes sections, manages language changes and global events, and exposes a public API (e.g., getActiveSection, switchToSection).
  - config/sections.ts: central registry describing available sections (id, labelKey, sectionId, enabled, etc.) used by navigation/manager.
  - main.ts: application entry that wires the above together and mounts to the DOM.
- Data flow (from ARCHITECTURE.md):
  - User Action → PortfolioNavigation → PortfolioManager → Section → DOM Update
  - Example: Click Tab → switchToSection() → onSectionChange() → show() → UI Update
- i18n pattern:
  - Sections update content via data-i18n attributes and i18n.t(key). Ensure new UI elements include data-i18n where applicable; the concrete i18n setup is referenced in docs but may be implemented elsewhere in src/.
- Assets and public folder:
  - Public assets are served from public/. Audio files for the music player live in public/sounds/ (see public/sounds/README.md for guidance). Reference audio via paths like /sounds/<file>.mp3 at runtime.

Build configuration highlights
- tsconfig.json
  - Strict TypeScript settings; moduleResolution: bundler; noEmit: true (tsc is used for type-checking during build).
  - Path alias: "@/*" → "src/*". Use imports like import {...} from '@/components/...'.
- vite.config.ts
  - base: './' for relative asset paths (useful for static hosting like GitHub Pages).
  - build: outDir "dist", assetsDir "assets", minify "terser"; manualChunks configured:
    - vendor: ['chart.js']
    - utils: ['particles.js']
  - resolve.alias: '@' → src
  - server: port 3000, open: true; preview: port 4173, open: true

External integration rules
- No CLAUDE.md, Cursor rules (.cursor/rules/ or .cursorrules), or GitHub Copilot instructions (.github/copilot-instructions.md) were found.

Operational tips specific to this repo
- When adding a new section:
  - Implement it by extending BaseSection.
  - Register the section in components/PortfolioManager.ts during initialization and in config/sections.ts for navigation and metadata.
  - Add data-i18n attributes for any user-facing text to integrate with the i18n pattern described in ARCHITECTURE.md.
- For audio features:
  - Place tracks in public/sounds/ and reference them with /sounds/<filename>. Update any AudioPlayer configuration accordingly.

