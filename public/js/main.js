import React from "react";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import ReactDOM from "react-dom";
import store from "store";
import {Provider} from "react-redux";

 //import Module1 from '../modules/module1/module1';
 //import Module2 from '../modules/module2/module2';
import Login from '../modules/login/login';
import Index from '../modules/index/index';

ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
  	<Route path="/" component={Login}></Route>
  	<Route path="/index" component={Index}></Route>
  </Router>
  </Provider>,
  document.getElementById("app"));
