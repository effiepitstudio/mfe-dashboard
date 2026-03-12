import React, { useEffect, useRef } from "react";
import { createApp, type App as VueApp } from "vue";

/* This wrapper mounts the vue 3 visualizer app inside a react host
Having MFEs means that cross-framework integration might be needed for when different technologies are chosen
Here React renders a div ref as the mount target, on mount tthe vue app is dynamically imported and calls createApp, on unmount app.unmount() is called for cleanup

*/
const VisualizerWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vueAppRef = useRef<VueApp | null>(null);

  useEffect(() => {
    let mounted = true;

    async function mountVueApp() {
      const { default: VisualizerApp } =
        await import("@mfe-visualizer/App.vue");

      if (!mounted || !containerRef.current) return;

      const app = createApp(VisualizerApp);
      app.mount(containerRef.current);
      vueAppRef.current = app;
    }

    mountVueApp();

    return () => {
      mounted = false;

      if (vueAppRef.current) {
        vueAppRef.current.unmount();
        vueAppRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Data Visualizer"
    />
  );
};

export default VisualizerWrapper;
