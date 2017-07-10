/*jshint esversion:6*/
import React from "react";
import {ajax} from "tools";
import { Form, Icon, Modal,Input, Button, Checkbox,Row, Col, Card,Menu,Radio,Table} from 'antd';
const FormItem =Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



export default Form.create()(React.createClass({
  getInitialState:function(){
      return {
            data:[],
            visible: false,
            visible1: false,
            id:null,
            name:"",
            user:"",
            time:"",
            price:"",
            statu:'',
            size:"",
            singleprice:"",
            number:""
      };
  },
showAll:function () {
  ajax({
        type:"get",
        url:"/order/showall",
        success:function (data) {
          console.log(data);
          var date=[];
          for (var i = 0; i < data.length; i++) {
                if(data[i].userManage.username){
                  var obj={};
                  obj.name=data[i].name;
                  obj.user=data[i].userManage.username;
                  obj.time=data[i].time;
                  obj.price=data[i].price;
                  if(data[i].statu=="true"){
                    obj.statu=<p style={{color:"green"}}>已付款</p>;
                  }else if(data[i].statu=="false"){
                    obj.statu=<p style={{color:"red"}}>未付款</p>;
                  }
                  obj.size=data[i].size;
                  obj.singleprice=data[i].singleprice;
                  obj.number=data[i].number;
                  obj.key=data[i]._id;
                  obj.img=data[i].img;
                  obj.contact=data[i].userManage.contact;
                  obj.address=data[i].userManage.address;
                  date.push(obj);
                }
          }
          date.reverse();
          this.setState({
            data: date
            });
          }.bind(this),
        })
},
componentWillMount:function () {
  this.showAll();
},
  Updata:function(record){

    var obj={
      payState:record.statu._shadowChildren
    }
    this.props.form.setFieldsValue(obj);
    this.setState({
      visible: true,
      id:record.key
      });
    },
    handleOk() {
      const form = this.props.form;
    var statu=null;
    if(form.getFieldValue('payState')==="已付款"){
      statu=true;
    }else{
      statu=false;
    }
    ajax({
      type:"post",
      url:"/order/update",
      data:{
        id:this.state.id,
        statu:statu
      },
      success:function () {
        this.showAll()
      }.bind(this)
    })
    this.setState({
      visible: false,
    });
    },
    handleCancel() {
    this.setState({
      visible: false,
    });
    },
    Detail:function(record){

      this.setState({
        visible1: true,
        name:record.name,
        user:record.user,
        time:record.time,
        price:record.price,
        statu:record.statu._shadowChildren,
        size:record.size,
        singleprice:record.singleprice,
        number:record.number
        });
      },
      handleOk1() {
        const form = this.props.form;
      this.setState({
        visible1: false,
      });
      },
      handleCancel1() {
      this.setState({
        visible1: false,
      });
      },
      Del:function (record) {

        ajax({
          type:"post",
          url:"/order/del",
          data:{
            id:record.key
          },
          success:function () {
            this.showAll()
          }.bind(this)
        })
      },
      test:function(){
        ajax({
          type:"post",
          url:"/order/add",
          data:{
             id:"583e405644ec693e2d59ff35",   //关联用户的Id
             name:"abc",                      // 商品名
             price:"￥998",                    //商品总价  要自己计算根据单价和数量
             size:"红色 140L",                  // 商品规格  所有规格按字符串拼接传输到二级路由
             singleprice:"￥70",                 //商品单价
             number:2,                          //商品数量
             img:"images/goods_photo1.jpg"        //商品图片路径
          },
          success:function(){
            this.showAll()
          }.bind(this)
        })
      },
      test1:function(){
        ajax({
          type:"post",
          url:"/order/phoneUpdate",
          data:{
             id:"5840cd5691c5cc14d0c9ac3e",   //商品的Id
             price:"￥350",                    //修改商品总价  要自己计算根据单价和数量
             size:"白色 180L",      //修改商品规格  如果没有修改就用原来规格 所有修改规格按字符串拼接传输到二级路由
             number:5,                          //修改商品数量  如果没有修改就用原数量
          },
          success:function(){
            this.showAll()
          }.bind(this)
        })
      },
      test2:function(){
        ajax({
          type:"post",
          url:"/order/phoneShowall",
          data:{
             id:"583e405644ec693e2d59ff35",   //用户的Id
          },
          success:function(data){
            console.log(data);
          }
        })
      },
      test3:function(){
        ajax({
          type:"post",
          url:"/order/pay",
          data:{
             id:"5840cd5691c5cc14d0c9ac3e",   //商品的Id
          },
          success:function(){
            this.showAll()
          }.bind(this)
        })
      },
      f5:function(){
        this.showAll()
      },
      Search:function(){
        const form = this.props.form;
        ajax({
          type:"post",
          url:"/order/search",
          data:{
            name:form.getFieldValue('search')
          },
          success:function(data){
            var date=[];
            for (var i = 0; i < data.length; i++) {
                  var obj={};
                  obj.name=data[i].name;
                  obj.user=data[i].userManage.username;
                  obj.time=data[i].time;
                  obj.price=data[i].price;
                  if(data[i].statu=="true"){
                    obj.statu=<p style={{color:"green"}}>已付款</p>;
                  }else if(data[i].statu=="false"){
                    obj.statu=<p style={{color:"red"}}>未付款</p>;
                  }
                  obj.size=data[i].size;
                  obj.singleprice=data[i].singleprice;
                  obj.number=data[i].number;
                  obj.key=data[i]._id;
                  obj.img=data[i].img;
                  obj.contact=data[i].userManage.contact;
                  obj.address=data[i].userManage.address;
                  date.push(obj);
            }
            date.reverse();
            this.setState({
              data: date
              });
            }.bind(this),
        })
      },
  render:function () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const pagination ={
      pageSize:3,
    };
    const columns = [
      {
        title: '商品名',
        dataIndex: 'name',
        key: 'name'
      },
      {
  title: '用户账号',
  dataIndex: 'user',
  key: 'user'
},
{
  title: '下单时间',
  dataIndex: 'time',
  key: 'time'
},
{
  title: '金额',
  dataIndex: 'price',
  key: 'price'
},
{
  title: '订单状态',
  dataIndex: 'statu',
  key: 'statu'
},

{ title: '操作',
  dataIndex: 'operate',
  key: 'operate',
  render: (text,record,index) =>{  return(<div>
    <Button type="primary" onClick={()=>{this.Detail(record)}}>详情订单</Button>
    <Button type="primary" onClick={()=>{this.Updata(record)}}>修改</Button>
    <Button type="primary" onClick={()=>{this.Del(record)}}>删除</Button>
    </div> )}
}
];

    return(
      <div>
      <Row type="flex" justify="end">
           <Col span={4}>
                <Button type="primary" onClick={this.f5}>刷新</Button>
           </Col>
           <Col span={12}></Col>
           <Col span={8}>
           <FormItem>
             {getFieldDecorator("search")
               (
                   <Input placeholder="请输入订单用户名,按回车进行搜索" onPressEnter={this.Search} />
             )}
           </FormItem>
           </Col>
       </Row>

      <Table  dataSource={this.state.data} columns={columns}  pagination={pagination}/>
      <Modal title="修改订单" visible={this.state.visible}  onOk={this.handleOk} onCancel={this.handleCancel} >
      <FormItem
        {...formItemLayout}
        label="付款状态"
        hasFeedback
      >
        {getFieldDecorator("payState"
          )
          (
            <RadioGroup >
                <RadioButton value="未付款">未付款</RadioButton>
                <RadioButton value="已付款">已付款</RadioButton>
            </RadioGroup>
        )}
      </FormItem>

       </Modal>
         <Modal title="详情订单" visible={this.state.visible1}  onOk={this.handleOk1} onCancel={this.handleCancel1} >
            <p>商品订单名：{this.state.name}</p>
            <p>订单用户：{this.state.user}</p>
            <p>订单时间：{this.state.time}</p>
            <p>订单总价：{this.state.price}</p>
            <p>订单状态：{this.state.statu}</p>
            <p>订单规格：{this.state.size}</p>
            <p>订单单价：{this.state.singleprice}</p>
            <p>订单数量：{this.state.number}</p>
        </Modal>
  </div>
    );
  }
  }));
