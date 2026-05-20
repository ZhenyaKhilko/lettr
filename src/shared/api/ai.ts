import type { LetterForm } from "@/entities/letter/model/types";
import {
  buildRandomTemplateLetter,
  pickRandomOpenAITemplateInstruction,
} from "@/shared/lib/letterTemplates";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export async function generateLetterAI(form: LetterForm): Promise<string> {
  if (API_URL && API_URL !== "fallback") {
    try {
      const response = await fetch(`${API_URL}/generate-letter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "Unknown BFF Error");
        throw new Error(errText || `BFF returned status: ${response.status}`);
      }

      const data = await response.json();
      if (typeof data.content !== "string") {
        throw new Error("Invalid response format from BFF proxy server.");
      }
      return data.content;
    } catch (error) {
      console.error("BFF proxy API call failed:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Could not generate letter via BFF proxy server.",
      );
    }
  }

  if (API_KEY && API_KEY !== "your_openai_api_key_here") {
    console.warn(
      "[Security Warning]: Direct client-side OpenAI call detected. " +
        "Exposing API keys in client-side network requests is unsafe for production. " +
        "Configure VITE_API_URL to proxy requests through a secure Backend-for-Frontend (BFF) server.",
    );

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert cover letter writer. ${pickRandomOpenAITemplateInstruction()}`,
            },
            {
              role: "user",
              content: `Job Title: ${form.jobTitle}\nCompany: ${form.company}\nSkills: ${form.skills}\nAdditional Details: ${form.details}`,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `OpenAI returned status: ${response.status}`,
        );
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("OpenAI direct API call failed:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Could not generate letter using client-side OpenAI call.",
      );
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.details.trim().toLowerCase() === "fail") {
        reject(new Error("Simulated API Error: API Rate Limit exceeded (mock testing)."));
        return;
      }

      resolve(buildRandomTemplateLetter(form));
    }, 2000);
  });
}
