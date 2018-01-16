import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CheckAddress from './Components/CheckAddress/CheckAddress';
import Transactions from './Components/Transactions/Transactions';
import Nav from './Components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" component={Nav} />
          <Route path="/" exact component={CheckAddress} />
          <Route path="/transactions" component={Transactions} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
