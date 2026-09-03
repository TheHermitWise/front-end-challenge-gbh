# ADR: Incident Desk Frontend

## Context

The challenge asks for a responsive incident desk that supports scanning, narrowing, selecting, and updating incidents. It also requires submission documentation, a test, and an agent log. Backend integration is optional.

## Options

- Use React/Vite with a testing library.
- Use vanilla JavaScript with browser APIs and a small static server.
- Use a component library for ready-made controls.

## Decision

Use vanilla JavaScript modules, semantic HTML templates, plain CSS, `localStorage`, URL query parameters, and Node's built-in test runner.

## Trade-Offs

### Framework

Vanilla JavaScript keeps setup small and avoids dependency installation risk. React would improve component ergonomics for a larger app, but this scope is manageable with focused modules.

### CSS Approach

Plain CSS is enough for the required responsive states and accessibility styling. A utility framework could speed spacing decisions, but custom CSS makes the visual hierarchy and breakpoints explicit.

### State Model

The app keeps runtime state in one module-level object. Selected incident state is shareable through the URL, while status overrides persist in `localStorage`. This is simple and inspectable, but a larger app would benefit from a reducer or dedicated store.

### Testing Approach

Node's built-in test runner validates filtering, sorting, and persisted status updates. This covers a critical interaction without external packages. The gap is that DOM behavior is manually checked rather than browser-automated.

### Agent Workflow

The agent read the challenge requirements, chose a low-dependency implementation, generated the project structure, and verified with local tests. Manual judgment was still applied to product density, accessibility, and documentation decisions.
