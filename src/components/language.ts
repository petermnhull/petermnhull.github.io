import { Dispatch, SetStateAction } from "react";

export enum Language {
  EN,
  FR,
}

export interface LanguageProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export const languageCodes: Record<Language, string> = {
  [Language.EN]: "en",
  [Language.FR]: "fr",
};

export const locales: Record<Language, string> = {
  [Language.EN]: "en-GB",
  [Language.FR]: "fr-FR",
};

const storageKey = "language";

// Use the visitor's saved choice if there is one, otherwise their browser language.
export const initialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === languageCodes[Language.FR]) {
      return Language.FR;
    }
    if (saved === languageCodes[Language.EN]) {
      return Language.EN;
    }
  } catch {
    // Storage can be unavailable, e.g. in private browsing.
  }
  return navigator.language.toLowerCase().startsWith("fr")
    ? Language.FR
    : Language.EN;
};

export const saveLanguage = (language: Language) => {
  try {
    localStorage.setItem(storageKey, languageCodes[language]);
  } catch {
    // Not worth failing over; the choice just won't be remembered.
  }
};
