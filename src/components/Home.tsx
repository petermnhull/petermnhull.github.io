import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Language, LanguageProps } from "./language";
import { Page } from "./pages";

const blogLink = "/blog";

const workLink = "https://arenko.group/";

const mastersProjectLink = "https://github.com/petermnhull/MastersProject";

const translations: Record<Language, ReactElement> = {
  [Language.EN]: (
    <div>
      <p>
        I'm a <b>Lead Software Engineer</b> who loves music, table tennis, and
        animals. I also occasionally <Link to={blogLink}>write</Link>.
      </p>
      <p>
        I specialise in <b>backend</b> and <b> machine learning</b> systems, and
        currently I work on things like this at <a href={workLink}>Arenko</a>.
      </p>
      <p>
        I studied <b>mathematics</b> at Imperial College where I spent a lot of
        time researching{" "}
        <a href={mastersProjectLink}>mathematical sperm cells</a>.
      </p>
    </div>
  ),
  [Language.FR]: (
    <div>
      <p>
        Je suis <b>Lead Développeur</b>, j'aime la musique, le tennis de table,
        et les animaux. De temps en temps, je tiens un{" "}
        <Link to={blogLink}>blog</Link>.
      </p>
      <p>
        Je me spécialise dans les <b>systèmes back-end</b> et{" "}
        <b>l'apprentissage automatique</b> tout en travaillant actuellement avec
        ces technologies chez <a href={workLink}>Arenko</a>.
      </p>
      <p>
        J'ai étudié les <b>mathématiques</b> à Imperial College, où j’ai
        travaillé sur des{" "}
        <a href={mastersProjectLink}>
          modèles mathématiques des spermatozoïdes
        </a>
        .
      </p>
    </div>
  ),
};

const footer = (
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
);

export default function Home(l: LanguageProps) {
  const content = translations[l.language];
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
      {content}
      {footer}
    </div>
  );
}
