/*jshint esversion:6*/
import React from "react";
export default class Footer extends React.Component{
  constructor(props){
    super(props);
    this.footer={
      width:"100%",
      height:'40px',
      lineHeight:'40px',
      textAlign:"center",
      backgroundColor:"#fff",
      color:"#333"
    };
  }

  render(){
    return <footer style={this.footer}>关于我们</footer>
  }
}
