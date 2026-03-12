import type { FormEntry, FormField } from "@shared/src/types";
import { COUNTRIES, FORM_FIELDS } from "@shared/src/types";

export interface DistributionItem {
  label: string;
  count: number;
}

export interface FieldDistribution {
  field: FormField;
  fieldLabel: string;
  items: DistributionItem[];
}

const countryLabelMap = new Map(COUNTRIES.map((c) => [c.code, c.label]));

const FIELD_LABELS: Record<FormField, string> = {
  name: "Name",
  country: "Country",
  profession: "Profession",
  height: "Height",
  favoriteColor: "Favorite Color",
  favoriteMovie: "Favorite Movie",
};

const CHART_COLORS = [
  "#ef4444", "#a855f7", "#eab308", "#3b82f6", "#14b8a6",
  "#6b7280", "#f97316", "#22c55e", "#ec4899", "#06b6d4",
];

function computeFieldDistribution(
  entries: ReadonlyArray<FormEntry>,
  field: FormField,
): DistributionItem[] {
  const frequencyMap = new Map<string, number>();

  for (const entry of entries) {
    const value = String(entry[field]);
    const displayLabel =
      field === "country"
        ? (countryLabelMap.get(value) ?? value)
        : value;
    frequencyMap.set(displayLabel, (frequencyMap.get(displayLabel) ?? 0) + 1);
  }

  return Array.from(frequencyMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export function computeAllFieldDistributions(
  entries: ReadonlyArray<FormEntry>,
): FieldDistribution[] {
  return FORM_FIELDS.map((field) => ({
    field,
    fieldLabel: FIELD_LABELS[field],
    items: computeFieldDistribution(entries, field),
  }));
}

export { CHART_COLORS };
