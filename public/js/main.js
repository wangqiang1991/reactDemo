import React from "react";
import ReactDOM from "react-dom";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import {Provider} from "react-redux";
import store from "store";
import Index from 'index';
import Login from '../modules/Login/Login.js'




ReactDOM.render(
		<Login />,
     document.getElementById('app')
);