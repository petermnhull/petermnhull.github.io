import './App.css';
import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import About from './About';
import Home from './Home';
import Contact from './Contact';

class App extends React.Component {
  render() {
      return (
        <div className="App">
          <div>
            <nav>
                <Link to="/">Home</Link>&nbsp;
                <Link to="/about">About</Link>&nbsp;
                <Link to="/contact">Contact</Link>
            </nav>
          </div>
            <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
          </Switch>
          </div>
      );
  }
}

export default App;
