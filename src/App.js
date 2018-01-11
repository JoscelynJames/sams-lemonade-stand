import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckAddress from './Components/CheckAddress/CheckAddress';
import Transactions from './Components/Transactions/Transactions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={CheckAddress} />
        <Route path="/transactions" component={Transactions} />
      </div>
    )
  }
}

export default App;
