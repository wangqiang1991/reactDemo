import React from "react";
import { Menu,Icon,Switch,Col,Row ,Card} from 'antd';
import ReactDOM from "react-dom";
import {hashHistory,Link} from "react-router";
import {ajax} from "tools";
import style from './index.css';

export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
          current:"1",
          username:null
        };
    }
    handleClick(e) {     
     this.setState({
        current: e.key,
      });
    }
  componentWillMount(){
    this.getSession();
  }

  getSession(){
    ajax({
      type:"get",
      url:"/users/getSession",
      success:(data)=>{
        if(!data[0].username){
          hashHistory.push("/login");
        }else {
          this.setState({
            username:data[0].username
          });
        }
      }
    });
  }
  logout(){
    ajax({
      type:"get",
      url:"/users/logout",
      success:function(){
        hashHistory.push("/login");
      }.bind(this)
    });
  }

    render(){
      const SubMenu = Menu.SubMenu;
      return <div style={this.style}>
      <Row type="flex" className={style.div4}>
        <Col span={18} className={style.div5}>鲜花管理系统</Col>
        <Col span={6} className={style.div6}>当前管理员<span>{this.state.username}</span>
        <a onClick={this.logout.bind(this)}>退出</a></Col>
      </Row>
      <Row type="flex" justify="left" style={{height:'auto'}}>
        <Col span={24}  className="cols">
          <Card bordered={true} className={style.div2}>
            <Row type="flex" justify="left" style={{height:'100%'}}>
              <Col span={4}>
              <Menu
                onClick={this.handleClick.bind(this)} className={style.div3}
                selectedKeys={[this.state.current]} mode="inline"
              >

                <Menu.Item key="1"><a href="#index/home"><Icon type="home"/>首页</a></Menu.Item>             
                <SubMenu key="sub1" title={<span><Icon type="user"/><span>用户管理</span></span>}>
                  <Menu.Item key="2"><a href="#user/userlist">管理员</a></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="api" /><span>花汇管理</span></span>}>
                  <Menu.Item key="3"><a href="#flower/addflower">增加花汇</a></Menu.Item>
                  <Menu.Item key="4"><a href="#flower/showflower">花汇列表</a></Menu.Item>
                </SubMenu>

              </Menu>
              </Col>
              <Col span={20} style={{backgroundColor:"#fff"}}>
                {this.props.children}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
    }
}