import type { LetterForm } from "@/entities/letter/model/types";

type LetterTemplateBuilder = (form: LetterForm) => string;

function getFormValues(form: LetterForm) {
  const jobTitle = form.jobTitle.trim();
  const company = form.company.trim();
  const skills = form.skills.trim();
  const details =
    form.details.trim() ||
    "I look forward to discussing how my experience can benefit your team.";

  return { jobTitle, company, skills, details };
}

const formalTemplate: LetterTemplateBuilder = (form) => {
  const { jobTitle, company, skills, details } = getFormValues(form);

  return (
    `Dear ${company} Team,\n\n` +
    `I am writing to express my interest in the ${jobTitle} position.\n\n` +
    `My experience in the realm combined with my skills in ${skills} make me a strong candidate for this role.\n\n` +
    `${details}\n\n` +
    `I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.\n\n` +
    `Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`
  );
};

const directTemplate: LetterTemplateBuilder = (form) => {
  const { jobTitle, company, skills, details } = getFormValues(form);

  return (
    `Dear ${company} Hiring Team,\n\n` +
    `I am excited to apply for the ${jobTitle} role at ${company}. With strong skills in ${skills}, I am ready to contribute from day one and grow with your team.\n\n` +
    `${details}\n\n` +
    `I would welcome the opportunity to discuss how my background aligns with your goals.\n\n` +
    `Best regards`
  );
};

const storyTemplate: LetterTemplateBuilder = (form) => {
  const { jobTitle, company, skills, details } = getFormValues(form);

  return (
    `Dear ${company} Team,\n\n` +
    `When I saw the opening for ${jobTitle} at ${company}, it immediately resonated with me. Over the years, I have built practical expertise in ${skills}, and I am motivated to bring that experience to meaningful projects.\n\n` +
    `${details}\n\n` +
    `Thank you for reviewing my application. I hope to connect with you soon.\n\n` +
    `Sincerely`
  );
};

export const LETTER_TEMPLATE_BUILDERS: LetterTemplateBuilder[] = [
  formalTemplate,
  directTemplate,
  storyTemplate,
];

export const OPENAI_TEMPLATE_INSTRUCTIONS = [
  "Return ONLY the final cover letter text in this exact template and paragraph order, replacing placeholders with values and not adding any extra lines.\n\nDear [Company] Team,\n\nI am writing to express my interest in the [JobTitle] position.\n\nMy experience in the realm combined with my skills in [SkillsList] make me a strong candidate for this role.\n\n[AdditionalDetails]\n\nI am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.\n\nThank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.",
  "Return ONLY the final cover letter text in this exact template and paragraph order, replacing placeholders with values and not adding any extra lines.\n\nDear [Company] Hiring Team,\n\nI am excited to apply for the [JobTitle] role at [Company]. With strong skills in [SkillsList], I am ready to contribute from day one and grow with your team.\n\n[AdditionalDetails]\n\nI would welcome the opportunity to discuss how my background aligns with your goals.\n\nBest regards",
  "Return ONLY the final cover letter text in this exact template and paragraph order, replacing placeholders with values and not adding any extra lines.\n\nDear [Company] Team,\n\nWhen I saw the opening for [JobTitle] at [Company], it immediately resonated with me. Over the years, I have built practical expertise in [SkillsList], and I am motivated to bring that experience to meaningful projects.\n\n[AdditionalDetails]\n\nThank you for reviewing my application. I hope to connect with you soon.\n\nSincerely",
] as const;

export function pickRandomIndex(length: number, random = Math.random): number {
  return Math.floor(random() * length);
}

export function buildRandomTemplateLetter(
  form: LetterForm,
  random = Math.random,
): string {
  const index = pickRandomIndex(LETTER_TEMPLATE_BUILDERS.length, random);
  return LETTER_TEMPLATE_BUILDERS[index](form);
}

export function pickRandomOpenAITemplateInstruction(random = Math.random): string {
  const index = pickRandomIndex(OPENAI_TEMPLATE_INSTRUCTIONS.length, random);
  return OPENAI_TEMPLATE_INSTRUCTIONS[index];
}
