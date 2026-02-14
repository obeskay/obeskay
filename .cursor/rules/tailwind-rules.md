# Tailwind CSS Development Rules

## CSS & Tailwind Utilities

1. **Always verify shadow utilities are defined in config**:
   - If using shadow utilities like `shadow-md`, ensure they are properly defined in the `boxShadow` section of the Tailwind configuration.
   - Default shadow values that should be included:
     ```js
     boxShadow: {
       sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
       DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
       md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
       lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
       xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
       "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
       inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
       none: "none",
     }
     ```

2. **Prefer inline styles for background colors over utility classes**:
   - For backgrounds using theme colors, prefer using inline styles with HSL values:
   - Instead of: `className="bg-background"`
   - Use: `style={{ backgroundColor: 'hsl(var(--background))' }}`

3. **Test new utility classes before deployment**:
   - When adding new Tailwind utility classes, verify they exist in the current configuration.
   - Run a local build test before committing changes with new utility classes.

4. **Custom utilities management**:
   - Define custom utilities in the `@layer utilities` section of the global CSS file.
   - Make sure they don't conflict with existing Tailwind utilities.

5. **Check Tailwind compatibility when upgrading Next.js**:
   - When upgrading Next.js, verify that the Tailwind CSS configuration is still compatible.
   - Review PostCSS configuration if encountering build errors after upgrades.

## Component Styling

1. **Ensure shadcn/ui component consistency**:
   - When styling shadcn/ui components, check for any direct references to utility classes that might not be defined.
   - Use consistent approach for styling (props vs. className vs. inline styles).

2. **Follow HSL color notation**:
   - Use HSL color notation for all color values in the theme.
   - Format: `hsl(var(--color-name))` where color-name is defined in the root CSS variables.

## Debug Procedures

If encountering Tailwind utility class errors:

1. Check if the utility class is defined in the Tailwind configuration.
2. Verify that the class is being correctly detected by the Tailwind content configuration.
3. Clear the Next.js cache and retry the build: `npm run dev -- --clear-cache`
4. For persistent issues, replace problematic utility classes with inline styles or custom CSS. 