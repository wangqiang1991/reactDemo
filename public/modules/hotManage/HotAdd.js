/*jshint esversion:6*/
import React from "React";
import {ajax} from "tools";
import {Col,Row,Card,Table,Button,Form,Modal,Checkbox,Tooltip,Input,Icon} from "antd";
import store from "store";
import { connect } from 'react-redux';
class HotAdd extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      newHotData:[],
      selectData:[],
      selectedRowKeys:[],
			selectedRows:[]
    };
    this.columns = [
			{ title: '图片', dataIndex: 'index_img', key: 'index_img' ,
				render:(text,record) => {
					return (<img src={text}/>)
				}
			},
			{ title: '商品名', dataIndex: 'name', key: 'name',render:(text)=>{return (<Tooltip title={text}><p className="shortP">{text}</p></Tooltip>)} },
			{ title: '操作',key: 'action',render:(text)=>{
        return (<Button onClick={()=>this.showGoodsInfo(text)}>商品详情</Button>)
      } },
		];
  }
  handleCancel1() {
    store.dispatch({
      type:"SHOW_HOTADD_INFO",
      addVisible:false
    });
  }
  showGoods(curpage){
		ajax({
			type:"post",
			url:"/hot/findGoodsByPage",
			data:{
				curpage:curpage
			},
			success:function(data){
        if(data.curpage){
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
  				for(var i = 0;i < this.state.newHotData.length;i++){
  					for(var j = 0;j < data.data.length;j++){
  						if(this.state.newHotData[i].goods._id == data.data[j]._id){
  							this.state.selectedRowKeys.push(j);
  						}
  					}
  				}
  				this.setState({
  					selectedRowKeys:this.state.selectedRowKeys
  				})
        }

			}.bind(this)
		})
	}
  showGoodsInfo(text){
    ajax({
      type:"get",
      url:"/hot/hotClass",
      data:{
        id:text._id
      },
      success:function(data){
        store.dispatch({
          type:"SHOW_HOTADD2_INFO",
          addVisible2:true
        });
        this.setState({
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

  showAllHot(){
		ajax({
			type:"post",
			url:"/hot/showAllGoods",
			success:function(data){
				this.setState({
					newHotData:data
				})
        this.showGoods();
			}.bind(this)
		})
	}
  add(){
    console.log("datasState",this.props.datasState);
		this.showAllHot();
    store.dispatch({
      type:"SHOW_HOTADD_INFO",
      addVisible:true
    });
	}
  handleCancelAdd() {
    this.props.form.setFieldsValue({userName:""});
    store.dispatch({
      type:"SHOW_HOTADD_INFO",
      addVisible:false
    });
	}
  submit(){
    this.props.form.setFieldsValue({userName:""});
    for(var v of this.state.selectedRows){
      var visible = false;
      for(var n of this.state.newHotData){
        if(v._id == n.goods._id){
          visible = true;
        }
      }
      if(!visible){
        ajax({
          type:"post",
          url:"/hot/insertHot",
          data:{
            id:v._id
          },
          success:function(){
            this.props.showAll();
          }.bind(this)
        })
      }
    }
      store.dispatch({
        type:"SHOW_HOTADD_INFO",
        addVisible:false
      });
      this.setState({
        selectedRowKeys:[],
        selectedRows:[]
      })
  }

  handleOk1(){
    store.dispatch({
      type:"SHOW_HOTADD2_INFO",
      addVisible2:false
    });
  }
  handleCancel(){
    store.dispatch({
      type:"SHOW_HOTADD2_INFO",
      addVisible2:false
    });
  }
  search(curpage){
    ajax({
      type:"post",
      url:"/hot/findGoodsByPage",
      data:{
        curpage:curpage,
        text:this.props.form.getFieldValue("userName")
      },
      success:function(data){
        this.setState({
          data:data,
          pagination:{
            current:parseInt(data.curpage),
            total: data.count,
            pageSize:3,
            onChange: (curpage) => {
                this.search(curpage);
            }
          }
        });
      }.bind(this)
    })
  }
  render(){
      const { selectedRowKeys } = this.state;
      const { getFieldDecorator } = this.props.form;
      const FormItem = Form.Item;
      const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
      const Search = Input.Search;
      const rowSelection = {
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
    		 			selectedRowKeys,
    		 			selectedRows
    		 		});
          },
        };
    return <div>
    <Button type="primary" onClick={this.add.bind(this)} style={{marginBottom:"10px"}}>增加</Button>
            <Modal title="增加" visible={this.props.widgetState.addVisible}
              onOk={this.submit.bind(this)} onCancel={this.handleCancelAdd.bind(this)}
            >
            <Form horizontal>
            <FormItem {...formItemLayout} label="查询">
                {getFieldDecorator('userName', {})(
                  <Input type="text" addonBefore={<Icon type="search"/>} addonAfter={<Button className="searchBtn" onClick={this.search.bind(this)}>查询</Button>}/>
                )}
            </FormItem>
            </Form>
            <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.data.data} pagination={this.state.pagination}></Table>

            <Modal title="商品详情" width={400} visible={this.props.widgetState.addVisible2}  onOk={this.handleOk1.bind(this)} onCancel={this.handleCancel.bind(this)}
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

        </Modal>
    </div>
  }
}

const mapStateToProps = function(store){
    return {
        widgetState:store.widgetState,
        datasState:store.datasState
    }
}

export default connect(mapStateToProps)(Form.create()(HotAdd));
