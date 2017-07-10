/*jshint esversion:6*/
import React from "react";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import ReactDOM from "react-dom";
import Index from "Index";
import store from "store";
import {Provider} from "react-redux";
import MainManage from "MainManage";
import ShowElement from "ShowElement";
import UserInfo from "../modules/userManage/UserInfo";
import HotManage from "../modules/hotManage/HotManage";
import Promotion from "../modules/promotion/Promotion";
import OrderManage from "OrderManage";
import GoodsManage from "../modules/goodsManage/GoodsManage";
import LoginForm from "../modules/login/LoginForm";
import ClassManage from "../modules/classManage/ClassManage";


ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
  <Route path="/login" component={LoginForm}></Route>
    <Route path="/" component={Index}>
        <IndexRoute component={LoginForm}></IndexRoute>
          <Route path="/MainManage" component={MainManage}>
          <IndexRoute component={UserInfo}></IndexRoute>
          <Route path="/MainManage/UserInfo" component={UserInfo}></Route>
          <Route path="/MainManage/OrderManage" component={OrderManage}></Route>
          <Route path="/MainManage/HotManage" component={HotManage}></Route>
          <Route path="/MainManage/Promotion" component={Promotion}></Route>
          <Route path="/MainManage/GoodsManage" component={GoodsManage}></Route>
          <Route path="/MainManage/ClassManage" component={ClassManage}></Route>
        </Route>
    </Route>
  </Router>
  </Provider>,
  document.getElementById("content"));
