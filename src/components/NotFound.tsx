import { Link } from "react-router-dom";
import { Language } from "./language";

const translations: Record<Language, { message: string; back: string }> = {
  [Language.EN]: { message: "Nothing here soz.", back: "Go back." },
  [Language.FR]: { message: "Rien à voir ici, désolé.", back: "Retour." },
};

interface notFoundProps {
  language: Language;
}

export default function NotFound(p: notFoundProps) {
  const text = translations[p.language];
  return (
    <div id="not-found">
      <h1>404</h1>
      <p>{text.message}</p>
      <p>
        <Link to="/">{text.back}</Link>
      </p>
    </div>
  );
}
