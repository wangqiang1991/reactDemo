/*jshint esversion:6*/
import React from "react";
import Header from './Header'
export default class Content extends React.Component{
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
