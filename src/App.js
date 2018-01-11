import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  componentDidMount() {
    axios.get('https://g-blockchain-info-api.herokuapp.com/rawaddr/1AaT3EeMUPjQyw5orzi929SHfXQCehYZGp')
      .then((res) => {
        console.log(res);
      })
  }

  render() {
    return (
      <div className="App">
        <h1>It's alive!</h1>
      </div>
    );
  }
}

export default App;
