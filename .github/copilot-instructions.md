# AI Coding Guidelines for React Portfolio Project

## Architecture Overview

This is a React-based portfolio website featuring an interactive 3D scene built with Three.js. The app consists of:

- **Hero Scene**: 3D canvas with orbiting job nodes around a central React core
- **Job Detail Panel**: Animated overlay showing selected job information
- **Skills/Contact Sections**: Static content areas below the hero

Key data flows from `src/data/resumeData.ts` through typed interfaces in `src/types/resume.ts`, with state managed in `App.tsx` using `useDeferredValue` for performance.

## Development Workflow

- **Start dev server**: `npm run dev` (Vite with hot reload)
- **Build for production**: `npm run build` (custom chunking separates Three.js/React vendors)
- **Preview build**: `npm run preview`
- No test suite currently exists; add tests to `package.json` scripts when implementing

## Code Patterns & Conventions

### Animation & Motion

Use Framer Motion with project-specific easing: `[0.22, 1, 0.36, 1]` for smooth transitions.

```tsx
<motion.div
  initial={{ opacity: 0, x: 26 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
>
```

### 3D Scene Management

- Camera positioned at `[0, 0.2, 15.8]` with FOV 33
- Lighting: ambient (0.48), directional, and colored point lights
- Use `motionFactor` (0.28 for reduced motion, 1.0 normal) to scale animations
- Orbit visuals defined in `OrbitSystem.tsx` with radius, speed, tilt arrays

### Component Structure

- Props interfaces defined alongside components (e.g., `JobDetailPanelProps`)
- Use `AnimatePresence` for enter/exit animations
- Class naming: BEM-like with dashes (e.g., `job-panel__close`, `hero-scene`)

### State Management

- Job selection uses `useDeferredValue` for smooth UI updates
- Panel closes on outside click or Escape key
- Responsive behavior: auto-scroll panel on mobile (`max-width: 960px`)

### Styling

- CSS custom properties for theme colors (e.g., `--cyan: #6ad8ff`)
- Dark theme with radial gradients and particle effects
- Fonts: Sora (body), Barlow Condensed (headings)

### TypeScript

- Strict mode enabled
- Import types explicitly: `import type { JobEntry }`
- Interface definitions in `src/types/` directory

## Key Files

- `src/App.tsx`: Main state logic and layout
- `src/components/HeroScene.tsx`: 3D canvas setup and scene rig
- `src/components/OrbitSystem.tsx`: Job node rendering with orbit visuals
- `src/data/resumeData.ts`: All content data
- `src/types/resume.ts`: Type definitions</content>
  <parameter name="filePath">/Users/ankursharma/Documents/Study/Practise/React practise/.github/copilot-instructions.md
