/*jshint esversion:6*/
import React from "react";
import {ajax} from "tools";
import {hashHistory,Link} from "react-router";
import {Tabs,Button,Col,Row,Menu,Icon,Popconfirm} from "antd";
export default class Header extends React.Component{
  constructor(props){
    super(props);
    this.header={
      lineHeight:"30px",
      fontFamily:"Microsoft Yahei",
      borderBottom:"1px solid #fff",
      background:"white"
    };
    this.logo={
        fontSize:'28px',
        fontWeight:"600",
        textAlign:"center",
        display:"block",
        width:"240px",
        float:"left",
        margin:"10px 0 0 40px"
    };
    this.logoName={
      fontSize:"20px",
      display:"inline-block",
      width:"240px",
      textAlign:"center",
      margin:"0 0 20px 40px"
    };
    this.Row={
      color:"black"
    };
    this.loginIn={
      float:"right",
      margin:"-31px 10px 0 0",
      padding:"0 8px 0 8px",
      border:"1px solid #2db7f5"
    };

    this.state = {
      user:{}
    };
  };

  componentWillMount(){
    if(window.location.hash == "#/"){
      this.logout();
      hashHistory.push("/login");
    } else {
      this.getSession();
    }
  }

  getSession(){
    ajax({
      type:"get",
      url:"/react/getSession",
      success:(data)=>{
      // console.log(data);
        if(!data[0].username){
          hashHistory.push("/login");
        }else {
          this.setState({
            user:data[0]
          });
        }
      }
    });
  }
  confirm() {
   console.log('Click on Yes.');
   this.logout();
  }
  logout(){
    ajax({
      type:"get",
      url:"/react/logout",
      success:function(){
        hashHistory.push("/login");
      }.bind(this)
    });
  }
  render(){
    const text = 'Are you sure delete this task?';
    var tag;
    if(this.state.user.username){
      tag = <span>欢迎你,{this.state.user.username}
      <Popconfirm placement="bottom" title={text} onConfirm={this.confirm.bind(this)} okText="Yes" cancelText="No">
      <a >注销</a>
       </Popconfirm>
      </span>
    }else{
      tag =<Link to="/login">登录</Link>;
    }

    return <header style={this.header}>
    <Row type="flex" style={this.Row}>
      <Col span={8}>
        <span style={this.logo}>管理系统</span>
        <span style={this.logoName}>management system</span>
      </Col>

    </Row>
    <div style={this.loginIn} ref="login">{tag}</div>
    </header>
  }
}
