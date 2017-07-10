import React from "react";
import {ajax} from "tools";
import { Modal, Button,Form, Icon, Input,Checkbox,Radio} from 'antd';

const FormItem = Form.Item;

class AddUser extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      loading: false,
      visible: false,
      data:[]
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }




  showModal() {
    this.setState({
      visible: true,
    });
  }



    handleCancel() {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }



  add() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          visible: false,
        });
      ajax({
          type:"post",
          url:"users/add",
          data:this.props.form.getFieldsValue(),
          success:function(){
            this.setState({ loading: false, visible: false });
            this.props.showAll(this.props.data);
            console.log(this.props.form);
            this.props.form.resetFields()
          }.bind(this)
        })
      }
    });
  }




  render(){
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    return (
      <div>
          <Button type="primary" onClick={this.showModal.bind(this)}>添加新用户</Button>
          <Modal title="增加一个新的用户"
            visible={this.state.visible}
            onOk={this.add.bind(this)}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel.bind(this)}
          >
            <p>{this.state.ModalText}</p>
            <Form horizontal>
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
								<Input placeholder="请输入用户名"/>
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
								<Input placeholder="请输入密码"/>
							  )}
							</FormItem>

              <FormItem {...formItemLayout} label="姓名" hasFeedback>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入姓名' },
                  {
                    pattern:/^([\u4e00-\u9fa5]){2,4}$/, message:'请输入中文姓名'
                  }
                ],
                })(
                  <Input addonBefore={<Icon type="user" />} placeholder="请输入姓名" />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="联系号码" hasFeedback>
                {getFieldDecorator('contact', {
                  rules:[{required: true, message: '请输入手机号码'},
                {
                  pattern:/^[\0-9]{11}$/,message:"请输入11位手机号"
                }]
                })(
                  <Input placeholder="请输入手机号"/>
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
								<Input placeholder="请输入电子邮箱"/>
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
                    <Input placeholder="请输入地址"/>
                  )}
                </FormItem>
              <FormItem className="collection-create-form_last-form-item" style={{textAlign:"center"}}>
                 {getFieldDecorator('modifier', {
                   initialValue: 'true',
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
export default Form.create()(AddUser);
