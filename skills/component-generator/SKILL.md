---
name: component-generator
description: Generates high-quality, reusable, and accessible React components with styling and proper typings.
---
# Component Generator

When asked to create a UI component, follow these strict guidelines:

1.  **Framework & Language**: Use React and TypeScript unless specified otherwise.
2.  **Styling**: Use the project's existing styling solution (e.g., Tailwind CSS, CSS Modules, or Vanilla CSS). If none is specified, prefer semantic Vanilla CSS or Tailwind.
3.  **Props**: Define clear, descriptive TypeScript interfaces for all component props. Include default values for optional props.
4.  **Accessibility (a11y)**:
    *   Use semantic HTML tags (`<button>`, `<nav>`, `<main>`, `<article>`, etc.).
    *   Add appropriate `aria-*` attributes when standard HTML semantics are insufficient.
    *   Ensure all interactive elements are keyboard accessible (tab-focusable and respond to Enter/Space).
5.  **Reusability**: Keep components small, focused, and free of unnecessary business logic. Pass data and callbacks as props.
6.  **Structure**:
    ```tsx
    import React from 'react';

    export interface ComponentNameProps {
        // ...
    }

    export const ComponentName: React.FC<ComponentNameProps> = ({ ... }) => {
        return (
            // ...
        );
    };
    ```
