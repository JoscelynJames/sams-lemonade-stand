import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CheckAddress from './Components/CheckAddress/CheckAddress';
import Transactions from './Components/Transactions/Transactions';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={CheckAddress} />
          <Route path="/transactions/:address" component={Transactions} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
