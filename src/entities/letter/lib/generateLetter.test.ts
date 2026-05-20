import { LETTER_TEMPLATE_BUILDERS } from "@/shared/lib/letterTemplates";
import { generateLetter } from "./generateLetter";

describe("generateLetter", () => {
  const form = {
    company: "Acme",
    jobTitle: "QA Engineer",
    skills: "Playwright, Testing Library",
    details: "I enjoy building reliable test automation.",
  };

  it("injects form values into one of the templates", async () => {
    const expectedResults = LETTER_TEMPLATE_BUILDERS.map((builder) => builder(form));
    const result = await generateLetter(form);

    expect(expectedResults).toContain(result);
    expect(result).toContain("Acme");
    expect(result).toContain("QA Engineer");
    expect(result).toContain("Playwright, Testing Library");
    expect(result).toContain("I enjoy building reliable test automation.");
  });
});
