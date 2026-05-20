import type { LetterForm } from "@/entities/letter/model/types";
import { generateLetterAI } from "@/shared/api/ai";

export async function generateLetter(form: LetterForm): Promise<string> {
  return await generateLetterAI(form);
}
