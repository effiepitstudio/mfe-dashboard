import React from 'react';
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./global.scss";

function initializeTheme(): void {
    const stored = localStorage.getItem("dashboard-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
}

initializeTheme();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);