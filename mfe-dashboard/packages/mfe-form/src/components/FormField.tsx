import React, { useCallback } from "react";

interface FormFieldsProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric";
  maxLength?: number;
}

export const FormField: React.FC<FormFieldsProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  inputMode = "text",
  maxLength,
}) => {
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = `${fieldId}-error`;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <div className="flex flex-col gap-l">
      <label
        htmlFor={fieldId}
        className="text-sm font-medium"
        style={{ color: "var(--color-on-surface)" }}
      >
        {label}
      </label>

      <input
        id={fieldId}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="px-3 py-2 text-sm rounded border transition-colors"
        style={{
          backgroundColor: "var(--color-input-bg)",
          borderColor: error ? "red" : "var(--color-border)",
          color: "var(--color-on-surface)",
        }}
      />

      {error && (
        <span
          id={errorId}
          className="text-sm"
          style={{ color: "red" }}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};
