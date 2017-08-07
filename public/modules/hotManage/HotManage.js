/*jshint esversion:6*/
import React from "React";
import {Col,Row,Card,Table,Button,Form,Modal,Checkbox,Tooltip} from "antd";
import {ajax} from "tools";
import HotAdd from "./HotAdd";
import store from "store";
import { connect } from 'react-redux';
class HotManage extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  componentWillMount(){
    this.showAll();
  }
  showAll(curpage){
    ajax({
      type:'get',
      url:'/hot/hotInfo',
      data:{
        curpage:curpage
      },
      success:function(data){
        console.log("allData",data);
        var newData = [];
        for(let v of data.data){
          v.goods.newId = v._id;
          newData.push(v.goods);
        }
        console.log("datasState",this.props.datasState.data);
        store.dispatch({
          type:"HOT_INFO",
          hotData:newData
        });

        this.setState({
          pagination:{
            current:parseInt(data.curpage),
            total:data.count,
            pageSize:3,
            showQuickJumper:true,
            onChange: (curpage) => {
              this.showAll(curpage);
            }}
        });
      }.bind(this)
    });
  }
  showGoodsInfo(text){
    console.log("text",text);
    ajax({
      type:"get",
      url:"/hot/hotClass",
      data:{
        id:text._id
      },
      success:function(data){
        store.dispatch({
          type:"SHOW_HOT_INFO",
          visible:true
        });
        this.setState({
          // visible:true,
          name:text.name,
          price:text.price,
          count:text.count,
          color:text.color,
          salenum:text.salenum,
          size:text.size,
          class:data[0].class.className
        });
      }.bind(this)
    });
  }
  handleOk1(){
    store.dispatch({
      type:"SHOW_HOT_INFO",
      visible:false
    });
  }
  del(text){
    console.log(text);
    ajax({
      type:"post",
      url:"/hot/remHot",
      data:{
        id:text.newId
      },
      success:function(){
          this.showAll();
      }.bind(this)
    });
  }
  handleCancel(){
    store.dispatch({
      type:"SHOW_HOT_INFO",
      visible:false
    });
  }
  render(){
    const columns =[
                    {title: '图片',dataIndex: 'index_img',key: 'index_img',render:(text)=>{return (<img src={text}/>)}},
                    {title: '商品名',dataIndex: 'name',key: 'name',
                    render:(text)=>{return (<Tooltip title={text}><p className="longP">{text}</p></Tooltip>)}
                  },
                    {
                        title: '操作',
                        key: 'action',
                        render: (text, record) => (
                          <span>
                            <Button onClick={()=>this.showGoodsInfo(text)}>商品详情</Button>
                            <Button onClick={function(){this.del(text)}.bind(this)}>删除</Button>
                          </span>
                        )
                      }];
    return <div style={{width:"100%",height:"100%"}}>
            <Card title={<span><span className="spanStyle">热门管理</span></span>} bordered={false} style={{ width: "100%",height:"100%" }}>
            <HotAdd showAll={this.showAll.bind(this)}></HotAdd>
            <Table columns={columns} dataSource={this.props.datasState.hotData} pagination={this.state.pagination}></Table>

            <Modal width={400} title="商品详情" visible={this.props.widgetState.visible}  onOk={this.handleOk1.bind(this)} onCancel={this.handleCancel.bind(this)}
              footer={[
      					<Button key="submit" type="primary" onClick={this.handleOk1.bind(this)} >确认</Button>,]}>
               <p>商品名：{this.state.name}</p>
               <p>价格：￥{this.state.price}</p>
               <p>库存：{this.state.count}</p>
               <p>种类：{this.state.class}</p>
               <p>销量：{this.state.salenum}</p>
               <p>尺寸：{this.state.size}</p>
               <p>颜色：{this.state.color}</p>
           </Modal>
            </Card>
    </div>
  }
}

const mapStateToProps = function(store){
    return {
        widgetState:store.widgetState,
        datasState:store.datasState
    }
}

export default connect(mapStateToProps)(Form.create()(HotManage));
