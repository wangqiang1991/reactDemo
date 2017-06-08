/*jshint esversion:6*/
import React from "react";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import {Provider} from "react-redux";
import { Menu,Icon,Switch,Col,Row ,Card} from 'antd';
import ReactDOM from "react-dom";
import store from "store";

export default class MainManage extends React.Component{
    constructor(props){
        super(props);
        this.state={
          current:"1"
        };
        this.style={
          width:"100%",
          height:"100%",
          position:'absolute',
          top:'0',
          left:'0'
        };
    }
    handleClick(e) {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    }
    componentDidMount () {
      this.createCanvas();
    }
    createCanvas () {
      var victor = new Victor("container", "output");
      var theme = [
          ["#002c4a", "#005584"],
          ["#35ac03", "#3f4303"],
          ["#ac0908", "#cd5726"],
          ["#18bbff", "#00486b"]
        ]
      $(".color li").each(function(index, val) {
        var color = theme[index];
         $(this).mouseover(function(){
          victor(color).set();
         })
      });
    }
    render(){
      const SubMenu = Menu.SubMenu;
      return <div style={this.style}>
      <div id="container">
        <div id="output"></div>
      </div>
      <ul className="color">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Row type="flex" justify="left" style={{height:'auto',marginTop:'100px'}}>
        <Col span={22} offset={1} className="cols">
        <Card bordered={true} style={{height:'700px',marginTop:'20px',background:'#fff'}}>
      <Row type="flex" justify="left" style={{height:'100%'}}>
        <Col span={4}>
        <Menu
          onClick={this.handleClick.bind(this)}
          style={{width:'100%',height:"100%",borderRight:"1px solid #fff",float:"left" }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" title={<span><Icon type="mail"/><span>用户管理</span></span>}>
            <Menu.Item key="1"><a href="#index/user">用户信息</a></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>商品管理</span></span>}>
            <Menu.Item key="5"><a href="#MainManage/GoodsManage">商品管理</a></Menu.Item>
            <Menu.Item key="6"><a href="#MainManage/ClassManage">类别管理</a></Menu.Item>
            <Menu.Item key="7"><a href="#MainManage/HotManage">热门管理</a></Menu.Item>
            <Menu.Item key="8"><a href="#MainManage/Promotion">促销管理</a></Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>订单管理</span></span>}>
            <Menu.Item key="9"><a href="#MainManage/OrderManage">订单管理</a></Menu.Item>
          </SubMenu>
        </Menu>
        </Col>
        <Col span={18} offset={1} style={{backgroundColor:"#fff"}}>
          {this.props.children}
        </Col>
        </Row>
          </Card>
        </Col>
        </Row>
      </div>
    }
}
