import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PortFolio from './overview/PortFolio/container/PortFolioContainer'
import './App.css'
import * as dictionaries from 'dictionary/dictionary'

import ToggleMenu from 'common/header/header'

function App() {

  /*picks the local and loads in the window,in future 
      we can change the locale using a redux state if its multilingual*/
  let defaultLocale = 'en';
  window.dictionary = dictionaries[defaultLocale] ? dictionaries[defaultLocale] : dictionaries['en'];

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
