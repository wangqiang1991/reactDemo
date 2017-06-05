import React from "react";
import {ajax} from "tools";
import {hashHistory} from "react-router";
import {Modal,Tooltip, Card, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      visible: false,
      tipUservisible:false,
      tipPwdvisible:false
    };
  }
  handleOk  (e)  {
    this.setState({
      visible: false,
    });
  }
  handleCancel  (e)  {
    this.setState({
      visible: false,
    });
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {     
      if (!err) {
        let username = values.userName;
        let password = values.password;  
        if(!/^1(3|4|5|7|8)\d{9}$/.test(username)){
            this.setState({
              tipUservisible: true,
            });
            setTimeout(function () {
               this.setState({
                  tipUservisible: false,
              });
            }.bind(this),500)

            return false;    
        }
        else if(!/^[a-zA-Z0-9]{6,10}$/.test(password)){
            this.setState({
              tipPwdvisible: true,
            });
            setTimeout( () => {
                this.setState({
                  tipPwdvisible: false,
                });
            },500)

            return false;
        }
      else if( /^[a-zA-Z0-9]{6,10}$/.test(password) && /^1(3|4|5|7|8)\d{9}$/.test(username) ){
            this.setState({
              tipUservisible: false,
              tipPwdvisible: false
            });
           

            ajax({
              type:'post',
              url:'/react/login',
              data:{
                user:username,
                pwd:password
              },
              success:(data)=>{
                if(data.status == 1){
                    hashHistory.push('/index');
                }
                if(data.status == 0){
                    this.setState({
                      visible: true,
                    });
                }
              }

            })
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return ( <div style={{backgroundImage:'url(img/bg.jpg)',width:'100%',height:'100%'}}>
      <div style={{width:'400px',height:"auto",paddingTop:'20%',margin:'auto'}}>
          <Card title='用户登录' bodyStyle={{backgroundColor:'#f5f5f5'}}>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
              <Tooltip placement="right" title='用户名格式不正确' visible={this.state.tipUservisible}>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入您的用户名!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                  )}
                </FormItem>
              </Tooltip>
              <Tooltip placement="right" title='密码格式不正确' visible={this.state.tipPwdvisible}>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入您的密码!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                  )}
                </FormItem>
              </Tooltip>
              <FormItem>
              <Col span={6}></Col>
              <Col span={12}>
                <Button type="primary" htmlType="submit" style={{width:'100%'}} className="login-form-button">
                 登录
                </Button> 
               </Col>        
              </FormItem>
            </Form>
          </Card>
      </div>   
         <Modal title="提示信息" visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} >
            <p>用户名或密码错误</p>        
          </Modal>
      </div>
    );
  }
}

export default Form.create()(Login);

