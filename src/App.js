import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PortFolio from './overview/PortFolio/container/PortFolioContainer'

import './App.css'
import Logo from './assets/companylogo.png'

function App() {
  let {dictionary} = window;
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} alt="logo" width="10%" height="100%" />
        <div className="nav_items">
          <p className="nav_item">{dictionary['Home']}</p>
          <p className="nav_item">{dictionary['Manage_Deposits']}</p>
          <p className="nav_item">{dictionary['Refer_friend']}</p>
          <p className="nav_item">{dictionary['Support']}</p>
        </div>
      </header>
      <div>
        &larr; {dictionary['overview']}
      </div>
      <h3>{dictionary['General_Investing']}</h3>
      <BrowserRouter>
        <Route path="/" component={PortFolio}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
