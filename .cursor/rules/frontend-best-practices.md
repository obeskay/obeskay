# Frontend Development Rules

## General Structure
- Follow the established project structure with components in `src/components/`
- Group components by feature or type (e.g., `ui/`, `layout/`, `product/`)
- Keep UI components modular and reusable

## Styling Guidelines
- Use Tailwind CSS with the defined color palette in the config
- Follow the shadcn-like approach for UI components
- Use css variables for theming as defined in globals.css
- Maintain proper dark mode support using the ThemeProvider

## State Management
- Use React hooks for component-level state
- For complex state, consider context API or similar patterns
- Keep state as close to where it's used as possible

## Data Fetching
- Use GraphQL with the graphql-request client for Payload CMS data
- Implement proper TypeScript interfaces for all fetched data
- Keep API calls in dedicated utility files (`lib/payload-cms.ts`)
- Use static generation (getStaticProps/getStaticPaths) with ISR when appropriate

## Performance
- Use Next.js Image component for optimized images
- Implement proper lazy loading strategies
- Set appropriate revalidation times for static pages
- Minimize unnecessary re-renders

## Accessibility
- Ensure proper semantics and ARIA attributes
- Maintain good color contrast
- Support keyboard navigation
- Provide good screen reader experiences

## Component Patterns
- Follow the established Button component pattern for other UI components
- Use "use client" directive for client components
- Implement proper responsiveness using Tailwind breakpoints
- Use composition over inheritance

## Code Quality
- Write clean, maintainable code
- Add JSDoc comments for complex functions
- Follow TypeScript best practices
- Ensure proper error handling

## Git Process
- Write descriptive commit messages
- Group related changes in single commits
- Test changes locally before committing
- Document significant changes in comments 