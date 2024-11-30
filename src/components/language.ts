import { Dispatch, SetStateAction } from "react";

export enum Language {
  EN,
  FR,
}

export interface LanguageProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}
