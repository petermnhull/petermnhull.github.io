import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Language } from "./language";

const titlesEN: Record<string, string> = {
  home: "Hi, I'm Peter 🌱",
  blog: "Blog",
};

const titlesFR: Record<string, string> = {
  home: "Salut, je m'appelle Peter 🌱",
  blog: "Le Blog",
};

interface headerProps {
  page: string;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

const getTitle = (language: Language, key: string): string => {
  switch (language) {
    case Language.EN:
      return titlesEN[key];
    case Language.FR:
      return titlesFR[key];
    default:
      return titlesEN[key];
  }
};

export default function Header(p: headerProps) {
  return (
    <div id="header">
      <div className="alignleft">
        <Link to="/">
          <button>🏠</button>
        </Link>
        <Link to="/blog">
          <button>✍️</button>
        </Link>
      </div>
      <div className="aligncenter">
        <b>{getTitle(p.language, p.page)}</b>
      </div>
      <div className="alignright">
        <button onClick={() => p.setLanguage(Language.EN)}>En</button>
        <button onClick={() => p.setLanguage(Language.FR)}>Fr</button>
      </div>
    </div>
  );
}
