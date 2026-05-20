import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  loadLettersAsync,
  saveLetterAsync,
  deleteLetterAsync,
} from "@/entities/letter/lib/storage";
import type { Letter, LetterForm } from "@/entities/letter/model/types";

type LettersState = {
  letters: Letter[];
};

type InitLettersAction = {
  type: "init";
  payload: {
    letters: Letter[];
  };
};

type AddLetterAction = {
  type: "add";
  payload: {
    letter: Letter;
  };
};

type UpdateLetterAction = {
  type: "update";
  payload: {
    id: string;
    form: LetterForm;
    content: string;
  };
};

type DeleteLetterAction = {
  type: "delete";
  payload: {
    id: string;
  };
};

type LettersAction =
  | InitLettersAction
  | AddLetterAction
  | UpdateLetterAction
  | DeleteLetterAction;

type LettersContextValue = {
  letters: Letter[];
  isLoading: boolean;
  addLetter: (form: LetterForm, content: string) => Promise<Letter>;
  updateLetter: (id: string, form: LetterForm, content: string) => Promise<void>;
  deleteLetter: (id: string) => Promise<void>;
  getLetter: (id: string) => Letter | undefined;
};

function createId(): string {
  return crypto.randomUUID();
}

function lettersReducer(state: LettersState, action: LettersAction): LettersState {
  if (action.type === "init") {
    return {
      letters: action.payload.letters,
    };
  }

  if (action.type === "add") {
    return {
      letters: [action.payload.letter, ...state.letters],
    };
  }

  if (action.type === "update") {
    const nextLetters = state.letters.map((letter) =>
      letter.id === action.payload.id
        ? {
            ...letter,
            ...action.payload.form,
            content: action.payload.content,
            updatedAt: Date.now(),
          }
        : letter,
    );

    return {
      letters: nextLetters,
    };
  }

  return {
    letters: state.letters.filter((letter) => letter.id !== action.payload.id),
  };
}

const LettersContext = createContext<LettersContextValue | null>(null);

export function LettersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(lettersReducer, { letters: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadLettersAsync().then((letters) => {
      if (active) {
        dispatch({ type: "init", payload: { letters } });
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<LettersContextValue>(() => {
    return {
      letters: state.letters,
      isLoading,
      addLetter: async (form, content) => {
        const now = Date.now();
        const createdLetter: Letter = {
          id: createId(),
          ...form,
          content,
          createdAt: now,
          updatedAt: now,
        };

        dispatch({
          type: "add",
          payload: {
            letter: createdLetter,
          },
        });

        try {
          await saveLetterAsync(createdLetter);
        } catch (error) {
          console.error("Failed to save letter in IndexedDB:", error);
        }

        return createdLetter;
      },
      updateLetter: async (id, form, content) => {
        dispatch({
          type: "update",
          payload: { id, form, content },
        });

        const existing = state.letters.find((l) => l.id === id);
        if (existing) {
          const updatedLetter: Letter = {
            ...existing,
            ...form,
            content,
            updatedAt: Date.now(),
          };
          try {
            await saveLetterAsync(updatedLetter);
          } catch (error) {
            console.error("Failed to update letter in IndexedDB:", error);
          }
        }
      },
      deleteLetter: async (id) => {
        dispatch({
          type: "delete",
          payload: { id },
        });

        try {
          await deleteLetterAsync(id);
        } catch (error) {
          console.error("Failed to delete letter in IndexedDB:", error);
        }
      },
      getLetter: (id) => state.letters.find((letter) => letter.id === id),
    };
  }, [state.letters, isLoading]);

  return <LettersContext.Provider value={value}>{children}</LettersContext.Provider>;
}

export function useLetters() {
  const ctx = useContext(LettersContext);

  if (!ctx) {
    throw new Error("useLetters must be used within LettersProvider");
  }

  return ctx;
}
