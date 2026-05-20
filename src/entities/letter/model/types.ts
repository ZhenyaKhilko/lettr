export interface Letter {
  id: string;
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface LetterForm {
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
}
