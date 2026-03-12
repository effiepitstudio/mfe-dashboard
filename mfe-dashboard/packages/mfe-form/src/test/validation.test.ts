import { describe, it, expect } from "vitest";
import {
  validateName,
  validateCountry,
  validateHeight,
  validateProfession,
  validateFavoriteColor,
  validateFavoriteMovie,
  validateAllFields,
  hasValidationErrors,
  type ValidationErrors,
} from "../validations";

describe("validateName", () => {
  it("returns null for a valid name", () => {
    expect(validateName("Effie")).toBeNull();
  });

  it("returns error for empty string", () => {
    expect(validateName("")).toBe("Name is required");
  });

  it("returns error for whitespace-only string", () => {
    expect(validateName("   ")).toBe("Name is required");
  });

  it("returns error for single character", () => {
    expect(validateName("A")).toBe("Name must be at least 2 characters");
  });

  it("returns error for name over 20 characters", () => {
    expect(validateName("A".repeat(21))).toBe(
      "Name must be under 20 characters",
    );
  });

  it("returns null for exactly 2 characters", () => {
    expect(validateName("Ab")).toBeNull();
  });

  it("returns null for exactly 20 characters", () => {
    expect(validateName("A".repeat(20))).toBeNull();
  });
});

describe("validateCountry", () => {
  it("returns null for a valid country", () => {
    expect(validateCountry("GR")).toBeNull();
  });

  it("returns error for empty string", () => {
    expect(validateCountry("")).toBe("Please select a country");
  });
});

describe("validateHeight", () => {
  it("returns null for a valid height", () => {
    expect(validateHeight("180")).toBeNull();
  });

  it("returns error for empty string", () => {
    expect(validateHeight("")).toBe("Height is required");
  });

  it("returns error for non-numeric value", () => {
    expect(validateHeight("abc")).toBe("Height must be a 3 digit number");
  });

  it("returns error for 2-digit number", () => {
    expect(validateHeight("99")).toBe("Height must be a 3 digit number");
  });

  it("returns error for 4-digit number", () => {
    expect(validateHeight("1800")).toBe("Height must be a 3 digit number");
  });

  it("returns error for height starting with 0", () => {
    expect(validateHeight("099")).toBe("Height must be a 3 digit number");
  });

  it("returns null for valid height within range", () => {
    expect(validateHeight("100")).toBeNull();
  });

  it("returns error for height below 80 (regex rejects leading zero)", () => {
    // Heights below 100 that are valid (80-99) can't be expressed as 3-digit
    // without leading zero, which the regex rejects
    expect(validateHeight("080")).toBe("Height must be a 3 digit number");
  });

  it("returns null for height exactly 250", () => {
    expect(validateHeight("250")).toBeNull();
  });

  it("returns error for height above 250", () => {
    expect(validateHeight("251")).toBe(
      "Height must be between 80 and 250 cm",
    );
  });
});

describe("validateProfession", () => {
  it("returns null for a valid profession", () => {
    expect(validateProfession("Engineer")).toBeNull();
  });

  it("returns error for empty string", () => {
    expect(validateProfession("")).toBe("Profession is required");
  });

  it("returns error for whitespace-only string", () => {
    expect(validateProfession("   ")).toBe("Profession is required");
  });

  it("returns error for single character", () => {
    expect(validateProfession("A")).toBe(
      "Profession must be at least 2 characters",
    );
  });

  it("returns null for exactly 2 characters", () => {
    expect(validateProfession("IT")).toBeNull();
  });
});

describe("validateFavoriteColor", () => {
  it("returns null for a valid color", () => {
    expect(validateFavoriteColor("red")).toBeNull();
  });

  it("returns error for empty string", () => {
    expect(validateFavoriteColor("")).toBe("Please select a color");
  });
});

describe("validateFavoriteMovie", () => {
  it("returns null for a valid movie", () => {
    expect(validateFavoriteMovie("Inception")).toBeNull();
  });

  it("returns error for empty string", () => {
    expect(validateFavoriteMovie("")).toBe("Favorite movies is required");
  });

  it("returns error for whitespace-only string", () => {
    expect(validateFavoriteMovie("   ")).toBe("Favorite movies is required");
  });
});

describe("validateAllFields", () => {
  const validFields = {
    name: "Effie",
    country: "GR",
    profession: "Engineer",
    height: "180",
    favoriteColor: "red",
    favoriteMovie: "Inception",
  };

  it("returns all nulls for valid fields", () => {
    const result = validateAllFields(validFields);

    expect(result.name).toBeNull();
    expect(result.country).toBeNull();
    expect(result.profession).toBeNull();
    expect(result.height).toBeNull();
    expect(result.favoriteColor).toBeNull();
    expect(result.favoriteMovie).toBeNull();
  });

  it("returns errors for all empty fields", () => {
    const result = validateAllFields({
      name: "",
      country: "",
      profession: "",
      height: "",
      favoriteColor: "",
      favoriteMovie: "",
    });

    expect(result.name).toBe("Name is required");
    expect(result.country).toBe("Please select a country");
    expect(result.profession).toBe("Profession is required");
    expect(result.height).toBe("Height is required");
    expect(result.favoriteColor).toBe("Please select a color");
    expect(result.favoriteMovie).toBe("Favorite movies is required");
  });

  it("returns mixed results for partially valid fields", () => {
    const result = validateAllFields({
      ...validFields,
      name: "",
      height: "abc",
    });

    expect(result.name).toBe("Name is required");
    expect(result.height).toBe("Height must be a 3 digit number");
    expect(result.country).toBeNull();
    expect(result.profession).toBeNull();
    expect(result.favoriteColor).toBeNull();
    expect(result.favoriteMovie).toBeNull();
  });
});

describe("hasValidationErrors", () => {
  it("returns false when all errors are null", () => {
    const errors: ValidationErrors = {
      name: null,
      country: null,
      profession: null,
      height: null,
      favoriteColor: null,
      favoriteMovie: null,
    };

    expect(hasValidationErrors(errors)).toBe(false);
  });

  it("returns true when at least one error exists", () => {
    const errors: ValidationErrors = {
      name: "Name is required",
      country: null,
      profession: null,
      height: null,
      favoriteColor: null,
      favoriteMovie: null,
    };

    expect(hasValidationErrors(errors)).toBe(true);
  });

  it("returns true when all fields have errors", () => {
    const errors: ValidationErrors = {
      name: "Name is required",
      country: "Please select a country",
      profession: "Profession is required",
      height: "Height is required",
      favoriteColor: "Please select a color",
      favoriteMovie: "Favorite movies is required",
    };

    expect(hasValidationErrors(errors)).toBe(true);
  });
});
