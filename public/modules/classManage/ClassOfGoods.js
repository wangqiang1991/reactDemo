import React from "react";
import {Modal,Button,Table} from "antd";
import {ajax} from "tools";
export default class ClassOfGoods extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:[],
			visible:false
		};
		this.discountColumns = [
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
	componentWillReceiveProps(newprops){
		if(newprops.id){
			this.handleOk(newprops.id)
		}
	}
	handleOk(id){
		ajax({
			type:"post",
            url:"/className/findGoods",
            success:function(data){
            	var newData = []
                for(let v of data){
                    var repeatInfo = false;
                    if(id == v.class._id){
                    	newData.push(v)
                    }
                }
                this.setState({
                	data:newData,
					visible:true
                })
                this.props.clearId()
            }.bind(this)
		})
	}
	handleCancel(){
		this.setState({
			visible:false
		})
	}
	render(){
		const pagination={
	    	total: this.state.data.length,
	    	pageSize:3,
	    	onChange: (curpage) => {
	    	}
	    }
		return <div>
			<Modal
				width="1000px"
				visible={this.state.visible}
				title="商品"
				onCancel={this.handleCancel.bind(this)}
				footer={[
					<Button key="submit" type="primary" size="large" onClick={this.handleCancel.bind(this)}>
					  确认
					</Button>,
            ]}>
				<Table
				columns={this.discountColumns}
			    dataSource={this.state.data}
			    pagination={this.state.pagination}/>
			</Modal>
		</div>
	}
}