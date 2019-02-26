import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <header className="app-header">
                <h4 className="header-text">Sequence Alignment</h4>
            </header>
            <footer className="app-footer">
              <div>Michael Gargano</div>
              <div className="middle">Directed Study</div>
              <div className="right">Jared Auclair</div>
            </footer>
        </React.Fragment>
    );
  }
}

export default App;
