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
      height:'90px',
      background:"#fff",
      position:'absolute',
      top:'0',
      left:'0',
      zIndex:'5',
      width:'100%'
    };
    this.logo={
        fontSize:'28px',
        fontWeight:"600",
        textAlign:"left",
        width:"100%",
        height:'90px',
        lineHeight:'90px',
        color:'green'
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
      marginRight:'15px',
      width:'auto',
      height:'90px',
      lineHeight:'90px'
    };
    this.logoImg={
      width:'auto',
      height:'50%',
      marginTop:'25%',
      cursor:'pointer' 
    }
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
  confirm () {
    this.logout();
  }
  getSession(){
    ajax({
      type:"get",
      url:"/user/getSession",
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
      url:"/user/logout",
      success:function(){
        hashHistory.push("/login");
      }.bind(this)
    });
  }
  render(){

     const text = '确定退出当前帐号?';
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
      <Col span={1}></Col>
      <Col span={20}>
        <p style={this.logo}>管理系统</p>
      </Col>
      <Col span={2}>
        <p style={this.logo}>
        <Popconfirm placement="bottom" title={text} onConfirm={this.confirm.bind(this)} okText="确定" cancelText="取消">
        <img style={this.logoImg} src="http://or67z7bdd.bkt.clouddn.com/flower1.jpg" />
        </Popconfirm>
        </p>
      </Col>
    </Row>
    </header>
  }
}
