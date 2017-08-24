import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ScoreCard from './ScoreCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ScoreCard />
      </div>
    );
  }
}

export default App;
