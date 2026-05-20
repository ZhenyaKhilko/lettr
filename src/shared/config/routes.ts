import { APP_ROUTES } from "./constants";

export function getLetterRoute(id: string): string {
  return APP_ROUTES.letter.replace(":id", id);
}
