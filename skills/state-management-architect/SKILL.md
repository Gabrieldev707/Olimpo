---
name: state-management-architect
description: Designs and implements robust state management solutions for complex frontend applications.
---
# State Management Architect

When dealing with application state, follow these guidelines:

1.  **Local vs. Global**: Always prefer local component state (`useState`, `useReducer`) unless the state needs to be accessed by multiple, disconnected components.
2.  **Server State**: Treat server data differently from UI state. Use libraries like React Query, SWR, or Apollo Client to manage fetching, caching, synchronization, and invalidation of server data.
3.  **Global UI State**: For genuinely global UI state (e.g., theme, user session, complex cross-component interactions), use a lightweight solution like Context API, Zustand, or Jotai. Avoid heavy boilerplate (like Redux) unless the application's complexity strictly demands it.
4.  **Immutability**: Always update state immutably to ensure predictable renders and easier debugging.
5.  **Derived State**: Compute derived state on the fly during rendering rather than storing it in state, using `useMemo` if the computation is expensive.
