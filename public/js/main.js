import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom'
//import {Route,Router,IndexRoute,hashHistory} from "react-router";
import {Provider} from "react-redux";
import store from "store";
import Index from 'index';


import Login from '../modules/Login/Login.js'




ReactDOM.render(
		<Provider store={store}>
	  		<BrowserRouter>
	  			<Route path="/" component={Login}>
	  				 <Route path="/login" component={Login}></Route>
	  			</Route>
	  		</BrowserRouter>
  		</Provider>, 
     document.getElementById('app')
);