import './App.css';
import React from 'react';
import logo from './pear.svg';

class Home extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Under construction.
                </p>
                <p>
                Please come back later.
                </p>
                </header>
            </div>
        );
    }
}

export default Home;
