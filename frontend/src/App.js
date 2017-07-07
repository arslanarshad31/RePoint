import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from './reducers'
import Dashboard from './components/Dashboard'
import Bankpage from './components/Bankpage'
import Shop from './components/Shop'
import Top from './components/Top'
import 'semantic-ui-css/semantic.min.css';

let initialState;
if (typeof(window) !== 'undefined') {
  initialState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

const App = () => (
    <Provider store = {store}>
      <Router>
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/shop" component={Shop} />
        </div>
      </Router>
    </Provider>

)

export default App;
