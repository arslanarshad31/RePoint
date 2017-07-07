import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from './reducers'
import Dashboard from './components/Dashboard'
import Bankpage from './components/Bankpage'
import Shop from './components/Shop'
import Top from './components/Top'
import 'semantic-ui-css/semantic.min.css';
import TransitionGroup from "react-transition-group/TransitionGroup";

let initialState;
if (typeof(window) !== 'undefined') {
  initialState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(combineReducers({main: rootReducer}), initialState, applyMiddleware(thunk));
const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};
const App = () => (
    <Provider store = {store}>
      <Router>
        <div>
          <Route exact path="/"   children={() => (
                  <TransitionGroup component={Dashboard}></TransitionGroup>
              )} />
          <Route exact path="/shop"   children={() => (
                  <TransitionGroup component={Shop}></TransitionGroup>
              )} />
        </div>
      </Router>
    </Provider>

)

export default App;
