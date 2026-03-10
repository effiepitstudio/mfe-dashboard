This is a Microfrontend Dashboard.

The orchestrator and Form MFE are built with React and the Visualizer is built with Vue 3 and [Chart.js](https://www.chartjs.org/) (chosen due to prior experience with the tools)

A monorepo with npm workspaces is the simplest approach that keeps packages independent while allowing for shared code. Each package has its own package.json, vite config and tsconfig.

Communication

The challenge here is how the MFEs should best communicate and share a state. Instead of a URL query parameters which can be limiting or unsafe or a shared state, I chose a custom event based event bus which is framework agnostic and it is the standard practice for MFE architecture.

State Management

For scalability, maintanability and a structured architecture for data flow, I used FLUX pattern, Redux for React for the write side in the Form MFE. For Vue, I could have used Vuex but for this specific read-only from state case, I think it is redundant. A composable just subscribes to the event bus on mount.

UI and theme

This is based in a few previous similar implementations of mine regarding CSS variables on root level, user preference media queries etc and it is there just for enhancing the experience. Not actually specified in the requirements

Security Considerations

Since this is a client-side communication only there is no point for more advanced secure cookies etc.
In a production environment with untrusted third-party scripts, payloads could be encrypted. For this demo, plain JSON is sufficient since all MFEs are trusted first-party code

Installation and Running
Node.js >= 18, npm >=9
Implemented with: node -v
v18.18.0
npm -v
9.8.1

Installing dependencies:
npm install

For running development:
npm run dev

Running test:
npm run test
