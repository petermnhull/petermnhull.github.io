import { Link } from "react-router-dom";
import Header from "./Header";
import { Language, LanguageProps } from "./language";
import { Page } from "./pages";

interface translation {
  text1: string;
  bold1: string;
  text2: string;
  link1: string;
  text3: string;
  bold2: string;
  text4: string;
  bold3: string;
  text5: string;
  link2: string;
  text6: string;
  bold4: string;
  text7: string;
  link3: string;
}

const translations: Record<Language, translation> = {
  [Language.EN]: {
    text1: "I'm a",
    bold1: "Lead Software Engineer",
    text2: "who loves music, table tennis, and animals. I also occasionally",
    link1: "write",
    text3: "I specialise in",
    bold2: "backend",
    text4: "and",
    bold3: "machine learning",
    text5: "systems, and I currently work on things like this at",
    link2: "Arenko",
    text6: "I studied",
    bold4: "mathematics",
    text7: "at Imperial College where I spent a lot of time researching",
    link3: "mathematical sperm cells",
  },
  [Language.FR]: {
    text1: "Je suis un",
    bold1: "Lead Développeur",
    text2:
      "qui aime la musique, le tennis de table, et les animaux. De temps en temps, je tiens un",
    link1: "blog",
    text3: "Je me spécialise dans les",
    bold2: "systèmes back-end",
    text4: "et",
    bold3: "l'apprentissage automatique",
    text5: "tout en travaillant actuellement avec ces technologies chez",
    link2: "Arenko",
    text6: "J'ai étudié les",
    bold4: "mathématiques",
    text7:
      "à Imperial College, où j’ai travaillé sur des modèles mathématiques des",
    link3: "cellules spermatiques",
  },
};

export default function Home(l: LanguageProps) {
  const t = translations[l.language];
  return (
    <div>
      <Header page={Page.HOME} languageProps={l} />
      <img
        className="websiteImg"
        src="profile.jpg"
        width="150"
        height="auto"
        alt="headshot"
      ></img>
      <div>
        <p>
          {t.text1} <b>{t.bold1}</b> {t.text2} <Link to="/blog">{t.link1}</Link>
          .
        </p>
        <p>
          {t.text3} <b>{t.bold2}</b> {t.text4} <b>{t.bold3}</b> {t.text5}{" "}
          <a href="https://arenko.group/">{t.link2}</a>.
        </p>
        <p>
          {t.text6} <b>{t.bold4}</b> {t.text7}{" "}
          <a href="https://github.com/petermnhull/MastersProject">{t.link3}</a>.
        </p>
      </div>
      <div id="footer">
        <a href="https://github.com/petermnhull">
          <img
            className="websiteImg"
            src="github.png"
            alt="github"
            width="50px"
          ></img>
        </a>
        <a href="https://uk.linkedin.com/in/petermnhull">
          <img
            className="websiteImg"
            src="linkedin.png"
            alt="linkedin"
            width="50px"
          ></img>
        </a>
      </div>
    </div>
  );
}
