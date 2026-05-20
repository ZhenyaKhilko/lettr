import { MAX_DETAILS_LENGTH } from "@/shared/config/constants";
import type { LetterForm } from "@/entities/letter/model/types";

export function isFormFilled(form: LetterForm): boolean {
  return (
    form.jobTitle.trim().length > 0 &&
    form.company.trim().length > 0 &&
    form.skills.trim().length > 0 &&
    form.details.trim().length > 0
  );
}

export function isDetailsOverLimit(details: string): boolean {
  return details.length > MAX_DETAILS_LENGTH;
}

export function canGenerate(form: LetterForm): boolean {
  return isFormFilled(form) && !isDetailsOverLimit(form.details);
}

export const DEFAULT_FORM_TITLE = "New application";

export function getFormTitle(form: LetterForm, isNew: boolean): string {
  if (isNew && !form.jobTitle.trim() && !form.company.trim()) {
    return DEFAULT_FORM_TITLE;
  }
  if (form.jobTitle.trim() && form.company.trim()) {
    return `${form.jobTitle.trim()}, ${form.company.trim()}`;
  }
  return DEFAULT_FORM_TITLE;
}
