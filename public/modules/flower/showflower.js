import React from "react";
import {ajax} from "tools";
import {Form, Modal, Button , Input , message, Table ,Icon} from 'antd';
import style from './flower.css';
const Search = Input.Search;
class FlowerList extends React.Component {
  constructor(props){
    super(props);
    this.state={
    	data: [],
      total:0,
      visible:false,
      searchdata:[
      {'flowername':null}
      ]
    };
	}
  showModal  ()  {
    this.setState({
      visible: true,
    });
    console.log(this.state.searchdata[0].flowername)
  }
  handleCancel (e) {
    this.setState({
      visible: false,
    });
  }
  handleOk  (e)  { 
    this.setState({
      visible: false,
    });
  }
  searchflower(value){
    if(value == ''){
      message.error('请输入查找的花名');
      return false;
    }
    
    ajax({
      type:'get',
      url:'/flower/findsomeflower',
      data:{
        flowername:value
      },
      success:(data)=>{
        console.log(data)
        if(data.length==0){
          message.error('对不起没有搜索到该花汇');
        }else{
          this.setState({
              searchdata:data
            })
            this.showModal(); 
        }
      }
    })
  }
  showall(curpage){
    ajax({
      type:'get',
      url:'/flower/showall',
      data:{
        curpage:curpage
      },
      success:(data)=>{
        for(var i =0 ;i<data.data.length;i++){
          data.data[i].key = i;
        }
        
        this.setState({
          total:data.count,
          data:data.data
        })
      }
    })

  }
   componentWillMount () {
    this.showall(1);
   }
   
   delflower (record){
      console.log(record)
      var key = record.flowerurl.slice(record.flowerurl.lastIndexOf('/')+1);
      ajax({
        type:'get',
        url:'/flower/delflower',
        data:{
          id:record._id,
          key:key
        },
        success:()=>{
          console.log('成功删除')
        }
      })
   }
render(){
  const columns = [{
        title: '花汇图片',
        dataIndex: 'flowerurl',
        key: 'flowerurl',
        render: (text,record) => {return(
          <img src={record.flowerurl} className={style.div4}/>)}
      },
      {
        title:'花名',
        dataIndex: 'flowername',
        key: 'flowername',
        render: (text,record) => {return(
          <span className={style.div5}> {text} </span>)}
      },
      {
        title:'花语',
        dataIndex: 'flowermean',
        key: 'flowermean',
        render: (text,record) => {return(
         <span className={style.div6}> {text} </span>)}
      },
      {
        title:'花汇价值',
        dataIndex: 'flowervlaue',
        key: 'flowervlaue',
        render: (text,record) => {return(
         <span className={style.div7}> {text} </span>)}
      },
      { title:'操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text,record,index) =>{  return(<div>    
          <Button type="primary" onClick={()=>{this.delflower(record)}}>删除</Button>
          </div> )}
      }
      ]; 
  const pagination = {
      total:this.state.total,
      pageSize:4,
      onChange: (curpage) => {
        this.showall(curpage);
      }
    };  
	return <div> 
      <Search placeholder="输入需要查找的花名" style={{ width: 200,marginLeft:'20px' }} onSearch={this.searchflower.bind(this)}/>
      <Table columns={columns} dataSource={this.state.data}  pagination={pagination}/>
      <Modal
          title="搜索结果"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          className={style.div8}
        >
          <img  src={this.state.searchdata[0].flowerurl} style={{display:'block',margin:'auto'}} />
          <p><span style={{color:'red'}}>花名: </span>{this.state.searchdata[0].flowername}</p>
          <p><span style={{color:'green'}}>花语: </span>{this.state.searchdata[0].flowermean}</p>
          <p><span style={{color:'blue'}}>花汇价值: </span>{this.state.searchdata[0].flowervlaue}</p>
        </Modal>
	</div>
}

}

export default Form.create()(FlowerList);