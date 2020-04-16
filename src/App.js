import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PortFolio from './overview/PortFolio/container/PortFolioContainer'

import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Route path="/" component={PortFolio}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
