import React, { useCallback } from "react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  error,
  options,
  placeholder,
}) => {
  const fieldId = `field-${label.toLowerCase().replace(/\a+/g, "-")}`;
  const errorId = `${fieldId}-error`;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <div className="flex flex-col mt-4">
      <label
        htmlFor={fieldId}
        className="text-sm font-medium mb-2"
        style={{
          color: "var(--color-primary)",
        }}
      >
        {label}
      </label>
      <select
        id={fieldId}
        value={value}
        onChange={handleChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="px-3 py-2 text-sm rounded border transition-colors appearance-none"
        style={{
          backgroundColor: "var(--color-input-bg)",
          borderColor: error ? "red" : "var(--color-border)",
          color: value ? "var(--color-primary)" : "var(--secondary)",
        }}
      >
        {placeholder && (
          <option
            value=""
            disabled
          >
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span
          id={errorId}
          className="text-xs mt-2"
          style={{ color: "red" }}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};
