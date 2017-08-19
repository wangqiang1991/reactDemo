import React from "react";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import ReactDOM from "react-dom";
import store from "store";
import {Provider} from "react-redux";

import Module1 from '../modules/module1/module1';
import Module2 from '../modules/module2/module2';

ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
  	<Route path="/index1" component={Module1}></Route>
  	<Route path="/index2" component={Module2}></Route>
  </Router>
  </Provider>,
  document.getElementById("app"));
