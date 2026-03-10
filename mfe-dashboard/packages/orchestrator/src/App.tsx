import React, { Suspense, lazy, useState, useCallback } from "react";
import { Header } from "./components/Header";
import { LoadingFallback } from "./components/LoadingFallback";

//lazy loading microfrontends

const FormApp = lazy(() => import("./mfe-wrappers/FormWrapper"));
const VisualizerApp = lazy(() => import("./mfe-wrappers/VisualizerWrapper"));

type Route = "form" | "visualizer";

export const App: React.FC = () => {
    const [activeRoute, setActiveRoute] = useState<Route>("form");

    const handleNavigate = useCallback((route: Route) => {
        setActiveRoute(route);
    }, []);

    return (
        <div className="grid min-h-screen"
            style={{ gridTemplateRows: "auto 1fr" }}
            role="application"
            aria-label="Microfrontend Dashboard">
            <Header activeRoute={activeRoute} onNavigate={handleNavigate} />
            <main className="p-6 max-w-6xl mx-auto w-full" role="main" aria-live="polite">
                <Suspense fallback={<LoadingFallback />}>
                    {activeRoute === "form" ? <FormApp /> : <VisualizerApp />}
                </Suspense>
            </main>
        </div>
    );
};