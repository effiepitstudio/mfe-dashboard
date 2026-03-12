import React from "react";
import "./SubmitButton.css";

interface SubmitButtonProps {
  onClick: (event: React.FormEvent) => void;
  label: string;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  label,
  disabled = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="submit-button relative items-center justify-center text-on-surface overflow-hidden bg-on-surface border-solid cursor-pointer w-full"
    aria-label={label}
  >
    <span className="submit-button__label relative z-10">{label}</span>
  </button>
);
