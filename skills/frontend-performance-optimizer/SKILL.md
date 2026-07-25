---
name: frontend-performance-optimizer
description: Optimizes frontend applications for speed, smoothness, and Core Web Vitals.
---
# Frontend Performance Optimizer

When optimizing frontend code, focus on these key areas:

1.  **Code Splitting & Lazy Loading**: Split large bundles and lazy-load components, routes, or libraries that are not immediately needed using `React.lazy()` or dynamic imports.
2.  **Render Optimization**:
    *   Identify and eliminate unnecessary re-renders in React (using `React.memo`, `useMemo`, `useCallback`).
    *   Keep React state as local as possible.
3.  **Asset Optimization**:
    *   Ensure images are properly sized and use modern formats (WebP, AVIF).
    *   Implement lazy loading for images off-screen (`loading="lazy"`).
4.  **Network Requests**:
    *   Batch or debounce API calls where appropriate.
    *   Implement caching strategies (e.g., using React Query, SWR, or Service Workers).
5.  **Core Web Vitals**: Keep LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), and INP (Interaction to Next Paint) in mind. Avoid injecting content dynamically that shifts the page layout.
