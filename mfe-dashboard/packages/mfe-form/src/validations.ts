// Pure functions validating the form

export interface ValidationErrors {
  name: string | null;
  country: string | null;
  profession: string | null;
  height: string | null;
  favoriteColor: string | null;
  favoriteMovie: string | null;
}

export const validateName = (value: string): string | null => {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 20) return "Name must be under 20 characters";

  return null;
};

export const validateCountry = (value: string): string | null => {
  if (!value) return "Please select a country";

  return null;
};

export const validateHeight = (value: string): string | null => {
  if (!value) return "Height is required";
  const heightRegex = /^[1-9]\d{2}$/;
  if (!heightRegex.test(value)) return "Height must be a 3 digit number";
  const num = parseInt(value, 10);
  if (num < 80 || num > 250) return "Height must be between 80 and 250 cm";

  return null;
};

export const validateProfession = (value: string): string | null => {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "Profession is required";
  if (trimmed.length < 2) return "Profession must be at least 2 characters";

  return null;
};

export const validateFavoriteColor = (value: string): string | null => {
  if (!value) return "Please select a color";
  return null;
};

export const validateFavoriteMovie = (value: string): string | null => {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "Favorite movies is required";
  if (trimmed.length < 1) return "Movie title too short!";

  return null;
};

export const validateAllFields = (fields: {
  name: string;
  country: string;
  profession: string;
  height: string;
  favoriteColor: string;
  favoriteMovie: string;
}): ValidationErrors => ({
  name: validateName(fields.name),
  country: validateCountry(fields.country),
  profession: validateProfession(fields.profession),
  height: validateHeight(fields.height),
  favoriteColor: validateFavoriteColor(fields.favoriteColor),
  favoriteMovie: validateFavoriteMovie(fields.favoriteMovie),
});

export const hasValidationErrors = (errors: ValidationErrors): boolean =>
  Object.values(errors).some((error) => error !== null);
