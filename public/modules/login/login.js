import React from "react";
import {ajax} from "tools";
import style from './login.css'
import {message, Card , Checkbox , Form, Icon, Input, Button } from 'antd';
import {hashHistory} from "react-router";
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={};
	}
 setCookie(c_name,value,expiredays)
    {
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }
  getCookie(c_name)
    { 
      var c_start = null;
      var c_end = null;
    if (document.cookie.length>0)
      {
       c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
        { 
        c_start=c_start + c_name.length+1 
        c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
        } 
      }
    return ""
    }  
  componentDidMount () {
    var user = this.getCookie('user');
    var pwd = this.getCookie('password');
    this.props.form.setFieldsValue({userName:user,password:pwd});
  }  
	handleSubmit (e)  {
      e.preventDefault();
   	  this.props.form.validateFields((err, values) => {
      if (!err) {
        let user = values.userName;
        let pwd = values.password;
        let rem = values.remember;

	        if(!/^[a-zA-Z0-9]{6,10}$/.test(pwd)){
	               message.error('密码格式不正确');
	               return false;
	        }
            ajax({
              type:'post',
              url:'/users/login',
              data:{
                user:user,
                pwd:pwd
              },
              success:(data)=>{
                if(data.status == 1){
                    if(rem == true){
                      this.setCookie('user',user,7);
                      this.setCookie('password',pwd,7);
                    }
                    
                    hashHistory.push('/index');
                }
                else if(data.status == 0){
                    message.error('用户名和密码不匹配');
                }
              }

            })
        
      }
    });
  }

 render(){
 	const { getFieldDecorator } = this.props.form;
 	return <div className={style.div1}>
 	<Card title='花之语管理系统' bordered={false}>
 		<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>7天免登陆</Checkbox>
          )}
          <a className={style.div2} href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className={style.div3}>
           登录
          </Button>
        </FormItem>
      </Form>
      </Card>
 	</div>
 }	
}

export default Form.create()(Login);