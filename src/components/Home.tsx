import React from "react";
import profilePhoto from "./assets/profile.jpg"
import githubPhoto from "./assets/github.png"
import linkedinPhoto from "./assets/linkedin.png"


enum Language {
  EN,
  FR,
}

const textEN: Record<string, string> = {
  "title": "Hi, I'm Peter.",
  "intro": "This website is a work-in-progress...",
}

const textFR: Record<string, string> = {
  "title": "Salut, je m'appelle Peter.",
  "intro": "Ce site est en cours d'élaboration...",
}

const getText = (language: Language, key: string) : string => {
  switch (language) {
    case Language.EN:
      return textEN[key];
    case Language.FR:
      return textFR[key];
    default:
      return textEN[key];
  }
}

const Home = () => {

  const [language, setLanguage] = React.useState(Language.EN)

  return (
    <div>
      <div>
        <button onClick={() => setLanguage(Language.EN)}>En</button>
        &nbsp;
        <button onClick={() => setLanguage(Language.FR)}>Fr</button>
      </div>
      <h1>
        {getText(language, "title")}
      </h1>
      <img src={profilePhoto} width="150" alt="headshot"></img>
      <div>
        <p>
          {getText(language, "intro")}
        </p>
      </div>
      <hr></hr>
      <div>
        <a href="https://github.com/petermnhull">
        <img src={githubPhoto} width="50" alt="github"></img>
        </a>
        <a href="https://uk.linkedin.com/in/petermnhull">
        <img src={linkedinPhoto} width="50" alt="linkedin"></img>
        </a>
      </div>
    </div>
  );
}

export default Home;
