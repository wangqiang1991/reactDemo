import React from "react";
import {ajax} from "tools";
import { Modal, Button,Form, Icon, Input,Checkbox,Radio} from 'antd';

const FormItem = Form.Item;

class UserUpdate extends React.Component{
    constructor(props){
      super(props);
      this.state ={
        data:{
          data:[]
        },
        nameStatu:false,
        contactStatu:false,
        visible: false,
      }

    }


      showById(){
        var text = this.props.text;
        console.log("asdasdasd",text);
        ajax({
          type:"get",
          url:"/users/showById",
          data:{id:text._id},
          success:function(data){
            this.setState({
              data:data,
              visible: true
            });
            this.props.form.setFieldsValue(data)
          }.bind(this)
        })
      }

      update(){
        this.props.form.validateFields((err,values)=>{
          if (!err) {
            var id = this.state.data._id
            var data = this.props.form.getFieldsValue()
            ajax({
                type:"post",
                url:"/users/update",
                data:{
                  id:id,
                  email:data.email,username:data.username,pwd:data.pwd,name:data.name,contact:data.contact,address:data.address,modifier:data.modifier},
                success:function(){
                  this.setState({ loading: false, visible: false });;
                  this.props.showAll(this.props.data);
                }.bind(this)
            });
          }
        })
      }


    handleOk(){
      this.update();
    }



  handleCancel() {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  checkName(rule,value,callback){
    const form = this.props.form;
    if(value && value !== form.getFieldValue("name")){
      callback();
    }else {
      callback();
    }
  }
  checkContact(rule,value,callback){
    const form = this.props.form;
    if(value && value !== form.getFieldValue("contact")){
      this.setState({
        contactStatu:true
      });
      callback();
    }else {
      this.setState({
        contactStatu:false
      });
      callback();
    }
  }


    render(){
      const FormItem = Form.Item;
      const { getFieldDecorator } = this.props.form;
      const RadioButton = Radio.Button;
      const RadioGroup = Radio.Group;
      const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
      return (
        <div style={{display:"inline-block",marginRight:"10px"}}>
            <Button type="primary" onClick={function(){this.showById()}.bind(this)}>修改</Button>
            <Modal title="修改用户信息"
              visible={this.state.visible}
              onOk={this.handleOk.bind(this)}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.handleCancel.bind(this)}
            >
              <p>{this.state.ModalText}</p>
              <Form horizontal  >

              <FormItem
						 {...formItemLayout}
						 label="用户名"
						 hasFeedback
					   >
						 {getFieldDecorator('username', {
						   rules: [{
							 required: true, message: '请输入用户名',
						 },{
							pattern:/^[\da-zA-z]{6,12}$/, message: '请输入6到12位的数字或者字母',
						 }],
						 })(
						   <Input />
						 )}
					   </FormItem>

					   <FormItem
						 {...formItemLayout}
						 label="密码"
						 hasFeedback
					   >
						 {getFieldDecorator('pwd', {
						   rules: [{
							 required: true, message: '请输入密码',
						 },{
							pattern:/^[a-zA-Z0-9]{6,12}$/, message: '请输入6到12位数字加字母的密码',
						 }],
						 })(
						   <Input />
						 )}
					   </FormItem>

              <FormItem {...formItemLayout} label="用户姓名" hasFeedback>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your username!' },
                    {
                      validator:this.checkName.bind(this)
                    },{
                      pattern:/^([\u4e00-\u9fa5]){2,4}$/,message:"请输入姓名"
                    }]
                  })(
                    <Input />
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="联系号码" hasFeedback>
                  {getFieldDecorator('contact', {
                    rules:[{required: true, message: '请输入号码'},
                    {
                      pattern:/^([0-9]){11}$/,message:"请输入"
                    },
                  {
                    validator:this.checkContact.bind(this)
                  }]
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
							  {...formItemLayout}
							  label="邮箱"
							  hasFeedback
							>
							  {getFieldDecorator('email', {
								rules: [{
								  required: true, message: '请输入您的电子邮箱',
							  },{
								 pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入正确的电子邮箱',
							  }],
							  })(
								<Input/>
							  )}
							</FormItem>

                <FormItem {...formItemLayout} label="地址" hasFeedback>
                    {getFieldDecorator('address', {
                      rules: [{ required: true, message: '请输入地址' },
                      {
                        pattern:/^(?=.*?[\u4E00-\u9FA5])[\d\u4E00-\u9FA5]+/, message:'请输入有效地址'
                      }
                    ],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                <FormItem className="collection-create-form_last-form-item" style={{textAlign:"center"}}>
                   {getFieldDecorator('modifier', {
                     initialValue: 'public',
                   })(
                     <Radio.Group style={{display: "inline-block"}}>
                       <Radio value="true">普通用户</Radio>
                       <Radio value="false">管理用户</Radio>
                     </Radio.Group>
                   )}
                 </FormItem>
              </Form>
            </Modal>
          </div>
      )

    }
}
export default Form.create()(UserUpdate);
