import "./App.css"
import profilePhoto from "./photo.jpg"

const App = () => {
  return (
    <div>
      <h1>
        Hi, I'm Peter.
      </h1>
      <img src={profilePhoto} width="150" alt="headshot"></img>
      <p>
        I'm a backend and ML engineer, currently working at a start-up called ComplyAdvantage.
      </p>
      <p>
        This website is a work-in-progress, so come back later.
      </p>
    </div>
  );
}

export default App;
