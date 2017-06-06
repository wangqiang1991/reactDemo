/*jshint esversion:6*/
import React from "react";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import ReactDOM from "react-dom";
import Content from '../modules/commen/Content'
import Index from "Index";
import Login from 'Login';
import store from "store";
import User from '../modules/index/User'
import {Provider} from "react-redux";


ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/login" component={Login}></Route>
      <Route path="/" component={Content}>
  	      <IndexRoute component={Login}></IndexRoute>
    	    <Route path="/index" component={Index}>
             <IndexRoute component={User}></IndexRoute>
             <Route path="/index/user" component={User}></Route>
          </Route>
      </Route>
  </Router>
  </Provider>,
  document.getElementById("content"));
