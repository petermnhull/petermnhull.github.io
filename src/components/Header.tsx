import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Language } from "./language";
import { Page } from "./pages";

const translations: Record<Language, Record<Page, string>> = {
  [Language.EN]: {
    [Page.HOME]: "Hi, I'm Peter",
    [Page.BLOG]: "Blog",
  },
  [Language.FR]: {
    [Page.HOME]: "Salut, je m'appelle Peter",
    [Page.BLOG]: "Le Blog",
  },
};

interface headerProps {
  page: Page;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export default function Header(p: headerProps) {
  const title = translations[p.language][p.page];
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
        <b>{title}</b>
      </div>
      <div className="alignright">
        <button onClick={() => p.setLanguage(Language.EN)}>En</button>
        <button onClick={() => p.setLanguage(Language.FR)}>Fr</button>
      </div>
    </div>
  );
}
