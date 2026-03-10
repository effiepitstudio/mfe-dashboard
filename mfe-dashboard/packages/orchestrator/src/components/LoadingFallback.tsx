import React from "react";

// Suspense fallback while lazy-loading a MFE

export const LoadingFallback: React.FC = () => (
    <div className="flex items-center justify-center py-20"
        role="status" aria-label="Loading micro frontend content">
        <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border=2 rounded-full animate-spin"
                style={{ borderColor: "var(--color-border", borderTopColor: "var(--color-on-surface" }} />
            <span className="text-sm" style={{ color: "var(--color-muted)" }}> Loading...</span>
        </div>
    </div>
)