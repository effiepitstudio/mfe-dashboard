This is a Microfrontend Dashboard.

The orchestrator and Form MFE are built with React and the Visualizer is built with Vue 3 and [Chart.js](https://www.chartjs.org/) (chosen due to prior experience with the tools)

A monorepo with npm workspaces is the simplest approach that keeps packages independent while allowing for shared code. Each package has its own package.json, vite config and tsconfig.

# Communication

The challenge here is how the MFEs should best communicate and share a state. Instead of a URL query parameters which can be limiting or unsafe or a shared state, I chose a custom event based event bus which is framework agnostic and it is the standard practice for MFE architecture.

# State Management

For scalability, maintanability and a structured architecture for data flow, I used FLUX pattern, Redux for React for the write side in the Form MFE. For Vue, I could have used Vuex but for this specific read-only from state case, I think it is redundant. A composable just subscribes to the event bus on mount.

**FLUX Write-side**: In mfe-dashboard\packages\mfe-form\src\store\formEntriesSlice.ts in the MFE-Form using redux-toolkit

**FLUX Read-side**: In mfe-dashboard\packages\mfe-visualizer\src\composables\useEntriesSubscription.ts composable in MFE-Visualizer

# UI and theme

This is based in a few previous similar implementations of mine regarding CSS variables on root level, user preference media queries etc and it is there just for enhancing the experience. Not actually specified in the requirements

# Security Considerations

Since this is a client-side communication only there is no point for more advanced secure cookies etc.
In a production environment with untrusted third-party scripts, payloads could be encrypted. For this demo, plain JSON is sufficient since all MFEs are trusted first-party code

# Installation and Running

Node.js >= 18, npm >=9
Implemented with: node -v
v18.18.0
npm -v
9.8.1

**Installing dependencies** (For all microfrontends at once):
cd mfe-dashboard
npm install

**For running development** (Runs all servers):
npm run dev

**Navigate to** http://localhost:9000/

**Running test**
npm run test

# Orchestrator MFE

This is a simple MFE, it manages layout, routing (via state) and the theme (personal choice).
I could have used react router but for this simple case, simple state routing is enough

# Future enhancements

1. Storybook for mocking components as the app scales, for maintaining a good design system, reusable components strategy
2. Visualizations need adjustments for the theming
3. User options in the vue app for Chart type and Column layout can be stored in persistedState so that when the user navigates from one MFE to the other the preference is kept for a better UX
