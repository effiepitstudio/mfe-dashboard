import React, { useCallback } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  activeRoute: "form" | "visualizer";
  onNavigate: (route: "form" | "visualizer") => void;
}

export const Header: React.FC<HeaderProps> = ({ activeRoute, onNavigate }) => {
  const handleFormClick = useCallback(() => onNavigate("form", [onNavigate]));
  const handleVizClick = useCallback(() =>
    onNavigate("visualizer", [onNavigate]),
  );

  return (
    <header
      className="border-b px-6 py-3 flex items-center justify-between"
      style={{ borderColor: "var(--color-border)" }}
    >
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-6"
      >
        <h1 className="text-sm font-semibold">Dashboard</h1>
        <NavButton
          label="Form"
          isActive={activeRoute === "form"}
          onClick={handleFormClick}
        />
        <NavButton
          label="Visualizer"
          isActive={activeRoute === "visualizer"}
          onClick={handleVizClick}
        />
      </nav>
      <ThemeToggle />
    </header>
  );
};

// NavButton sub-component

interface NavButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`text-sm px-3 py-1 rounded transition-colors duration-150 ${isActive ? "font-semibold" : "opacity-60 hover:opacity-100"}
            `}
    style={{
      color: "var(--color-on-surface)",
      backgroundColor: isActive ? "var(--color-border)" : "transparent",
    }}
    aria-current={isActive ? "page" : "undefined"}
  >
    {label}
  </button>
);
