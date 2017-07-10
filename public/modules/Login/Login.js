import React from "react";
import {ajax} from "tools";
import {message, Card, Row, Col, Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
    };
    this.style={
      width:'auto',
      height:"auto",
      position:'absolute',
      top:'50%',
      left:'50%',
      width:'400px',
      height:'300px',
      marginLeft:'-200px',
      marginTop:'-150px'
    }
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {     
      if (!err) {
        let username = values.userName;
        let password = values.password; 
        if(!/^[a-zA-Z0-9]{6,10}$/.test(password)){
               message.error('密码格式不正确');
               return false;
        }
        if( /^[a-zA-Z0-9]{6,10}$/.test(password) ){
            ajax({
              type:'post',
              url:'/users/login',
              data:{
                user:username,
                pwd:password
              },
              success:(data)=>{
                if(data.status == 1){
                    hashHistory.push('/index');
                }
                else if(data.status == 0){
                    message.error('花名和密码不匹配');
                }
              }

            })
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    message.config({
      duration: 0.8
    });
    return ( <div style={{width:'100%',height:'100%'}}>
      <div style={this.style}>
          <Card title='花之语' bordered={false} bodyStyle={{backgroundColor:'#f5f5f5'}}>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入您的花名!' }],
                  })(
                    <Input prefix={<Icon type="api" style={{ fontSize: 13 }} />} placeholder="花名" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入您的密码!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                  )}
                </FormItem>
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
      </div>
    );
  }
}

export default Form.create()(Login);