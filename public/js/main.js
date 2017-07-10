import React from "react";
import ReactDOM from "react-dom";
import {Route ,hashHistory, HashRouter, Link } from 'react-router-dom'
//import {Route,Router,IndexRoute,hashHistory} from "react-router";
import {Provider} from "react-redux";
import store from "store";
import url from 'url';

import Login from '../modules/Login/Login.js'
import MainManage from '../modules/Content/MainManage'


class Main extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
  	window.location.href=url+'/login';
  }

  render(){
    return <div>
   	  {this.props.children}
    </div>
  }
};



ReactDOM.render(
		<Provider store={store}>
			<HashRouter history={hashHistory}>
				<Main>
		  			<Route path="/login" component={Login}></Route>
		  			<Route path="/MainManage" component={MainManage}></Route>
		  		</Main>		
		  	</HashRouter>	
  		</Provider>, 
     document.getElementById('app')
);