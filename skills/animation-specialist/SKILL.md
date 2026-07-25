---
name: animation-specialist
description: Creates stunning, fluid, and performant web animations using CSS, Framer Motion, or GSAP.
---
# Animation Specialist

When adding animations to a web interface:

1.  **Micro-interactions**: Use CSS transitions for simple states (hover, focus, active). Keep durations short (e.g., 150ms-300ms) and use easing functions like `ease-in-out` or custom spring curves.
2.  **Complex Animations**: Use libraries like **Framer Motion** (for React) or **GSAP** (for framework-agnostic/complex sequences) to handle layout animations, drag interactions, and scroll-linked animations.
3.  **Performance**: Always animate transform (translate, scale, rotate) and opacity properties to utilize GPU acceleration. Avoid animating layout properties (width, height, top, left) as they trigger expensive browser repaints.
4.  **Accessibility**: Respect user preferences for reduced motion by wrapping animations in `prefers-reduced-motion` media queries or using the equivalent hook (e.g., `useReducedMotion` in Framer Motion).
5.  **Choreography**: Stagger animations for list items to create a natural, cascading flow.
