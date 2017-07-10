import React from "react";
import {ajax,success,error} from "tools";
import {Card,Form,Icon,Button,Modal,Input,Upload,InputNumber,Radio,Row,Col,Checkbox} from "antd";
const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['S', 'M', 'L','XL'];
const cPlainOptions = ['白', '黑', '灰','红',"绿"];
const defaultCheckedList = [];
const cDefaultCheckedList = [];
class GoodsUpdata extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      previewVisible: false,
      previewImage: '',
      
      //封面的缩略图集合和路径
      indexImgList: [],
      indexImgPath:[],
      //详情的图片集合和路径
      detailImgList:[],
      detailPath:[],
      //介绍的图片集合和路径
      introImgList:[],
      introPath:[],

      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,

      cCheckedList: cDefaultCheckedList,
      cIndeterminate: true,
      cCheckAll: false
    }
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  showModal(text){
    this.setState({ visible: true });
    console.log(text.size.split(","));
    this.setState({
      checkedList:text.size.split(",")
    });
    this.setState({
      cCheckedList:text.color.split(",")
    });
    text.classId = text.class._id;
    this.props.form.setFieldsValue(text);
  }
  // 缩略图
  handleImgCancel(){this.setState({ previewVisible: false })}

  onCheckChange(checkedList){
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  cOnCheckChange(cCheckedList){
    this.setState({
      cCheckedList,
      cIndeterminate: !!cCheckedList.length && (cCheckedList.length < cPlainOptions.length),
      cCheckAll: cCheckedList.length === cPlainOptions.length,
    });
  }
  onCheckAllChange(e){
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  cOnCheckAllChange(e){
    this.setState({
      cCheckedList: e.target.checked ? cPlainOptions : [],
      cIndeterminate: false,
      cCheckAll: e.target.checked,
    });
  }
  updateGoods(text){
    var values = this.props.form.getFieldsValue(["name","address","color","size","count","introtext","price","storeName"]);
    if(this.state.indexImgPath.length>0){
      values.index_img = this.state.indexImgPath;
    }else {
      values.index_img = [];
    }
    if(this.state.detailPath.length>0){
      values.detail_img = this.state.detailPath;
    }else {
      values.detail_img = [];
    }
    if(this.state.introPath.length>0){
      values.intro_img = this.state.introPath;
    }else {
      values.intro_img = [];
    }
    values._id = text._id;
    values.color = this.state.cCheckedList;
    values.size = this.state.checkedList;
    values.cid = this.props.form.getFieldValue(["classId"]);
    values.salenum = text.salenum;
    values.collect = text.collect;
    console.log("values",values);
    ajax({
      type:"post",
      url:"/goods/update",
      data:values,
      success:()=>{
        success("修改成功","",function(){
          this.setState({
            indexImgList:[],
            indexImgPath:[],
            detailImgList:[],
            detailPath:[],
            introImgList:[],
            introPath:[],
            visible:false
          });
          this.props.showAll();
        }.bind(this));
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    const { previewVisible, previewImage,indexImgList,detailImgList,introImgList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const props = {
      action:"/goods/upload" , //服务器的路径
      listType:"picture-card",
      fileList:this.state.indexImgList,
      onPreview:function(file){
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }.bind(this),
      onChange:function(data){
        let fileList = data.fileList;
        let indexPath = fileList.map(function(file){
          return file.response;
        });
        this.setState({
          indexImgList:fileList,
          indexImgPath:indexPath
        })
      }.bind(this)
    }
    const detailProps = {
      action:"/goods/upload" , //服务器的路径
      listType:"picture-card",
      fileList:this.state.detailImgList,
      onPreview:function(file){
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }.bind(this),
      onChange:function(data){
        let fileList = data.fileList;
        let detailPath = fileList.map(function(file){
          return file.response;
        });
        this.setState({
          detailImgList:fileList,
          detailPath:detailPath
        })
      }.bind(this)
    }
    const introProps= {
      action:"/goods/upload" , //服务器的路径
      listType:"picture-card",
      fileList:this.state.introImgList,
      onPreview:function(file){
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }.bind(this),
      onChange:function(data){
        let fileList = data.fileList;
        let introPath = fileList.map(function(file){
          return file.response;
        });
        this.setState({
          introImgList:fileList,
          introPath:introPath
        })
      }.bind(this)
    }
    function onInputChange(value) {
      console.log('changed', value);
    }
    var newArry = [];
    for(let i = 0;i<this.props.classData.length;i++){
      var className = this.props.classData[i].className;
      var id = this.props.classData[i]._id;
      newArry.push(<RadioButton value={id}>{className}</RadioButton>);
    }
    return <div>
    <Button type="primary" style={{marginRight: "20px",float:"left"}} onClick={()=>this.showModal(this.props.text)}>修改</Button>
        <Modal
        visible={this.state.visible}
        title="修改"
        width="700"
        onCancel={this.handleCancel.bind(this)}
        footer={[
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返回</Button>,
          <Button key="submit" type="primary" size="large" onClick={()=>this.updateGoods(this.props.text)}>
            提交
          </Button>,
        ]}
      >
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="商品名"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '商品名不能为空',
            }],
          })(
            <Input size="large" placeholder="商品名/商品描述" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="产地"
          hasFeedback
        >
          {getFieldDecorator('address', {
            rules: [{
              required: true, message: '产地不能为空',
            }],
          })(
            <Input size="large" placeholder="产地" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="店铺名"
          hasFeedback
        >
          {getFieldDecorator('storeName', {
            rules: [{
              required: true, message: '店铺名不能为空',
            }],
          })(
            <Input size="large" placeholder="店铺名" />
          )}
        </FormItem>
        <Row gutter={8} >
           <Col span={12} className="numCol">
           <FormItem
             {...formItemLayout}
             label="商品库存量"
             hasFeedback
           >
           {getFieldDecorator('count')(
             <InputNumber min={1} onChange={onInputChange} />
           )}
         </FormItem>
           </Col>
           <Col span={12} style={{width:"25%",marginLeft: "42px"}}>
           <FormItem
             {...formItemLayout}
             label="价格"
             hasFeedback
           >
             {getFieldDecorator('price')(
               <InputNumber min={1} step={0.01} onChange={onInputChange}  />
             )}
           </FormItem>
           </Col>
         </Row>
        <FormItem
          {...formItemLayout}
          label="类别"
          hasFeedback
        >
          {getFieldDecorator('classId')(
            <RadioGroup size="large">
              {newArry}
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="规格"
          hasFeedback
        >
          {getFieldDecorator('size')(
            <div>
              <div style={{ borderBottom: '1px solid #E9E9E9',lineHeight:""}}>
                <Checkbox
                  indeterminate={this.state.indeterminate}
                  onChange={this.onCheckAllChange.bind(this)}
                  checked={this.state.checkAll}
                >
                  全选
                </Checkbox>
              </div>
              <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onCheckChange.bind(this)} />
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="颜色"
          hasFeedback
        >
          {getFieldDecorator('color')(
            <div>
              <div style={{ borderBottom: '1px solid #E9E9E9',lineHeight:""}}>
                <Checkbox
                  indeterminate={this.state.cIndeterminate}
                  onChange={this.cOnCheckAllChange.bind(this)}
                  checked={this.state.cCheckAll}
                >
                  全选
                </Checkbox>
              </div>
              <CheckboxGroup options={cPlainOptions} value={this.state.cCheckedList} onChange={this.cOnCheckChange.bind(this)} />
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传缩略图"
          hasFeedback
        >
        <p>*请上传一张封面的缩略图</p>
        <div className="clearfix">
          <Upload
            {...props}
          >
            {indexImgList.length >= 2 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleImgCancel.bind(this)} >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传详情图"
          hasFeedback
        >
        <p>*请上传8张以下的详情图</p>
        <div className="clearfix">
          <Upload
            {...detailProps}
          >
            {detailImgList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleImgCancel.bind(this)} >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商品介绍"
          hasFeedback
        >
          {getFieldDecorator('introtext')(
            <Input size="large" placeholder="商品介绍文字" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传介绍图"
          hasFeedback
        >
        <p>*请上传8张以下的介绍图</p>
        <div className="clearfix">
          <Upload
            {...introProps}
          >
            {introImgList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleImgCancel.bind(this)} >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        </FormItem>
      </Form>
      </Modal>
    </div>
  }
}

export default Form.create()(GoodsUpdata);
