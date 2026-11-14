import { Link } from "react-router-dom";
import Header from "./Header";
import { Language, LanguageProps } from "./language";
import { Page } from "./pages";

const translations: Record<Language, { message: string; back: string }> = {
  [Language.EN]: { message: "Nothing here soz.", back: "Go back." },
  [Language.FR]: { message: "Rien à voir ici, désolé.", back: "Retour." },
};

export default function NotFound(l: LanguageProps) {
  const text = translations[l.language];
  return (
    <div>
      <Header page={Page.NOT_FOUND} languageProps={l} />
      <div id="not-found">
        <p>{text.message}</p>
        <p>
          <Link to="/">{text.back}</Link>
        </p>
      </div>
    </div>
  );
}
