import { Link } from "react-router-dom";
import { Language, LanguageProps } from "./language";
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
  languageProps: LanguageProps;
}

export default function Header(p: headerProps) {
  const { language, setLanguage } = p.languageProps;
  const title = translations[language][p.page];
  return (
    <header id="header">
      <nav className="header-left">
        <Link className="round-button" to="/" aria-label="Home">
          🏠
        </Link>
        <Link className="round-button" to="/blog" aria-label="Blog">
          ✍️
        </Link>
      </nav>
      <div className="header-title">{title}</div>
      <div className="header-right">
        <button
          className="round-button"
          aria-pressed={language === Language.EN}
          onClick={() => setLanguage(Language.EN)}
        >
          En
        </button>
        <button
          className="round-button"
          aria-pressed={language === Language.FR}
          onClick={() => setLanguage(Language.FR)}
        >
          Fr
        </button>
      </div>
    </header>
  );
}
