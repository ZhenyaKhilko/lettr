import { MAX_DETAILS_LENGTH } from "../../../shared/config/constants";
import { canGenerate, getFormTitle, isDetailsOverLimit } from "./validation";

describe("letter validation", () => {
  const validForm = {
    jobTitle: "Frontend Engineer",
    company: "Acme",
    skills: "React, TypeScript",
    details: "I build clean interfaces.",
  };

  it("allows generation when form is filled", () => {
    expect(canGenerate(validForm)).toBe(true);
  });

  it("blocks generation if one field is empty", () => {
    expect(canGenerate({ ...validForm, company: "   " })).toBe(false);
  });

  it("detects details overflow", () => {
    expect(isDetailsOverLimit("a".repeat(MAX_DETAILS_LENGTH + 1))).toBe(true);
  });

  it("builds smart page title", () => {
    expect(getFormTitle(validForm, true)).toBe("Frontend Engineer, Acme");
  });
});
