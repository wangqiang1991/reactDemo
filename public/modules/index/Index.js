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
          height:585
        };
    }
    handleClick(e) {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    }
    render(){
      const SubMenu = Menu.SubMenu;
      return <div style={this.style}>
      <Row type="flex" justify="left" style={{height:'560px'}}>
        <Col span={22} offset={1} className="cols">
        <Card bordered={true} style={{height:560,marginTop:'20px',background:'#fff'}}>
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
