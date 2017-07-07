import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from './reducers'

let initialState;
if (typeof(window) !== 'undefined') {
  initialState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

const App = () => (
  <Provider store = {store}>
    <h1>Hello World</h1>
  </Provider>
)

export default App;
