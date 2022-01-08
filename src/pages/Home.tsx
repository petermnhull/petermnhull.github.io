import "./Home.css"
import profilePhoto from "../assets/profile.jpg"
import githubPhoto from "../assets/github.png"
import linkedinPhoto from "../assets/linkedin.png"

const Home = () => {
  return (
    <div>
      <h1>
        Hi, I'm Peter.
      </h1>
      <img src={profilePhoto} width="150" alt="headshot"></img>
      <div>
        <p>
          This website is a work-in-progress, so come back later.
        </p>
      </div>
      <div>
        <a href="https://github.com/petermnhull">
        <img src={githubPhoto} width="40" alt="github"></img>
        </a>
        <a href="https://linkedin.com/petermnhull">
        <img src={linkedinPhoto} width="40" alt="linkedin"></img>
        </a>
      </div>
    </div>
  );
}

export default Home;
