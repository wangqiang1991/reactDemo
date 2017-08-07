/*jshint esversion:6*/
import React from "react";
import {ajax} from "tools";
import Header from "./Header";
import Footer from "./Footer";

export default class Index extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div>
    <Header></Header>
    {this.props.children}
    </div>
  }
}
