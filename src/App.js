import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PortFolio from './overview/PortFolio/container/PortFolioContainer'
import ToggleMenu from './header'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="App-Container">
        <ToggleMenu />
      </div>
      <BrowserRouter>
        <Route path="/" component={PortFolio}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
