import React from "react";
import {ajax} from "tools";
import {Form, Button,Modal, Table ,Card,Tooltip } from 'antd';
import PromotionAdd from "./PromotionAdd";
export default class Promotion extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:[],
			newData:[],
			visible:false,
			infoData:{}
		}
		this.discountColumns = [
			{ title: '图片', dataIndex: 'goods.index_img', key: 'index_img' ,
				render:(text,record) => <img src={text} />},
			{ title: '商品名', dataIndex: 'goods.name', key: 'name' 
			},
			{ title: '商品信息', key: 'y', render: (text,record) => <span><Button onClick={()=>{this.see(text)}}>查看详情</Button></span> },
			{ title: '操作', key: 'x', render: (text,record) => <span><Button onClick={()=>{this.del(text._id)}}>删除</Button></span> },
		];
	}
	see(text){
		ajax({
			type:"post",
			url:"/promotion/findGoods",
			data:{
				id:text.goods._id
			},
			success:function(data){
				this.setState({
					name:data[0].name,
					price:data[0].price,
					count:data[0].count,
					color:data[0].color,
					salenum:data[0].salenum,
					size:data[0].size,
					class:data[0].class.className
				})
			}.bind(this)
		})
		this.setState({
			visible:true,
		})
	}
	off(){
		this.setState({
			visible:false
		})
	}
	del(id){
		ajax({
			type:"post",
			url:"/promotion/delete",
			data:{
				id:id
			},
			success:function(){
				this.showAll();
			}.bind(this)
		})
	}
    componentWillMount(){
        this.showAll();
    }
	showAll(curpage){
		ajax({
			type:"post",
			url:"/promotion/findAll",
			data:{
				curpage:curpage
			},
			success:function(data){
				this.setState({
					data:data.data,
					pagination:{
						current:parseInt(data.curpage),
				    	total: data.count,
				    	pageSize:3,
				    	onChange: (curpage) => {
				    		this.showAll(curpage);
				    	}
				    }
				})
			}.bind(this)
		})
	}
	render(){
		return <div>
            	<Card title={<span><span className="spanStyle">促销管理</span></span>} bordered={false} style={{ width: "100%",height:"100%" }}>
				<PromotionAdd showAll={this.showAll.bind(this)}></PromotionAdd>
				<Table
			    columns={this.discountColumns}
			    dataSource={this.state.data}
			    pagination={this.state.pagination}
				/>
				<Modal
					visible={this.state.visible}
					title="商品信息"
					onCancel={this.off.bind(this)}
					footer={[
						<Button key="submit" type="primary" size="large" onClick={this.off.bind(this)}>
						  确认
						</Button>,
	            ]}>
					<p>商品名：{this.state.name}</p>
					<p>种&nbsp;&nbsp;&nbsp;类：{this.state.class}</p>
					<p>尺&nbsp;&nbsp;&nbsp;码：{this.state.size}</p>
					<p>颜&nbsp;&nbsp;&nbsp;色：{this.state.color}</p>
					<p>价&nbsp;&nbsp;&nbsp;格：￥{this.state.price}</p>
					<p>库&nbsp;&nbsp;&nbsp;存：{this.state.count}</p>
					<p>销&nbsp;&nbsp;&nbsp;量：{this.state.salenum}</p>
	            </Modal>
				</Card>
		</div>
	}
}
