import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4, validate } from "uuid";
import { addEntry } from "../store/formEntriesSlice";
import type { FormEntry } from "@shared/src/types";
import { COUNTRIES, COLORS } from "@shared/src/types";
import {
  validateAllFields,
  hasValidationErrors,
  type ValidationErrors,
} from "../validations";
import { FormField } from "./FormField";
import { SelectField } from "./SelectField";
import { SubmitButton } from "./SubmitButton";

interface FormValues {
  name: string;
  country: string;
  profession: string;
  height: string;
  favoriteColor: string;
  favoriteMovie: string;
}

const INITIAL_VALUES: FormValues = {
  name: "",
  country: "",
  profession: "",
  height: "",
  favoriteColor: "",
  favoriteMovie: "",
};

const EMPTY_ERRORS: ValidationErrors = {
  name: null,
  country: null,
  profession: null,
  height: null,
  favoriteColor: null,
  favoriteMovie: null,
};

export const EntryForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES);
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors>(EMPTY_ERRORS);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countryOptions = useMemo(
    () => COUNTRIES.map((c) => ({ value: c.code, label: c.label })),
    [],
  );

  const colorOptions = useMemo(
    () => COLORS.map((c) => ({ value: c.value, label: c.label })),
    [],
  );

  const handleFieldChange = useCallback(
    (fieldName: keyof FormValues) => (value: string) => {
      setFormValues((prev) => ({ ...prev, [fieldName]: value }));
      if (isSubmitted) {
        setValidationErrors((prev) => ({ ...prev, [fieldName]: null }));
      }
    },
    [isSubmitted],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setIsSubmitted(true);

      const errors = validateAllFields(formValues);
      setValidationErrors(errors);

      if (hasValidationErrors(errors)) return;

      const newEntry: FormEntry = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        name: formValues.name.trim(),
        country: formValues.country,
        profession: formValues.profession.trim(),
        height: parseInt(formValues.height, 10),
        favoriteColor: formValues.favoriteColor,
        favoriteMovie: formValues.favoriteMovie.trim(),
      };

      dispatch(addEntry(newEntry));

      // reset form after submit
      setFormValues(INITIAL_VALUES);
      setValidationErrors(EMPTY_ERRORS);
      setIsSubmitted(false);
    },
    [dispatch, formValues],
  );

  return (
    <div className="max-w-lg mx-auto">
      <h2
        className="text-lg font-semibold mb-6"
        style={{ color: "var(--color-primary)" }}
      >
        Add New Entry
      </h2>
      <form
        aria-label="Data entry form"
        className="space-y-4 flex flex-col gap-4"
      >
        {/* Name field */}
        <FormField
          label="Name"
          value={formValues.name}
          onChange={handleFieldChange("name")}
          error={validationErrors.name}
          placeholder="Full Name"
          autoComplete="name"
        />
        {/* Country field */}
        <SelectField
          label="Country"
          value={formValues.country}
          onChange={handleFieldChange("country")}
          error={validationErrors.country}
          options={countryOptions}
          placeholder="Select a Country"
        />
        {/* Profession field */}
        <FormField
          label="Profession"
          value={formValues.profession}
          onChange={handleFieldChange("profession")}
          error={validationErrors.profession}
          placeholder="e.g Teacher"
        />
        {/* Height field */}
        <FormField
          label="Height (cm)"
          value={formValues.height}
          onChange={handleFieldChange("height")}
          error={validationErrors.height}
          placeholder="e.g 160"
          inputMode="numeric"
          maxLength={3}
        />
        <SelectField
          label="Favorite Color"
          value={formValues.favoriteColor}
          onChange={handleFieldChange("favoriteColor")}
          error={validationErrors.favoriteColor}
          options={colorOptions}
          placeholder="Pick a color"
        />
        {/* Favorite movie */}
        <FormField
          label="favorite movie"
          value={formValues.favoriteMovie}
          onChange={handleFieldChange("favoriteMovie")}
          error={validationErrors.favoriteMovie}
          placeholder="e.g Dunkirk"
        />
        <div className="pt-4">
          <SubmitButton
            onClick={handleSubmit}
            label="Submit Entry"
          />
        </div>
      </form>
    </div>
  );
};
