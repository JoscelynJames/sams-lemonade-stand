import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckAddress from './Components/CheckAddress/CheckAddress';
import Transactions from './Components/Transactions/Transactions';
import Nav from './Components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav} />
        <Route path="/" exact component={CheckAddress} />
        <Route path="/transactions/:addr" component={Transactions} />
      </div>
    )
  }
}

export default App;
