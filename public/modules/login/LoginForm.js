import React from "react";
import {ajax} from "tools";
import LoginKuang from "./LoginKuang";
import { Radio,Checkbox } from 'antd';
import {hashHistory} from "react-router";
const RadioGroup = Radio.Group;
export default React.createClass({
  zhengti:{
    height:"520px"
  },
  divStyle:{
    width: "400px",
    height: "260px",
    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-150px",
    marginLeft: "-200px",
    background: "#fff",
    borderRadius: "10px",
    backgroundColor: "#f2f2f2",
    marginRight:"10px"
  },
  tmStyle:{
    borderRadius: "10px",
    opacity: "0.6",
    width: "440px",
    height: "280px",
    position: "absolute",
    top: "-5%",
    left: "-5%",
    right: "-5%",
    bottom: "-5%",
    zIndex: "-1",
    border: "2px solid #fff"
  },
  titleStyle:{
    height: "40px",
    background: "#57c5f7",
    lineHeight: "40px",
    borderRadius: "10px 10px 0px 0px"
  },
  tabStyle:{
    width: "400px",
    height: "180px"
  },
  spanStyle:{
    color: "#fff",
    fontSize: "18px",
    marginLeft: "40px",
    fontFamily: "Microsoft YaHei"
  },
  spStyle:{
      marginLeft: "-62px",
    color: "black",
    fontSize: "12px",
  },
  taStyle:{
    marginLeft: "20px"
  },
  userStyle:{
    display: "block",
    width: "14px",
    height: "15px",
    position: "absolute",
    top:"25px",
    left:"14px",
    background:"url('images/user.png')"
  },
  paStyle:{
    display: "block",
    width: "14px",
    height: "15px",
    position: "absolute",
    top:"25px",
    left:"14px",
    background:"url('images/pwd.png')"
  },
  btnStyle:{
    width: "355px",
    borderRadius: "6px",
    backgroundColor: "#57c5f7",
    border: 0,
    outline: "none",
    color: "white",
    paddingLeft:"0px",
    margin: "30px 50px 50px -350px",
    cursor: "pointer",
    height:"36px",
    lineHeight: "36px"
  },
  login:function(){
    ajax({
      type:"post",
      url:"/users/login",
      data:{
        username:this.refs.username.refs.input.value,
        pwd:this.refs.pwd.refs.input.value
      },
      success:(data)=>{
        if(data.status == 0){
          alert("用户名或密码错误");
        }else{
          hashHistory.push("/MainManage");
        }
      }
    });
  },

  getInitialState() {
      return {
        value: 1,
      };
    },
  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
     });
   },

  render:function(){
    return <div style={this.zhengti}>
    <div style={this.divStyle}>
    <div style={this.tmStyle}></div>
    <div style={this.titleStyle}>
        <span style={this.spanStyle}>登录系统</span>
    </div>
    <div style={this.tabStyle}>
      <table style={this.taStyle}>
      <tbody>
        <LoginKuang ref="username" type="text" style={this.userStyle} placeholder="用户名"></LoginKuang>
        <LoginKuang ref="pwd" type="password"  style={this.paStyle} placeholder="密码"></LoginKuang>
        <tr>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
           <Radio value={1}>管理员</Radio>
        </RadioGroup>
          <td>
          <Checkbox><span style={this.spStyle}>记住我</span></Checkbox>
          <input type="button" style={this.btnStyle} onClick={this.login} value="登录"  /></td>
        </tr>
      </tbody>
      </table>
    </div>
    </div>
   </div>
  }
});
