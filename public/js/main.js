/*jshint esversion:6*/
import React from "react";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import ReactDOM from "react-dom";
import Index from "Index";
import store from "store";
import {Provider} from "react-redux";


ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Index}>
    </Route>
  </Router>
  </Provider>,
  document.getElementById("content"));
