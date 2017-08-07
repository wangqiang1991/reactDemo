import React from "react";
import {ajax} from "tools";
import { Form, Input, Table,Modal, Button ,Card,Tooltip} from 'antd';

export default class PromotionAdd extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visible:false,
			selectedRowKeys:[],
			selectedRows:[],
			data:[],
			newPromotion:[],
		};
		this.columns = [
			{ title: '图片', dataIndex: 'index_img', key: 'index_img' ,
				render:(text,record) => {
					return (<img src={text}/>)
				}
			},
			{ title: '商品名', dataIndex: 'name', key: 'name' },
			{ title: '分类', dataIndex: 'class.className', key: 'class' },
			{ title: '价格', dataIndex: 'price', key: 'price' },
			{ title: '颜色', dataIndex: 'color', key: 'color' },
			{ title: '尺码', dataIndex: 'size', key: 'size' },
			{ title: '库存', dataIndex: 'count', key: 'count' },
			{ title: '销量', dataIndex: 'salenum', key: 'salenum' },
		];
	}
	showGoods(curpage){
		ajax({
			type:"post",
			url:"/promotion/findGoodsByPage",
			data:{
				curpage:curpage
			},
			success:function(data){
				console.log(data)
				this.setState({
					data:data,
					pagination:{
						current:parseInt(data.curpage),
						total: data.count,
				    	pageSize:3,
				    	onChange: (curpage) => {
				    		this.showGoods(curpage);
				    	}
					}
				});
				this.state.selectedRowKeys = [];
				for(var i = 0;i < this.state.newPromotion.length;i++){
					for(var j = 0;j < data.data.length;j++){
						if(this.state.newPromotion[i].goods._id == data.data[j]._id){
							this.state.selectedRowKeys.push(j);
						}
					}
				}
				this.setState({
					selectedRowKeys:this.state.selectedRowKeys
				})
			}.bind(this)
		})
	}
	showAllPromotion(){
		ajax({
			type:"post",
			url:"/promotion/findPromotion",
			success:function(data){
				this.setState({
					newPromotion:data
				})
        		this.showGoods();
			}.bind(this)
		})
	}
	add(){
		this.showAllPromotion();
		this.setState({
			visible:true
		})
	}
	handleCancelAdd() {
	    this.setState({
	    	visible: false,
			selectedRowKeys:[]
		})
	}
	handleOkAdd(){
		for(var v of this.state.selectedRows){
			var addVisible = false;
			for(var n of this.state.newPromotion){
				console.log(v._id)
				console.log(n.goods._id)
				if(v._id == n.goods._id){
					addVisible = true;
				}
			}
			if(!addVisible){
				ajax({
					type:"post",
					url:"/promotion/insertPromotion",
					data:{
						id:v._id
					},
					success:function(){
						this.props.showAll();
					}.bind(this)
				})
			}
		}
	    this.setState({
	    	visible: false,
			selectedRowKeys:[],
			selectedRows:[]
		})
	}
	render(){
		const {selectedRowKeys} = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowKeys:selectedRowKeys,
					selectedRows:selectedRows
				})
			},
		};
		return <div>
			<Button key="submit" type="primary" size="large" onClick={this.add.bind(this)} style={{margin:"0 0 10px 10px"}}>增加</Button>
			<Modal
				width="1000px"
				visible={this.state.visible}
				title="添加促销商品"
				onOk={this.handleOkAdd.bind(this)}
				onCancel={this.handleCancelAdd.bind(this)}
				footer={[
					<Button key="back" type="ghost" size="large" onClick={this.handleCancelAdd.bind(this)}>取消</Button>,
					<Button key="submit" type="primary" size="large" onClick={this.handleOkAdd.bind(this)}>
					  确认
					</Button>,
            ]}>
				<Table
				rowSelection={rowSelection}
			    columns={this.columns}
			    dataSource={this.state.data.data}
			    pagination={this.state.pagination}
				/>
			</Modal>
		</div>
	}
}
