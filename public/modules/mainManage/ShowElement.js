/*jshint esversion:6*/
import React from "react";
export default class ShowsElement extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <div>
      {this.props.children}
    </div>
  }
}
