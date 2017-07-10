import React from "react";
import {ajax,success,error} from "tools";
import {Card,Form,Icon,Table,Button} from "antd";
import GoodsUpdata from "./GoodsUpdata";
class GoodsData extends React.Component{
  constructor(props){
    super(props);
    this.columns = [{
      title: '图片',
      dataIndex: 'index_img',
      key: 'index_img',
      render: text => <img src={text}/>,
    }, {
      title: '商品名',
      dataIndex: 'name',
      key: 'name',
      render:text => <p title={text} style={{width:"80px",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{text}</p>
    }, {
      title: '类别',
      dataIndex: 'class',
      key: 'class',
      render:text=><span>{text.className}</span>
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },{
      title: '商品库存量',
      dataIndex: 'count',
      key: 'count',
    },{
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
    }, {
      title: '规格',
      dataIndex: 'size',
      key: 'size',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        <GoodsUpdata text={text} classData={this.props.classData} showAll={this.props.showAll}></GoodsUpdata>
        <Button type="primary" onClick={()=>this.delete(text)} className="add" >删除</Button>
        </span>
      ),
    }];
  }
  delete(text){
    ajax({
      type:"post",
      url:"/goods/delete",
      data:{
        id:text._id
      },
      success:function(){
        success("删除成功","",function(){
          this.props.showAll();
        }.bind(this));
      }.bind(this)
    });
  }
  render(){
    const pagination = {
      total:this.props.data.count,
      pageSize:3,
      onChange: (curpage) => {
        console.log(curpage);
        this.props.showAll(curpage);
      }
    }
    return <Table columns={this.columns} dataSource={this.props.data.data} pagination={pagination} className="goodsTab"/>
  }

}

export default Form.create()(GoodsData);
