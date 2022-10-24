import { Link } from "react-router-dom";
import Header from "./Header";


const Home = () => {

  return (
    <div>
      <Header page="home"/>
      <img className="websiteImg" src="profile.jpg" width="150" height="auto" alt="headshot"></img>
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
          <img className="websiteImg" src="github.png" alt="github" width="50px"></img>
        </a>
        <a href="https://uk.linkedin.com/in/petermnhull">
          <img className="websiteImg" src="linkedin.png" alt="linkedin" width="50px"></img>
        </a>
      </div>
    </div>
  );
}

export default Home;
