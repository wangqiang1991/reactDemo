/*jshint esversion:6*/
import React from "react";
import {ajax} from "tools";
import {Card,Form,Icon,Button,Modal,Input} from "antd";
const FormItem = Form.Item;
const InputGroup = Input.Group;
class ClassAdd extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visible:false
    };
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleOk(){
    ajax({
      type:"post",
      url:"/className/insert",
      data:{
        className:this.props.form.getFieldValue('className')
      },
      success:function(){
        this.props.form.setFieldsValue({className:""});
        this.props.showAllClass();
      }.bind(this)
    })
    this.setState({ visible: false });
  }
  showModal(){
    this.setState({ visible: true });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return <div>
    <Button type="primary" style={{marginRight: "20px"}} onClick={this.showModal.bind(this)}>添加</Button>
      <Modal title="增加" visible={this.state.visible}
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleOk.bind(this)}
        footer={[
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
          <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
            确认
          </Button>,
            ]}
      >
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="类别名"
          hasFeedback
        >
          {getFieldDecorator('className', {
            rules: [{
              required: true, message: '类别名不能为空',
            }],
          })(
            <Input size="large" placeholder="类别名" />
          )}
        </FormItem>
      </Form>
      </Modal>
    </div>
  }
}

export default Form.create()(ClassAdd);
