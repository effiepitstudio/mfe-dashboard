// Shared typed definitions, consumed from both the MFE-Form and the MFE-Visualizer

export interface FormEntry {
  id: string;
  timestamp: string; //For additional functionalities such as sorting and a bigger variety for visualizations
  name: string;
  country: string;
  profession: string;
  height: number;
  favoriteColor: string;
  favoriteMovie: string;
}

export type FormField = keyof Omit<FormEntry, "id" | "timestamp">;

export const FORM_FIELDS: FormField[] = [
  "name",
  "country",
  "profession",
  "height",
  "favoriteColor",
  "favoriteMovie",
];

// Used for the select tag for Country in the form, for having some variety with different types of input fields
// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
export const COUNTRIES: ReadonlyArray<{ code: string; label: string }> = [
  { code: "AU", label: "Australia" },
  { code: "GR", label: "Greece" },
  { code: "US", label: "United States" },
  { code: "CY", label: "Cyprus" },
  { code: "IT", label: "Italy" },
  { code: "IL", label: "Isreal" },
  { code: "IR", label: "Iran" },
] as const;

// same for the favoriteColor field
export const COLORS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "red", label: "Red" },
  { value: "yellow", label: "Yellow" },
  { value: "black", label: "Black" },
  { value: "green", label: "green" },
  { value: "purple", label: "purple" },
  { value: "teal", label: "teal" },
  { value: "blue", label: "blue" },
  { value: "orange", label: "orange" },
] as const;
