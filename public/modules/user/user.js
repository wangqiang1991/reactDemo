import React from "react";
import {Form, Modal, Button , Input , message,Table} from 'antd';
import {ajax} from "tools";
import style from './user.css';
const FormItem = Form.Item;
class User extends React.Component {
  constructor(props){
    super(props);
    this.state={
    	visible: false,
    	data:[],
    	visible1:false
    };
  }
  showModal  ()  {
    this.setState({
      visible: true,
    });
  }
  handleCancel (e) {
    this.setState({
      visible: false,
    });
  }
  handleOk  (e)  {  

      var users =  this.props.form.getFieldsValue(['user','password']);
      var username = users.user;
      var pwd = users.password;
      if(username == undefined || pwd == undefined ||username == '' || pwd == ''){
      	message.error('用户名或密码不能为空');
      	return false;
      }
      if(!/^[a-zA-Z0-9]{6,10}$/.test(pwd)){
	                message.error('密码格式不正确');
	               return false;
	  }
	  ajax({
	     	type:'get',
	      	url:'users/useradd',
	     	data:{
	      		username:username,
              pwd:pwd
	     	},
	     	success:()=>{
	     		this.setState({
     				  visible: false,
    			});
	    	}
	     })   
  }
  componentWillMount () {
  	ajax({
  		type:'get',
  		url:'users/showall',
  		success:(data)=>{
  			
  			for(var i =0 ;i<data.length;i++){
  				data[i].key = i;
  			}
  			//console.log(data)
  			this.setState({
     				  data: data,
    			});
  		}
  	})
  }
 
  handleOk1 (e) {
    this.setState({
      visible1: false,
    });
  }
  handleCancel1 (e) {
    this.setState({
      visible1: false,
    });
  }
 showModal1  (record)  {
	this.props.form.setFieldsValue({upuser:record.username,uppassword:record.pwd});
    this.setState({
      visible1: true,
    });
  }

  deluser (record) {
  	ajax({
  		type:'get',
  		url:'users/deluser',
  		data:{
  			id:record._id
  		},
  		success:()=>{
  			console.log('成功删除')
  		}
  	})
  }

render(){
	const { getFieldDecorator } = this.props.form;
	const pagination ={
      pageSize:6,
    };
	 const columns = [{
			  title: '用户名',
			  dataIndex: 'username',
			  key: 'username'
			},
			{
			  title: '密码',
			  dataIndex: 'pwd',
			  key: 'pwd'
			},

			{ title: '操作',
			  dataIndex: 'operate',
			  key: 'operate',
			  render: (text,record,index) =>{  return(<div>    
			    <Button type="primary" onClick={()=>{this.showModal1(record)}}>修改</Button>
			    <Button type="primary" onClick={()=>{this.deluser(record)}}>删除</Button>
			    </div> )}
			}];	
	return <div>
		<Button className={style.div1} type="primary" onClick={this.showModal.bind(this)}>增加管理员</Button>
		<div>
			<Table columns={columns} dataSource={this.state.data}  pagination={pagination}/>
		</div>
        <Modal
          title="添加管理员"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
         <Form>
	        <FormItem>
	          {getFieldDecorator('user', {
	            rules: [{ required: true, message: '请输入用户名!' }]
	          })(
	            <Input  placeholder="用户名" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: '请输入密码!' }]
	          })(
	            <Input  type="password" placeholder="密码" />
	          )}
	        </FormItem> 
         </Form>
        </Modal>
        <Modal
          title="修改管理员"
          visible={this.state.visible1}
          onOk={this.handleOk1.bind(this)}
          onCancel={this.handleCancel1.bind(this)}
        >
         <Form>
	        <FormItem>
	          {getFieldDecorator('upuser', {
	            rules: [{ required: true, message: '请输入用户名!' }]
	          })(
	            <Input  placeholder="用户名" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('uppassword', {
	            rules: [{ required: true, message: '请输入密码!' }]
	          })(
	            <Input  type="text" placeholder="密码" />
	          )}
	        </FormItem> 
         </Form>
        </Modal>
	</div>
}

}

export default Form.create()(User);