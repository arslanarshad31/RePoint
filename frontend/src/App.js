import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from './reducers'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Promotions from './components/Promotions'
import Portfolio from './components/Portfolio'
import Shop from './components/Shop'
import 'semantic-ui-css/semantic.min.css';

let initialState;
if (typeof(window) !== 'undefined') {
  initialState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(combineReducers({main: rootReducer}), initialState, applyMiddleware(thunk));

const App = () => (
    <Provider store = {store}>
      <Router>
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/promotions" component={Promotions} />
          <Route exact path="/portfolio" component={Portfolio} />
        </div>
      </Router>
    </Provider>

)

export default App;
