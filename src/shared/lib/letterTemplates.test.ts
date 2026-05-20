import { describe, expect, it } from "vitest";
import {
  LETTER_TEMPLATE_BUILDERS,
  buildRandomTemplateLetter,
  pickRandomIndex,
} from "./letterTemplates";

const sampleForm = {
  company: "Acme",
  jobTitle: "QA Engineer",
  skills: "Playwright, Testing Library",
  details: "I enjoy building reliable test automation.",
};

describe("letterTemplates", () => {
  it("picks a random index within range", () => {
    expect(pickRandomIndex(3, () => 0)).toBe(0);
    expect(pickRandomIndex(3, () => 0.99)).toBe(2);
  });

  it("builds one of the available templates", () => {
    const results = LETTER_TEMPLATE_BUILDERS.map((builder) => builder(sampleForm));
    const randomLetter = buildRandomTemplateLetter(sampleForm, () => 0.5);

    expect(results).toContain(randomLetter);
    expect(randomLetter).toContain("Acme");
    expect(randomLetter).toContain("QA Engineer");
    expect(randomLetter).toContain("Playwright, Testing Library");
    expect(randomLetter).toContain("I enjoy building reliable test automation.");
  });
});
