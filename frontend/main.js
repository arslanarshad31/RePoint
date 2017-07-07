import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';

import { Provider } from 'react-redux'

import App from './App.jsx';
import store from './mainstore'


ReactDOM.render(
    (<Provider store={store}>
    <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    </Provider>), 
    document.getElementById('app'));