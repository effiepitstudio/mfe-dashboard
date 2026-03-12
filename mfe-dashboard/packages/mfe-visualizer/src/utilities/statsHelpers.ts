// Computes 5 most common answers for each field, uses a frequency map per field then sorts in a descending order for the top 5
import type { FormEntry } from "@shared/src/types";
import { COUNTRIES, COLORS } from "@shared/src/types";

interface TopFiveItem {
  value: string;
  count: number;
}

interface FieldTopFive {
  fieldLabel: string;
  items: TopFiveItem[];
}

const countryLabelMap = new Map(COUNTRIES.map((c) => [c.code, c.label]));
const colorLabelMap = new Map(COLORS.map((c) => [c.value, c.label]));

export function computeTopFivePerField(
  entries: ReadonlyArray<FormEntry>,
): FieldTopFive[] {
  const fieldsToAnalyze: Array<{
    key: keyof FormEntry;
    label: string;
    formatValue?: (val: unknown) => string;
  }> = [
    {
      key: "country",
      label: "Country",
      formatValue: (v) => countryLabelMap.get(v as string) ?? String(v),
    },
    { key: "profession", label: "Profession" },
    {
      key: "favoriteColor",
      label: "Favorite color",
      formatValue: (v) => colorLabelMap.get(v as string) ?? String(v),
    },
    { key: "favoriteMovie", label: "Favorite movie" },
    { key: "name", label: "name" },
  ];

  return fieldsToAnalyze.map(({ key, label, formatValue }) => {
    const frequencyMap = new Map<string, number>();

    for (const entry of entries) {
      const rawValue = String(entry[key]);
      const currentCount = frequencyMap.get(rawValue) ?? 0;
      frequencyMap.set(rawValue, currentCount + 1);
    }

    const sorted = Array.from(frequencyMap.entries())
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5);

    const items: TopFiveItem[] = sorted.map(([value, count]) => ({
      value: formatValue ? formatValue(value) : value,
      count,
    }));

    return { fieldLabel: label, items };
  });
}
