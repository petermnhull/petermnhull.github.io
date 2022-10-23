import React from "react";
import profilePhoto from "./assets/profile.jpg"
import githubPhoto from "./assets/github.png"
import linkedinPhoto from "./assets/linkedin.png"
import { Link } from "react-router-dom";
import Header from "./Header";


enum Language {
  EN,
  FR,
}

const textEN: Record<string, string> = {
  "title": "Hi, I'm Peter.",
}

const textFR: Record<string, string> = {
  "title": "Salut, je m'appelle Peter.",
}


const Home = () => {

  return (
    <div>
      <Header page="home"/>
      <img src={profilePhoto} width="150" alt="headshot"></img>
      <div>
        <p>
          I'm a <b>Software Engineer</b> who loves <i>music</i>, <i>science</i>, and <i>sustainability</i>. I also occasionally <Link to="/blog">write</Link>.
        </p>
        <p>
          I specialise in <b>backend</b> and <b>machine learning</b> systems, and I currently work on things like this at <a href="https://complyadvantage.com/">ComplyAdvantage</a>.
        </p>
        <p>
          I studied <b>mathematics</b> at Imperial where I spent a lot of time researching <a href="https://github.com/petermnhull/MastersProject">mathematical sperm cells</a>.
        </p>
      </div>
      <div id="footer">
        <a href="https://github.com/petermnhull">
          <img src={githubPhoto} alt="github" width="50px"></img>
        </a>
        <a href="https://uk.linkedin.com/in/petermnhull">
          <img src={linkedinPhoto} alt="linkedin" width="50px"></img>
        </a>
      </div>
    </div>
  );
}

export default Home;
