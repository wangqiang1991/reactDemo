import React from "react";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import ReactDOM from "react-dom";
import store from "store";
import {Provider} from "react-redux";

 //import Module1 from '../modules/module1/module1';
 //import Module2 from '../modules/module2/module2';
import Login from '../modules/login/login';
import Index from '../modules/index/index';
import Home from '../modules/home/home';
import User from '../modules/user/user';
import Flower from '../modules/flower/flower';
import FlowerList from '../modules/flower/showflower';
ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
  	<Route path="/" component={Login}></Route>
  	<Route path="/login" component={Login}></Route>
  	<Route path="/index" component={Index}>
  		<IndexRoute component={Home}></IndexRoute>
  		<Route path="/index/home" component={Home}></Route>
		  <Route path="/user/userlist" component={User}></Route>
  		<Route path="/flower/addflower" component={Flower}></Route>
      <Route path="/flower/showflower" component={FlowerList}></Route>
  	</Route>
  </Router>
  </Provider>,
  document.getElementById("app"));
