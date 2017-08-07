/*jshint esversion:6*/
import React from "react";
import {ajax} from "tools";
import AddUser from "./AddUser";
import UserUpdate from "./UserUpdate";
import UserSearch from "./UserSearch";

import {Table,Button,Modal,Row,Col,Card,Form,Input,Radio,Pagination} from "antd";


export default class UserInfo extends React.Component{
  constructor(props){
    super(props);
    this.fromStyle={
      width:"100%"
    }
    this.updatestyle={
      display:"inline-block"
    }
    this.state = {
      data:[]
    }
  }

  getdata(a){
    this.setState({
      data:a
    })
  }

  showAll(){
    var newAry = [];
    ajax({
      type:"get",
      url:"/users/showAll",
      data:{},
      success:function(data){
        this.setState({
          data:data
        })
      }.bind(this)
    })
  }

  del(text){
    console.log(text);
    ajax({
      type:"post",
      url:"/users/del",
      data:{id:text._id},
      success:function(){
        this.showAll();
      }.bind(this)
    })
  }



  showById(text){
    console.log(12345623);
    ajax({
      type:"get",
      url:"/users/showById",
      data:{id:text._id},
      success:function(){
        this.showAll();
      }.binde(this)
    })
  }

  componentWillMount(){
    this.showAll();
  }

  render(){

    const pagination = {

      pageSize:3,
      onChange: (curpage) => {
      }
    };




    const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
      },
      {
        title: '账号',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '联系号码',
        dataIndex: 'contact',
        key: 'contact',
      }, {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) =>(
          <span>
        <Row>
        <UserUpdate text={text}  className="modify" showAll={this.showAll.bind(this)}></UserUpdate>
        <Button onClick={function(){this.del(text)}.bind(this)}>删除</Button>
        </Row>
        </span>
        )
      }];




    return <div>
          <Row>
             <Col span={12}><h1>用户管理</h1></Col>
              </Row>
                <div style={{margin:"20px"}}></div>
                <Row>
                <Col span={6}><AddUser showAll={this.showAll.bind(this)}></AddUser></Col>
                <Col span={6}></Col>
                <Col span={4}><UserSearch showAll={this.showAll.bind(this)} getdata={this.getdata.bind(this)}></UserSearch></Col>
                <Col span={2}><Button onClick={function(){this.showAll()}.bind(this)}>所有用户</Button></Col>
                </Row>
                <div></div>
              <Table dataSource={this.state.data} columns={columns} style={this.fromStyle} pagination ={pagination} showAll={this.showAll.bind(this)}>
              </Table>
            </div>
  }
}
