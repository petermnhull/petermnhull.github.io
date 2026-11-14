import React from "react";
import { NavLink } from "react-router-dom";
import { Language, LanguageProps } from "./language";
import { Page } from "./pages";

const translations: Record<Language, Record<Page, string>> = {
  [Language.EN]: {
    [Page.HOME]: "Hi, I'm Peter",
    [Page.BLOG]: "Blog",
    [Page.NOT_FOUND]: "404",
  },
  [Language.FR]: {
    [Page.HOME]: "Salut, je m'appelle Peter",
    [Page.BLOG]: "Le Blog",
    [Page.NOT_FOUND]: "404",
  },
};

const siteName = "Peter Hull";

interface headerProps {
  page: Page;
  languageProps: LanguageProps;
  postTitle?: string;
}

export default function Header(p: headerProps) {
  const { language, setLanguage } = p.languageProps;
  const title = translations[language][p.page];

  React.useEffect(() => {
    document.title =
      p.page === Page.HOME ? siteName : `${p.postTitle ?? title} · ${siteName}`;
  }, [p.page, p.postTitle, title]);

  // On a post the post's own title is the main heading, otherwise this is.
  const Title = p.postTitle ? "p" : "h1";
  return (
    <header id="header">
      <nav className="header-left">
        <NavLink className="round-button" to="/" end aria-label="Home">
          🏠
        </NavLink>
        <NavLink className="round-button" to="/blog" aria-label="Blog">
          ✍️
        </NavLink>
      </nav>
      <Title className="header-title">{title}</Title>
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
