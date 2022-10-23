import { Link, Outlet } from "react-router-dom";
import React from "react";

enum Language {
  EN,
  FR,
}

const titlesEN: Record<string, string> = {
  "home": "Hi, I'm Peter.",
  "blog": "Blogs",
}

const titlesFR: Record<string, string> = {
  "home": "Salut, je m'appelle Peter.",
  "blog": "Le Blogs",
}

interface headerProps{
	page: string
}

const getTitle = (language: Language, key: string) : string => {
  switch (language) {
    case Language.EN:
      return titlesEN[key];
    case Language.FR:
      return titlesFR[key];
    default:
      return titlesEN[key];
  }
}

const Header = (p: headerProps) => {
  const [language, setLanguage] = React.useState(Language.EN)
  return (
      <div id="header">
        <div className="alignleft">
          <Link to="/">
            <button>
              🏠 
            </button>
          </Link>
          <Link to="/blog">
            <button>
              ✍️
            </button>
          </Link>
        </div>
        <div className="aligncenter">
          <b>{getTitle(language, p.page)}</b>
        </div>
        <div className="alignright">
          <button onClick={() => setLanguage(Language.EN)}>En</button>
          <button onClick={() => setLanguage(Language.FR)}>Fr</button>
        </div>
      </div>
  );
}

export default Header;
