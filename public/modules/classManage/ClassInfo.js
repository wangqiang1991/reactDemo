/*jshint esversion:6*/
import React from "React";
import {Table,Button,Form,Modal,Input} from "antd";
import ClassAdd from "./ClassAdd";
import ClassOfGoods from "./ClassOfGoods";
import {ajax} from "tools";
const FormItem = Form.Item;
const InputGroup = Input.Group;
class ClassInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            data:[],
            pagination:{},
        };
        this.columns = [{
            title: '类别名',
            dataIndex: 'className',
            key: 'className'
            },
            {title: '操作',
            key: 'action',
            render: (text, record) => (
                <span >
                    <Button onClick={()=>{this.info(text._id)}}> 查看商品 < /Button>
                    <Button onClick={()=>{this.del(text._id)}}> 删除 < /Button>
                    <Button onClick={()=>{this.showModal(text._id)}}> 修改 < /Button>
                </span>
            )
        }];
    }
    componentWillMount(){
        this.showAllClass()
    }
    info(id){
        console.log(id)
        this.setState({
            pid:id
        })
    }
    clearId(){
        this.setState({
            pid:""
        })
    }
    showAllClass(curpage){
        ajax({
            type:"post",
            url:"/className/findAll",
            data:{
                curpage:curpage
            },
            success:function(data){
                this.setState({
                    data:data.data,
                    pagination:{
                        current:parseInt(data.curpage),
                        total: data.count,
                        pageSize: 3,
                        onChange: (curpage) => {
                            this.showAllClass(curpage)
                        }
                    }
                })
            }.bind(this)
        })
    }
    del(id){
        ajax({
            type:"post",
            url:"/className/findGoods",
            success:function(data){
                for(let v of data){
                    var repeatInfo = false;
                    if(id == v.class._id){
                        repeatInfo = true;
                        break;
                    }
                }
                if(!repeatInfo){
                    ajax({
                        type:"post",
                        url:"/className/delete",
                        data:{
                            id:id
                        },
                        success:function(){
                            this.showAllClass()
                        }.bind(this)
                    })
                }else{
                    alert("本类下有商品，不能删除！");
                }
            }.bind(this)
        })
    }
    update(){
        ajax({
            type:"post",
            url:"/className/update",
            data:{
                id:this.state.id,
                className:this.props.form.getFieldValue('className')
            },
            success:function(){
                this.setState({ visible: false });
                this.props.form.setFieldsValue({className:''})
                this.showAllClass()
            }.bind(this)
        })
    }
    showModal(id){
        this.setState({
            visible: true,
            id:id
        });
    }
    handleCancel() {
        this.setState({ visible: false });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 10 },
        };

        return <div >
            <ClassAdd showAllClass={this.showAllClass.bind(this)}/>
            <Table columns={this.columns} dataSource={this.state.data} pagination={this.state.pagination}></Table>
            <ClassOfGoods clearId={this.clearId.bind(this)} id={this.state.pid} />
            <Modal title="修改" visible={this.state.visible}
                onCancel={this.handleCancel.bind(this)}
                footer={[
                  <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                  <Button key="submit" type="primary" size="large" onClick={this.update.bind(this)}>
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
export default Form.create()(ClassInfo);
