/*jshint esversion:6*/
import React from "react";
import {ajax} from "tools";
import {Modal, Form,Icon, Input,Button,Row, Col} from 'antd';

const FormItem = Form.Item;
class UserSearch extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      loading: false,
      visible: false,
      confirmLoading: false
    }
  }


  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    this.setState({
      ModalText: 'The modal dialog will be closed after two seconds',
      confirmLoading: true,
    })
    this.search();
  }
  handleCancel() {
  console.log('Clicked cancel button');
  this.setState({
    visible: false,
  });
}

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  search(){
    var text = this.props.form.getFieldsValue()
    if(text.userName){
      ajax({
        type:"get",
        url:"/users/showAll",
        data:{text:text.userName},
        success:function(data){
          this.setState({
            data:data
          })
          console.log(data[0]);
          this.props.getdata(data);
          this.setState({confirmLoading:false, loading: true, visible: false});
        }.bind(this)
      })
    }else {
      this.props.showAll()
      this.setState({confirmLoading:false, loading: true, visible: false});
    }
  }


  render(){
    const Search = Input.Search;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    return (
      <div>

          <Button type="primary" onClick={this.showModal.bind(this)}>用户查询</Button>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel.bind(this)}
          >
          <Form horizontal style={{display:"block",margin:"40px"}}>
          <FormItem {...formItemLayout} label="查询">
              {getFieldDecorator('userName', {})(
                <Input addonBefore={<Icon type="user"/>}  />
              )}
          </FormItem>
          </Form>
          </Modal>
      </div>
    )
  }
}
export default Form.create()(UserSearch);
