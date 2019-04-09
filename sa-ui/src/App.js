import React, { Component } from 'react';
import Search from './searchbox/search'
import './App.css';

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <header className="app-header">
                <h4 className="header-text">Directed Study</h4>
            </header>
            <main>
                <div className="introduction">
                    <h2 className="title">Hirschberg's algorithm</h2>
                    <p>Compare two sequences by entering them below and hitting compare!</p>
                </div>
                <Search/>
            </main>
            <footer className="app-footer">
              <div className="left">Michael Gargano</div>
              <div className="right">Jared Auclair</div>
            </footer>
        </React.Fragment>
    );
  }
}

export default App;
