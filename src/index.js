import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import listReducer from './redux/reducers/performanceDataReducer'
import * as dictionaries from 'dictionary/dictionary'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

let rootreducer = combineReducers({ performanceData: listReducer });

let store = createStore(rootreducer);


//picks the local and loads in the window can be used across components
let defaultLocale = 'en';
window.dictionary = dictionaries[defaultLocale] ? dictionaries[defaultLocale] : dictionaries['en'];

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
