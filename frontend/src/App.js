import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";
import rootReducer from "./reducers";
import Container from './components/Container';
import promiseMiddleware from 'redux-promise';
import "semantic-ui-css/semantic.min.css";

let initialState;
if (typeof window !== "undefined") {
  initialState =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(promiseMiddleware)
);

const App = () =>
  <div>
    <Provider store={store}>
      <Container/>
    </Provider>
  </div>;

export default App;
