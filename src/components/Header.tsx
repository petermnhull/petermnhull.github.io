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
  const title = translations[p.languageProps.language][p.page];
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
        <button onClick={() => p.languageProps.setLanguage(Language.EN)}>
          En
        </button>
        <button onClick={() => p.languageProps.setLanguage(Language.FR)}>
          Fr
        </button>
      </div>
    </div>
  );
}
